import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { Message, CustomerConversation } from '../../types/message';
import {
  fetchAdminConversations,
  fetchCustomerMessages,
  sendMessage,
  markAsReadByAdmin,
  subscribeToAdminMessages,
  escapeMessageText,
  MAX_MESSAGE_LENGTH
} from '../../lib/messagesApi';
import {
  MessageSquare,
  X,
  ArrowLeft,
  Send,
  Search,
  Check,
  CheckCheck,
  FolderKanban
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const AdminFloatingChat: React.FC = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<CustomerConversation[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerConversation | null>(null);
  const [threadMessages, setThreadMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingThread, setLoadingThread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesCountRef = useRef<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Total unread count for admin badge
  const totalUnreadCount = conversations.reduce((acc, c) => acc + c.unread_count, 0);

  // Refresh conversations list
  const refreshConversations = useCallback(async () => {
    try {
      const data = await fetchAdminConversations();
      setConversations(data);
    } catch (err) {
      console.warn('Failed to refresh admin conversations:', err);
    }
  }, []);

  // Refresh current thread messages if conversation is open
  const refreshCurrentThread = useCallback(async (customerId: string) => {
    try {
      const msgs = await fetchCustomerMessages(customerId);
      setThreadMessages(msgs);
    } catch (err) {
      console.warn('Failed to refresh thread messages:', err);
    }
  }, []);

  // Listen for realtime messages and polling updates
  useEffect(() => {
    refreshConversations();

    const unsubscribe = subscribeToAdminMessages(() => {
      refreshConversations();
      if (selectedCustomer) {
        refreshCurrentThread(selectedCustomer.customer_id);
      }
    });

    return () => unsubscribe();
  }, [refreshConversations, refreshCurrentThread, selectedCustomer]);

  // When a customer is selected, open conversation and mark unread messages as read
  const handleSelectCustomer = async (conv: CustomerConversation) => {
    setSelectedCustomer(conv);
    setLoadingThread(true);
    setInputText('');

    try {
      const msgs = await fetchCustomerMessages(conv.customer_id);
      setThreadMessages(msgs);
      prevMessagesCountRef.current = msgs.length;

      // Mark messages as read by admin
      if (conv.unread_count > 0) {
        await markAsReadByAdmin(conv.customer_id);
        // Optimistically update conversation unread badge
        setConversations(prev =>
          prev.map(c =>
            c.customer_id === conv.customer_id ? { ...c, unread_count: 0 } : c
          )
        );
      }
    } finally {
      setLoadingThread(false);
    }

    // Scroll to newest message on opening thread
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, 50);
  };

  // Auto-scroll to bottom only when new messages arrive
  useEffect(() => {
    if (threadMessages.length > prevMessagesCountRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMessagesCountRef.current = threadMessages.length;
  }, [threadMessages]);

  // Send reply to customer
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedCustomer || !inputText.trim() || sending) return;

    const trimmed = inputText.trim();
    if (trimmed.length > MAX_MESSAGE_LENGTH) return;

    setSending(true);
    try {
      const newMsg = await sendMessage({
        customerId: selectedCustomer.customer_id,
        senderRole: 'admin',
        senderId: user?.id,
        body: trimmed
      });

      // Optimistically update thread
      setThreadMessages(prev => [...prev, newMsg]);
      setInputText('');

      // Refresh conversations to update preview
      refreshConversations();

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        textareaRef.current?.focus();
      }, 50);
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  // Handle enter key to send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter conversations by customer name or phone
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const nameMatch = conv.customer_name?.toLowerCase().includes(q);
    const phoneMatch = conv.customer_phone?.replace(/\D/g, '').includes(q.replace(/\D/g, ''));
    const projectMatch = conv.project_name?.toLowerCase().includes(q);
    return nameMatch || phoneMatch || projectMatch;
  });

  const formatMessageTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24 && date.getDate() === now.getDate()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. FLOATING ROUND CHAT BUTTON (Fixed bottom-right corner) */}
      {/* Monochrome black styling with yellow accent and red unread badge */}
      {/* ========================================================= */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(
            "relative w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#0A0A0A] text-white",
            "shadow-[0_12px_32px_rgba(0,0,0,0.38)] border border-neutral-700/70",
            "hover:bg-[#1A1A1A] hover:border-neutral-500 transition-all duration-200",
            "flex items-center justify-center cursor-pointer group transform hover:scale-105 active:scale-95"
          )}
          aria-label="Open Customer Chat Inbox"
          title="Customer Inquiries & Live Chat"
        >
          <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />

          {/* Small Yellow Accent Dot */}
          <span
            className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#EAB308] ring-2 ring-[#0A0A0A] shadow-xs"
            title="Svvayam Live Studio"
          />

          {/* Red Unread Count Badge (Hidden when 0) */}
          {totalUnreadCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full bg-rose-600 text-white font-mono text-[11px] font-bold flex items-center justify-center ring-2 ring-white shadow-md animate-pulse"
              aria-label={`${totalUnreadCount} unread messages`}
            >
              {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
            </span>
          )}
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. CHAT PANEL DRAWER (Right drawer on desktop, full screen on mobile) */}
      {/* ========================================================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop Overlay (Desktop) */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div className="relative w-full sm:max-w-md md:max-w-lg h-full bg-white shadow-2xl border-l border-[#ECECEC] flex flex-col z-50 animate-in slide-in-from-right duration-300">

            {/* =================================================== */}
            {/* VIEW 1: INBOX VIEW */}
            {/* =================================================== */}
            {!selectedCustomer ? (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Inbox Header */}
                <div className="p-4 sm:p-5 border-b border-[#ECECEC] bg-white flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shadow-xs">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-base sm:text-lg text-[#0A0A0A] leading-tight">
                        Customer Inquiries
                      </h3>
                      <p className="text-[11px] font-sans text-[#5C5C5C]">
                        Direct client messages from sanctum portals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {totalUnreadCount > 0 && (
                      <span className="text-[11px] font-mono font-medium text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        {totalUnreadCount} unread
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#0A0A0A] hover:bg-neutral-100 transition-colors cursor-pointer"
                      aria-label="Close Chat"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Search Box */}
                <div className="p-3 sm:px-5 sm:py-3 border-b border-[#ECECEC] bg-[#FAFAFA]">
                  <div className="relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by customer name or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-[12px] border border-[#ECECEC] bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] shadow-2xs"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto divide-y divide-[#F1F1F1]">
                  {filteredConversations.length === 0 ? (
                    <div className="p-10 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                        <MessageSquare className="w-5 h-5 text-neutral-400" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-[#0A0A0A]">
                          {searchQuery ? 'No matching conversations' : 'No customer messages yet'}
                        </h4>
                        <p className="text-[11px] text-[#5C5C5C] max-w-xs mx-auto leading-relaxed">
                          {searchQuery
                            ? 'Try searching with another name or phone number.'
                            : 'When clients send inquiries through their customer portal, conversations will appear here live.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    filteredConversations.map((conv) => {
                      const hasUnread = conv.unread_count > 0;

                      return (
                        <button
                          key={conv.customer_id}
                          type="button"
                          onClick={() => handleSelectCustomer(conv)}
                          className={cn(
                            "w-full text-left p-4 sm:px-5 hover:bg-neutral-50 transition-colors flex items-start space-x-3.5 cursor-pointer group",
                            hasUnread && "bg-rose-50/30"
                          )}
                        >
                          {/* Avatar */}
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs shrink-0 transition-transform group-hover:scale-105",
                            hasUnread
                              ? "bg-[#0A0A0A] text-white ring-2 ring-rose-500 shadow-xs"
                              : "bg-neutral-100 text-[#0A0A0A] border border-[#ECECEC]"
                          )}>
                            {conv.customer_name ? conv.customer_name.slice(0, 2).toUpperCase() : 'CU'}
                          </div>

                          {/* Conversation Preview Details */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className={cn(
                                "text-xs font-sans truncate",
                                hasUnread ? "font-bold text-[#0A0A0A]" : "font-medium text-[#0A0A0A]"
                              )}>
                                {conv.customer_name}
                              </h4>
                              <span className="text-[10px] font-mono text-neutral-400 shrink-0 ml-2">
                                {formatMessageTime(conv.last_message.created_at)}
                              </span>
                            </div>

                            {/* Project Badge / Phone */}
                            <div className="flex items-center space-x-2 text-[10px] text-[#5C5C5C]">
                              {conv.project_name ? (
                                <span className="inline-flex items-center gap-1 font-mono bg-neutral-100 text-[#0A0A0A] px-2 py-0.5 rounded-full border border-neutral-200 truncate max-w-[180px]">
                                  <FolderKanban className="w-2.5 h-2.5 text-neutral-500 shrink-0" />
                                  <span className="truncate">{conv.project_name}</span>
                                </span>
                              ) : conv.customer_phone ? (
                                <span className="font-mono text-neutral-400">
                                  {conv.customer_phone}
                                </span>
                              ) : null}
                            </div>

                            {/* Last message text preview */}
                            <p className={cn(
                              "text-xs truncate leading-relaxed",
                              hasUnread ? "font-semibold text-[#0A0A0A]" : "text-[#5C5C5C]"
                            )}>
                              {conv.last_message.sender_role === 'admin' && (
                                <span className="text-neutral-400 font-normal mr-1">You:</span>
                              )}
                              {conv.last_message.body || (conv.last_message.attachment_name ? 'Sent an attachment' : '')}
                            </p>
                          </div>

                          {/* Unread count pill */}
                          {hasUnread && (
                            <div className="shrink-0 flex items-center pt-1">
                              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                                {conv.unread_count}
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              /* =================================================== */
              /* VIEW 2: CONVERSATION THREAD VIEW */
              /* =================================================== */
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Conversation Header */}
                <div className="p-3.5 sm:px-5 border-b border-[#ECECEC] bg-white flex items-center justify-between shadow-2xs">
                  <div className="flex items-center space-x-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCustomer(null);
                        refreshConversations();
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#5C5C5C] hover:text-[#0A0A0A] hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
                      title="Back to Inquiries List"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <div className="min-w-0">
                      <h3 className="font-sans font-semibold text-xs sm:text-sm text-[#0A0A0A] truncate">
                        {selectedCustomer.customer_name}
                      </h3>
                      <div className="flex items-center space-x-2 text-[10px] text-[#5C5C5C] truncate">
                        {selectedCustomer.project_name && (
                          <span className="font-mono text-[#0A0A0A] truncate">
                            {selectedCustomer.project_name}
                          </span>
                        )}
                        {selectedCustomer.customer_phone && (
                          <span className="font-mono text-neutral-400">
                            · {selectedCustomer.customer_phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#0A0A0A] hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages Scroll Area */}
                <div
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[#FAF9F6]/50"
                >
                  {loadingThread ? (
                    <div className="py-20 text-center text-xs text-neutral-400 font-sans">
                      Loading conversation...
                    </div>
                  ) : threadMessages.length === 0 ? (
                    <div className="py-20 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                        <MessageSquare className="w-4 h-4 text-neutral-400" />
                      </div>
                      <p className="text-xs text-[#5C5C5C] font-sans">
                        No messages in this conversation yet. Send a reply below.
                      </p>
                    </div>
                  ) : (
                    threadMessages.map((msg) => {
                      const isAdminMsg = msg.sender_role === 'admin';

                      return (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex flex-col",
                            isAdminMsg ? "items-end" : "items-start"
                          )}
                        >
                          {/* Sender Label */}
                          <span className="text-[10px] font-sans text-neutral-400 mb-1 px-1">
                            {isAdminMsg ? 'Svvayam Studio (You)' : selectedCustomer.customer_name}
                          </span>

                          {/* Message Bubble */}
                          <div
                            className={cn(
                              "max-w-[85%] sm:max-w-[78%] rounded-[18px] p-3 text-xs leading-relaxed space-y-1.5 shadow-xs break-words",
                              isAdminMsg
                                ? "bg-[#0A0A0A] text-white rounded-tr-xs"
                                : "bg-white border border-[#ECECEC] text-[#0A0A0A] rounded-tl-xs"
                            )}
                          >
                            <p className="whitespace-pre-wrap select-text">
                              {escapeMessageText(msg.body)}
                            </p>

                            {/* Optional Attachment */}
                            {msg.attachment_url && (
                              <a
                                href={msg.attachment_url}
                                target="_blank"
                                rel="noreferrer"
                                className={cn(
                                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-[11px] font-mono mt-1 border",
                                  isAdminMsg
                                    ? "bg-white/10 text-neutral-200 border-white/20 hover:bg-white/20"
                                    : "bg-neutral-100 text-[#0A0A0A] border-neutral-200 hover:bg-neutral-200"
                                )}
                              >
                                <span>📎 {msg.attachment_name || 'View Attachment'}</span>
                              </a>
                            )}

                            {/* Time & Read Status */}
                            <div
                              className={cn(
                                "flex items-center justify-end space-x-1 text-[9px] font-mono pt-0.5",
                                isAdminMsg ? "text-neutral-400" : "text-neutral-400"
                              )}
                            >
                              <span>
                                {new Date(msg.created_at).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>

                              {isAdminMsg && (
                                <span title={msg.read_by_customer ? "Read by customer" : "Delivered"}>
                                  {msg.read_by_customer ? (
                                    <CheckCheck className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Check className="w-3 h-3 text-neutral-400" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input Footer */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 sm:p-4 bg-white border-t border-[#ECECEC] space-y-2"
                >
                  <div className="flex items-end space-x-2">
                    <div className="flex-1 min-w-0 relative">
                      <textarea
                        ref={textareaRef}
                        rows={2}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Reply to customer... (Enter sends, Shift+Enter new line)"
                        maxLength={MAX_MESSAGE_LENGTH}
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-[14px] border border-[#ECECEC] bg-[#FAFAFA] text-xs text-[#0A0A0A]",
                          "placeholder:text-neutral-400 resize-none focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0A0A0A]",
                          "transition-all shadow-2xs"
                        )}
                      />

                      {/* Character Count Warning when approaching limit */}
                      {inputText.length > 1500 && (
                        <span className="absolute right-2 bottom-2 text-[9px] font-mono text-neutral-400">
                          {inputText.length}/{MAX_MESSAGE_LENGTH}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!inputText.trim() || sending}
                      className={cn(
                        "w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs",
                        inputText.trim() && !sending
                          ? "bg-[#0A0A0A] text-white hover:bg-[#222] active:scale-95"
                          : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                      )}
                      title="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminFloatingChat;
