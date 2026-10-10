import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { Message, SenderRole } from '../../types/message';
import {
  fetchCustomerMessages,
  sendMessage,
  markAsReadByCustomer,
  markAsReadByAdmin,
  subscribeToCustomerMessages,
  escapeMessageText,
  MAX_MESSAGE_LENGTH
} from '../../lib/messagesApi';
import { Button } from '../ui/Button';
import {
  Send,
  Paperclip,
  Check,
  CheckCheck,
  FileText,
  X,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PortalChatProps {
  consultationId: string;
  customerId?: string;
  projectName?: string;
  currentUserRole: 'customer' | 'admin';
  currentUserName: string;
  currentUserId: string;
  prefillContext?: string | null;
  onClearPrefill?: () => void;
  className?: string;
  compact?: boolean;
}

export const PortalChat: React.FC<PortalChatProps> = ({
  consultationId,
  customerId,
  projectName,
  currentUserRole,
  currentUserName,
  currentUserId,
  prefillContext,
  onClearPrefill,
  className,
  compact = false
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [attachment, setAttachment] = useState<{
    file: File;
    previewUrl: string;
    type: 'image' | 'pdf';
    name: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  // Determine the effective customer ID for this conversation thread
  const effectiveCustomerId = customerId || (currentUserRole === 'customer' ? currentUserId : consultationId);

  // Sync prefill context into input text
  useEffect(() => {
    if (prefillContext) {
      setInputText(prev => {
        const prefix = `[Regarding ${prefillContext}]: `;
        return prev.startsWith(prefix) ? prev : `${prefix}${prev}`;
      });
    }
  }, [prefillContext]);

  // Load message thread from unified messages API
  const loadMessages = useCallback(async () => {
    if (!effectiveCustomerId) return;
    try {
      const list = await fetchCustomerMessages(effectiveCustomerId);
      setMessages(list);

      // Mark unread messages as read
      if (currentUserRole === 'customer') {
        await markAsReadByCustomer(effectiveCustomerId);
      } else {
        await markAsReadByAdmin(effectiveCustomerId);
      }
    } catch (err) {
      console.warn('Portal messages query notice:', err);
    }
  }, [effectiveCustomerId, currentUserRole]);

  useEffect(() => {
    loadMessages();

    // Setup Realtime subscription and short polling fallback
    const unsubscribe = subscribeToCustomerMessages(effectiveCustomerId, () => {
      loadMessages();
    });

    return () => {
      unsubscribe();
    };
  }, [loadMessages, effectiveCustomerId]);

  // Scroll to bottom on new message
  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle file attachment selection (images & PDF, max 10MB)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (10 MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File exceeds 10 MB maximum limit. Please choose a smaller file.');
      return;
    }

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    if (!isImage && !isPdf) {
      setUploadError('Only images (PNG, JPEG, WEBP) and PDF documents are supported.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAttachment({
      file,
      previewUrl,
      type: isImage ? 'image' : 'pdf',
      name: file.name
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = () => {
    if (attachment?.previewUrl) {
      URL.revokeObjectURL(attachment.previewUrl);
    }
    setAttachment(null);
    setUploadError(null);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachment) return;
    if (sending) return;

    setSending(true);
    setUploadError(null);

    let uploadedUrl: string | undefined = undefined;
    let attachmentName: string | undefined = undefined;

    if (attachment) {
      attachmentName = attachment.name;

      if (isSupabaseConfigured && supabase) {
        try {
          const fileExt = attachment.file.name.split('.').pop();
          const filePath = `${effectiveCustomerId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const { error: uploadErr } = await supabase.storage
            .from('portal-attachments')
            .upload(filePath, attachment.file, {
              cacheControl: '3600',
              upsert: false
            });

          if (!uploadErr) {
            const { data: signedData } = await supabase.storage
              .from('portal-attachments')
              .createSignedUrl(filePath, 86400);

            uploadedUrl = signedData?.signedUrl || filePath;
          } else {
            console.warn('Storage upload error, falling back:', uploadErr);
          }
        } catch (err) {
          console.warn('Attachment upload failed:', err);
        }
      }

      if (!uploadedUrl) {
        uploadedUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(attachment.file);
        });
      }
    }

    try {
      const senderRole: SenderRole = currentUserRole === 'customer' ? 'client' : 'admin';
      const newMsg = await sendMessage({
        customerId: effectiveCustomerId,
        senderRole,
        senderId: currentUserId,
        body: inputText.trim(),
        attachmentUrl: uploadedUrl,
        attachmentName: attachmentName
      });

      // Dual write to portal_messages for legacy compatibility if configured
      if (isSupabaseConfigured && supabase && consultationId) {
        void supabase.from('portal_messages').insert({
          id: newMsg.id,
          consultation_id: consultationId,
          sender_id: currentUserId,
          sender_role: currentUserRole,
          sender_name: currentUserName,
          content: newMsg.body,
          attachment_url: newMsg.attachment_url,
          attachment_name: newMsg.attachment_name,
          section_context: prefillContext || undefined,
          is_read: false
        });
      }

      setMessages(prev => [...prev, newMsg]);
      setInputText('');
      setAttachment(null);
      if (onClearPrefill) onClearPrefill();
    } catch (err: any) {
      setUploadError(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={cn("flex flex-col bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden", className)}>
      {/* Chat Header & SLA Notice */}
      <div className="px-5 py-3.5 border-b border-[#ECECEC] bg-[#FAFAFA] flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#0A0A0A] flex items-center gap-2">
              <span>Direct Message · Svvayam Architecture Guild</span>
              {projectName && (
                <span className="text-[10px] font-mono font-medium text-[#0E2A1C] bg-[#0E2A1C]/10 border border-[#0E2A1C]/20 px-2 py-0.5 rounded-full">
                  {projectName}
                </span>
              )}
            </h3>
            <p className="text-[11px] text-[#5C5C5C] font-sans">
              Our team usually replies within one working day (Mon–Sat, 10 AM–7 PM IST)
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#0E2A1C] bg-[#0E2A1C]/5 border border-[#0E2A1C]/20 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E2A1C] animate-pulse"></span>
          <span>Studio Active</span>
        </div>
      </div>

      {/* Messages Thread List */}
      <div className={cn("flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-gradient-to-b from-white to-[#FAFAFA]", compact ? "max-h-[360px]" : "max-h-[500px]")}>
        {messages.length === 0 ? (
          <div className="p-6 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-[#0A0A0A]">
              <MessageCircle className="w-4 h-4" />
            </div>
            <p className="text-xs text-[#0A0A0A] font-medium">
              Namaste {currentUserName}! Welcome to your dedicated Svvayam sanctum portal.
            </p>
            <p className="text-[11px] text-[#5C5C5C] max-w-sm mx-auto leading-relaxed">
              Our temple architects and master guild craftsmen are at your service. Feel free to ask questions about your requirements, layout or references here.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = (currentUserRole === 'customer' && msg.sender_role === 'client') ||
                         (currentUserRole === 'admin' && msg.sender_role === 'admin');

            const isImage = msg.attachment_url && (
              msg.attachment_url.startsWith('data:image/') ||
              msg.attachment_url.match(/\.(jpeg|jpg|gif|png|webp)($|\?)/i)
            );

            const isRead = isMe
              ? (msg.sender_role === 'client' ? msg.read_by_admin : msg.read_by_customer)
              : true;

            const senderLabel = isMe
              ? 'You'
              : (msg.sender_role === 'client' ? (currentUserName || 'Customer') : 'Svvayam Studio (Admin)');

            return (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[85%] sm:max-w-[75%]",
                  isMe ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                {/* Sender Name & Role */}
                <div className="flex items-center space-x-1.5 mb-1 px-1 text-[10px] text-[#737373]">
                  <span className="font-medium text-[#0A0A0A]">{senderLabel}</span>
                  <span>•</span>
                  <span className="capitalize">{msg.sender_role === 'client' ? 'Customer' : 'Admin'}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "p-3.5 rounded-[16px] text-xs font-sans leading-relaxed shadow-xs relative",
                    isMe
                      ? "bg-gradient-to-b from-[#2A2A2A] to-[#0A0A0A] text-white rounded-tr-xs"
                      : "bg-white border border-[#ECECEC] text-[#0A0A0A] rounded-tl-xs"
                  )}
                >
                  {/* Text Content */}
                  {msg.body && <p className="whitespace-pre-wrap select-text">{escapeMessageText(msg.body)}</p>}

                  {/* Attachment Preview */}
                  {msg.attachment_url && (
                    <div className="mt-2.5 pt-2 border-t border-white/10">
                      {isImage ? (
                        <a
                          href={msg.attachment_url}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-lg overflow-hidden border border-white/20 hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={msg.attachment_url}
                            alt={msg.attachment_name || 'Attachment'}
                            className="max-h-48 w-auto object-cover rounded-lg"
                          />
                        </a>
                      ) : (
                        <a
                          href={msg.attachment_url}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-lg border text-xs font-mono transition-colors",
                            isMe
                              ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                              : "bg-[#FAFAFA] text-[#0A0A0A] border-[#ECECEC] hover:bg-[#F0F0F0]"
                          )}
                        >
                          <FileText className="w-4 h-4 shrink-0 text-[#0E2A1C]" />
                          <span className="truncate max-w-[200px]">
                            {msg.attachment_name || 'Attached Document.pdf'}
                          </span>
                          <ExternalLink className="w-3 h-3 ml-auto shrink-0 opacity-60" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Timestamp & Status Markers */}
                <div className="flex items-center space-x-1.5 mt-1 px-1 text-[10px] text-[#737373] font-mono">
                  <span>
                    {new Date(msg.created_at).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {isMe && (
                    <span title={isRead ? 'Read' : 'Delivered'}>
                      {isRead ? (
                        <CheckCheck className="w-3 h-3 text-[#0E2A1C]" />
                      ) : (
                        <Check className="w-3 h-3 text-neutral-400" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={scrollEndRef} />
      </div>

      {/* Attachment Upload Error Notice */}
      {uploadError && (
        <div className="px-4 py-2 bg-red-50 text-red-600 text-xs border-t border-red-100 flex items-center justify-between">
          <span>{uploadError}</span>
          <button onClick={() => setUploadError(null)} className="cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Pending Attachment Chip */}
      {attachment && (
        <div className="px-4 py-2 bg-[#FAFAFA] border-t border-[#ECECEC] flex items-center justify-between text-xs font-sans">
          <div className="flex items-center space-x-2 truncate">
            {attachment.type === 'image' ? (
              <img
                src={attachment.previewUrl}
                alt="Upload preview"
                className="w-6 h-6 object-cover rounded"
              />
            ) : (
              <FileText className="w-4 h-4 text-[#0E2A1C]" />
            )}
            <span className="truncate text-[#0A0A0A] font-medium text-xs">
              {attachment.name}
            </span>
            <span className="text-[10px] text-neutral-400">
              ({(attachment.file.size / (1024 * 1024)).toFixed(1)} MB)
            </span>
          </div>

          <button
            type="button"
            onClick={removeAttachment}
            className="text-neutral-400 hover:text-red-600 cursor-pointer p-1"
            title="Remove attachment"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input Message Form */}
      <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-[#ECECEC] bg-white flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 rounded-full border border-[#ECECEC] hover:border-[#0A0A0A] text-[#5C5C5C] hover:text-[#0A0A0A] transition-colors cursor-pointer shrink-0"
          title="Attach image or PDF (max 10 MB)"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputText}
          maxLength={MAX_MESSAGE_LENGTH}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your question or message for our architects..."
          className="flex-1 px-4 py-2.5 text-xs font-sans bg-[#F9F9F9] focus:bg-white rounded-full border border-[#ECECEC] focus:border-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#0E2A1C]"
        />

        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={sending || (!inputText.trim() && !attachment)}
          className="rounded-full px-4 h-9 shrink-0 flex items-center gap-1.5"
        >
          <span>{sending ? 'Sending...' : 'Send'}</span>
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </div>
  );
};

export default PortalChat;
