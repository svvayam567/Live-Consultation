import React, { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { PortalMessage } from '../../types/consultation';
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
  currentUserRole: 'customer' | 'admin';
  currentUserName: string;
  currentUserId: string;
  prefillContext?: string | null;
  onClearPrefill?: () => void;
  className?: string;
  compact?: boolean;
}

const LOCAL_STORAGE_MESSAGES_PREFIX = 'svvayam_messages_v1_';

export const PortalChat: React.FC<PortalChatProps> = ({
  consultationId,
  currentUserRole,
  currentUserName,
  currentUserId,
  prefillContext,
  onClearPrefill,
  className,
  compact = false
}) => {
  const [messages, setMessages] = useState<PortalMessage[]>([]);
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

  // Sync prefill context into input text
  useEffect(() => {
    if (prefillContext) {
      setInputText(prev => {
        const prefix = `[Regarding ${prefillContext}]: `;
        return prev.startsWith(prefix) ? prev : `${prefix}${prev}`;
      });
    }
  }, [prefillContext]);

  // Load message thread from Supabase or LocalStorage
  const loadMessages = async () => {
    if (isSupabaseConfigured && supabase && consultationId) {
      try {
        const { data, error } = await supabase
          .from('portal_messages')
          .select('*')
          .eq('consultation_id', consultationId)
          .order('created_at', { ascending: true });

        if (!error && data) {
          setMessages(data as PortalMessage[]);
          // Mark received messages as read
          const unreadIds = data
            .filter((m: any) => m.sender_role !== currentUserRole && !m.is_read)
            .map((m: any) => m.id);

          if (unreadIds.length > 0) {
            await supabase
              .from('portal_messages')
              .update({ is_read: true })
              .in('id', unreadIds);
          }
          return;
        }
      } catch (err) {
        console.warn('Portal messages query notice:', err);
      }
    }

    // Mock development fallback
    try {
      const stored = localStorage.getItem(`${LOCAL_STORAGE_MESSAGES_PREFIX}${consultationId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      // Ignored
    }

    // Default welcome messages in thread
    const defaultMessages: PortalMessage[] = [
      {
        id: 'msg-seed-1',
        consultation_id: consultationId,
        sender_id: 'team-svvayam',
        sender_role: 'team',
        sender_name: 'Svvayam Design Studio',
        content: `Namaste ${currentUserName}! Welcome to your dedicated Svvayam project portal. Our temple architects and master guild craftsmen are at your service. Feel free to ask questions about your requirements, layout or references here.`,
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        is_read: true,
        delivery_status: 'read'
      }
    ];
    setMessages(defaultMessages);
    localStorage.setItem(
      `${LOCAL_STORAGE_MESSAGES_PREFIX}${consultationId}`,
      JSON.stringify(defaultMessages)
    );
  };

  useEffect(() => {
    loadMessages();

    // Setup Supabase Realtime channel
    if (isSupabaseConfigured && supabase && consultationId) {
      const client = supabase;
      const channel = client
        .channel(`portal_messages:${consultationId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'portal_messages',
            filter: `consultation_id=eq.${consultationId}`
          },
          (payload) => {
            const newMsg = payload.new as PortalMessage;
            setMessages(prev => {
              if (prev.some(m => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
            // Mark as read if received from opposite party
            if (newMsg.sender_role !== currentUserRole) {
              client
                .from('portal_messages')
                .update({ is_read: true })
                .eq('id', newMsg.id);
            }
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    }
  }, [consultationId, currentUserRole]);

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

    setSending(true);
    setUploadError(null);

    let uploadedUrl: string | undefined = undefined;
    let attachmentName: string | undefined = undefined;
    let attachmentType: string | undefined = undefined;

    if (attachment) {
      attachmentName = attachment.name;
      attachmentType = attachment.type;

      if (isSupabaseConfigured && supabase) {
        try {
          const fileExt = attachment.file.name.split('.').pop();
          const filePath = `${consultationId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const { error: uploadErr } = await supabase.storage
            .from('portal-attachments')
            .upload(filePath, attachment.file, {
              cacheControl: '3600',
              upsert: false
            });

          if (!uploadErr) {
            // Generate short-lived signed URL (24 hours)
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

      // If mock mode or upload failed, convert to Data URL for instant rendering
      if (!uploadedUrl) {
        uploadedUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(attachment.file);
        });
      }
    }

    const newMsg: PortalMessage = {
      id: 'msg-' + Date.now(),
      consultation_id: consultationId,
      sender_id: currentUserId,
      sender_role: currentUserRole,
      sender_name: currentUserName,
      content: inputText.trim(),
      attachment_url: uploadedUrl,
      attachment_name: attachmentName,
      attachment_type: attachmentType,
      section_context: prefillContext || undefined,
      is_read: false,
      created_at: new Date().toISOString(),
      delivery_status: 'delivered'
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('portal_messages').insert({
          consultation_id: consultationId,
          sender_id: currentUserId,
          sender_role: currentUserRole,
          sender_name: currentUserName,
          content: newMsg.content,
          attachment_url: newMsg.attachment_url,
          attachment_name: newMsg.attachment_name,
          attachment_type: newMsg.attachment_type,
          section_context: newMsg.section_context,
          is_read: false
        });
      } catch (err) {
        console.warn('Realtime message insert error:', err);
      }
    }

    // Update local state
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(
      `${LOCAL_STORAGE_MESSAGES_PREFIX}${consultationId}`,
      JSON.stringify(updated)
    );

    setInputText('');
    setAttachment(null);
    if (onClearPrefill) onClearPrefill();
    setSending(false);

    // Dev mode auto-reply simulation for customers
    if (!isSupabaseConfigured && currentUserRole === 'customer') {
      setTimeout(() => {
        const autoReply: PortalMessage = {
          id: 'reply-' + Date.now(),
          consultation_id: consultationId,
          sender_id: 'team-svvayam',
          sender_role: 'team',
          sender_name: 'Svvayam Studio (Ar. Jagirdhar)',
          content: `Thank you for sharing your inquiry, ${currentUserName}. We have logged this with our chief temple architect and will update your drawing specifications shortly.`,
          created_at: new Date().toISOString(),
          is_read: true,
          delivery_status: 'read'
        };
        setMessages(prev => {
          const next = [...prev, autoReply];
          localStorage.setItem(
            `${LOCAL_STORAGE_MESSAGES_PREFIX}${consultationId}`,
            JSON.stringify(next)
          );
          return next;
        });
      }, 1500);
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
            <h3 className="text-xs font-semibold text-[#0A0A0A]">
              Direct Message · Svvayam Architecture Guild
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
        {messages.map((msg) => {
          const isMe = msg.sender_role === currentUserRole;

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
                <span className="font-medium text-[#0A0A0A]">{msg.sender_name}</span>
                <span>•</span>
                <span className="capitalize">{msg.sender_role}</span>
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
                {/* Section context tag if prefilled */}
                {msg.section_context && (
                  <div className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-md mb-1.5 inline-block border",
                    isMe
                      ? "bg-white/10 text-neutral-200 border-white/20"
                      : "bg-[#FAFAFA] text-[#0E2A1C] border-[#ECECEC]"
                  )}>
                    Inquiry: {msg.section_context}
                  </div>
                )}

                {/* Text Content */}
                {msg.content && <p className="whitespace-pre-wrap">{msg.content}</p>}

                {/* Attachment Preview */}
                {msg.attachment_url && (
                  <div className="mt-2.5 pt-2 border-t border-white/10">
                    {msg.attachment_type === 'image' ? (
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
                  <span title={msg.is_read ? 'Read' : 'Delivered'}>
                    {msg.is_read ? (
                      <CheckCheck className="w-3 h-3 text-[#0E2A1C]" />
                    ) : (
                      <Check className="w-3 h-3 text-neutral-400" />
                    )}
                  </span>
                )}
              </div>
            </div>
          );
        })}
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
