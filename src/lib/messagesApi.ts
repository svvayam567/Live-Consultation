import { supabase, isSupabaseConfigured } from './supabase';
import type { Message, CustomerConversation, SenderRole } from '../types/message';
import { getRegisteredCustomers } from '../context/AuthContext';

const LOCAL_STORAGE_MESSAGES_KEY = 'svvayam_messages_v2';
export const MAX_MESSAGE_LENGTH = 2000;

/**
 * Escapes HTML characters in message strings to prevent XSS / script injection.
 */
export function escapeMessageText(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Reads local messages cache.
 */
function getLocalMessages(): Message[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Local messages parse error:', err);
  }
  return [];
}

/**
 * Saves local messages cache.
 */
function saveLocalMessages(messages: Message[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(messages));
    window.dispatchEvent(new CustomEvent('svvayam-messages-updated'));
  } catch (err) {
    console.warn('Local messages save error:', err);
  }
}

/**
 * Sends a message from customer or admin.
 */
export async function sendMessage(params: {
  customerId: string;
  senderRole: SenderRole;
  senderId?: string | null;
  body: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
}): Promise<Message> {
  const trimmed = params.body ? params.body.trim() : '';
  if (!trimmed && !params.attachmentUrl) {
    throw new Error('Message cannot be empty');
  }
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Message exceeds maximum limit of ${MAX_MESSAGE_LENGTH} characters`);
  }

  const newId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);

  const newMsg: Message = {
    id: newId,
    customer_id: params.customerId,
    sender_role: params.senderRole,
    sender_id: params.senderId || null,
    body: trimmed,
    created_at: new Date().toISOString(),
    read_by_admin: params.senderRole === 'admin',
    read_by_customer: params.senderRole === 'client',
    attachment_url: params.attachmentUrl || null,
    attachment_name: params.attachmentName || null
  };

  // 1. Try Supabase insert
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          id: newMsg.id,
          customer_id: newMsg.customer_id,
          sender_role: newMsg.sender_role,
          sender_id: newMsg.sender_id,
          body: newMsg.body,
          created_at: newMsg.created_at,
          read_by_admin: newMsg.read_by_admin,
          read_by_customer: newMsg.read_by_customer,
          attachment_url: newMsg.attachment_url,
          attachment_name: newMsg.attachment_name
        })
        .select()
        .single();

      if (error) {
        console.warn('Supabase message insert error, falling back to local storage:', error.message);
      } else if (data) {
        newMsg.id = data.id;
      }
    } catch (err) {
      console.warn('Supabase message send exception:', err);
    }
  }

  // 2. Always persist to local cache for instant UI and offline safety
  const current = getLocalMessages();
  const exists = current.some(m => m.id === newMsg.id);
  if (!exists) {
    saveLocalMessages([...current, newMsg]);
  }

  return newMsg;
}

/**
 * Fetches all messages for a specific customer thread.
 */
export async function fetchCustomerMessages(customerId: string): Promise<Message[]> {
  if (!customerId) return [];

  let remoteMessages: Message[] = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: true });

      if (!error && Array.isArray(data)) {
        remoteMessages = data as Message[];
      }
    } catch (err) {
      console.warn('Supabase fetchCustomerMessages error:', err);
    }
  }

  const localMessages = getLocalMessages().filter(m => m.customer_id === customerId);

  // Merge unique messages by id
  const map = new Map<string, Message>();
  for (const m of remoteMessages) {
    map.set(m.id, m);
  }
  for (const m of localMessages) {
    if (!map.has(m.id)) {
      map.set(m.id, m);
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
}

/**
 * Fetches all conversations grouped by customer for the admin inbox.
 */
export async function fetchAdminConversations(): Promise<CustomerConversation[]> {
  let allMessages: Message[] = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        allMessages = data as Message[];
      }
    } catch (err) {
      console.warn('Supabase fetchAdminConversations error:', err);
    }
  }

  // Merge with local messages
  const local = getLocalMessages();
  const map = new Map<string, Message>();
  for (const m of allMessages) {
    map.set(m.id, m);
  }
  for (const m of local) {
    if (!map.has(m.id)) {
      map.set(m.id, m);
    }
  }

  const merged = Array.from(map.values());

  // Also build profile lookup for customer names & phone numbers
  const profilesMap = new Map<string, { name: string; phone: string; project_name?: string }>();

  // Fetch profiles from Supabase if connected
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, phone, project_name');
      if (Array.isArray(profiles)) {
        for (const p of profiles) {
          profilesMap.set(p.id, {
            name: p.name || 'Valued Customer',
            phone: p.phone || '',
            project_name: p.project_name
          });
        }
      }
    } catch {
      // Ignored
    }
  }

  // Also merge with registered customers cache
  const registered = getRegisteredCustomers();
  for (const c of registered) {
    if (!profilesMap.has(c.id)) {
      profilesMap.set(c.id, {
        name: c.name || 'Valued Customer',
        phone: c.phone || '',
        project_name: c.project_name
      });
    }
  }

  // Group messages by customer_id
  const customerGroups = new Map<string, Message[]>();
  for (const msg of merged) {
    if (!msg.customer_id) continue;
    const group = customerGroups.get(msg.customer_id) || [];
    group.push(msg);
    customerGroups.set(msg.customer_id, group);
  }

  const conversations: CustomerConversation[] = [];

  for (const [customerId, msgs] of customerGroups.entries()) {
    // Sort chronological descending to get newest message first
    msgs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const lastMsg = msgs[0];
    const unreadCount = msgs.filter(m => m.sender_role === 'client' && !m.read_by_admin).length;

    const profile = profilesMap.get(customerId);
    const customerName = profile?.name || `Customer (${customerId.slice(0, 8)})`;
    const customerPhone = profile?.phone || '';
    const projectName = profile?.project_name;

    conversations.push({
      customer_id: customerId,
      customer_name: customerName,
      customer_phone: customerPhone,
      project_name: projectName,
      last_message: lastMsg,
      unread_count: unreadCount
    });
  }

  // Sort conversations by newest message on top
  conversations.sort(
    (a, b) => new Date(b.last_message.created_at).getTime() - new Date(a.last_message.created_at).getTime()
  );

  return conversations;
}

/**
 * Calculates total unread customer messages for admin.
 */
export async function getAdminTotalUnreadCount(): Promise<number> {
  const conversations = await fetchAdminConversations();
  return conversations.reduce((acc, c) => acc + c.unread_count, 0);
}

/**
 * Marks all messages from a customer as read by admin.
 */
export async function markAsReadByAdmin(customerId: string): Promise<void> {
  if (!customerId) return;

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('messages')
        .update({ read_by_admin: true })
        .eq('customer_id', customerId)
        .eq('read_by_admin', false);
    } catch (err) {
      console.warn('markAsReadByAdmin Supabase error:', err);
    }
  }

  const local = getLocalMessages();
  let changed = false;
  const updated = local.map(m => {
    if (m.customer_id === customerId && !m.read_by_admin) {
      changed = true;
      return { ...m, read_by_admin: true };
    }
    return m;
  });

  if (changed) {
    saveLocalMessages(updated);
  }
}

/**
 * Marks messages as read by customer.
 */
export async function markAsReadByCustomer(customerId: string): Promise<void> {
  if (!customerId) return;

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('messages')
        .update({ read_by_customer: true })
        .eq('customer_id', customerId)
        .eq('read_by_customer', false);
    } catch (err) {
      console.warn('markAsReadByCustomer Supabase error:', err);
    }
  }

  const local = getLocalMessages();
  let changed = false;
  const updated = local.map(m => {
    if (m.customer_id === customerId && !m.read_by_customer) {
      changed = true;
      return { ...m, read_by_customer: true };
    }
    return m;
  });

  if (changed) {
    saveLocalMessages(updated);
  }
}

/**
 * Subscribes to real-time changes on the messages table for admin (all messages).
 * Falls back to polling every 3.5 seconds.
 */
export function subscribeToAdminMessages(onChange: () => void): () => void {
  let isUnsubscribed = false;

  const handleCustomEvent = () => {
    if (!isUnsubscribed) onChange();
  };
  window.addEventListener('svvayam-messages-updated', handleCustomEvent);

  let channel: any = null;
  if (isSupabaseConfigured && supabase) {
    try {
      channel = supabase
        .channel('admin_global_messages_' + Date.now())
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'messages' },
          () => {
            if (!isUnsubscribed) onChange();
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Realtime admin channel subscribe error:', err);
    }
  }

  // Polling fallback every 3.5 seconds
  const intervalId = setInterval(() => {
    if (!isUnsubscribed) onChange();
  }, 3500);

  return () => {
    isUnsubscribed = true;
    window.removeEventListener('svvayam-messages-updated', handleCustomEvent);
    clearInterval(intervalId);
    if (channel && supabase) {
      try {
        supabase.removeChannel(channel);
      } catch {}
    }
  };
}

/**
 * Subscribes to real-time changes on the messages table for a specific customer.
 * Falls back to polling every 3.5 seconds.
 */
export function subscribeToCustomerMessages(
  customerId: string,
  onChange: () => void
): () => void {
  if (!customerId) return () => {};
  let isUnsubscribed = false;

  const handleCustomEvent = () => {
    if (!isUnsubscribed) onChange();
  };
  window.addEventListener('svvayam-messages-updated', handleCustomEvent);

  let channel: any = null;
  if (isSupabaseConfigured && supabase) {
    try {
      channel = supabase
        .channel(`customer_messages_${customerId}_${Date.now()}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'messages',
            filter: `customer_id=eq.${customerId}`
          },
          () => {
            if (!isUnsubscribed) onChange();
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Realtime customer channel subscribe error:', err);
    }
  }

  // Polling fallback every 3.5 seconds
  const intervalId = setInterval(() => {
    if (!isUnsubscribed) onChange();
  }, 3500);

  return () => {
    isUnsubscribed = true;
    window.removeEventListener('svvayam-messages-updated', handleCustomEvent);
    clearInterval(intervalId);
    if (channel && supabase) {
      try {
        supabase.removeChannel(channel);
      } catch {}
    }
  };
}
