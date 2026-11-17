import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  limit,
  serverTimestamp,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import type { Message, CustomerConversation, SenderRole } from '../../types/message';
import { getRegisteredCustomers } from '../../context/AuthContext';
import { formatProjectName } from '../utils';

const LOCAL_STORAGE_MESSAGES_KEY = 'svvayam_messages_v2';
export const MAX_MESSAGE_LENGTH = 2000;

export function escapeMessageText(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

function saveLocalMessages(messages: Message[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(messages));
    window.dispatchEvent(new CustomEvent('svvayam-messages-updated'));
  } catch (err) {
    console.warn('Local messages save error:', err);
  }
}

/**
 * Sends a message from customer or admin via Firestore with local caching.
 */
export async function sendChatMessage(params: {
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

  // 1. Persist to Firestore if configured
  if (isFirebaseConfigured && db) {
    try {
      const msgRef = doc(db, 'messages', newId);
      await setDoc(msgRef, {
        id: newMsg.id,
        customer_id: newMsg.customer_id,
        sender_role: newMsg.sender_role,
        sender_id: newMsg.sender_id,
        body: newMsg.body,
        read_by_admin: newMsg.read_by_admin,
        read_by_customer: newMsg.read_by_customer,
        attachment_url: newMsg.attachment_url,
        attachment_name: newMsg.attachment_name,
        created_at: serverTimestamp(),
        created_at_iso: newMsg.created_at
      });
    } catch (err: any) {
      console.warn('[Firestore] sendChatMessage warning, using local cache:', err);
    }
  }

  // 2. Always persist to local cache for instant UI feedback
  const current = getLocalMessages();
  if (!current.some(m => m.id === newMsg.id)) {
    saveLocalMessages([...current, newMsg]);
  }

  return newMsg;
}

/**
 * Fetches all messages for a specific customer thread.
 */
export async function fetchCustomerChatMessages(customerId: string): Promise<Message[]> {
  if (!customerId) return [];

  let remoteMessages: Message[] = [];

  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'messages');
      const q = query(
        colRef,
        where('customer_id', '==', customerId),
        limit(200)
      );
      const snap = await getDocs(q);
      snap.forEach(d => {
        const data = d.data();
        remoteMessages.push({
          id: d.id,
          customer_id: data.customer_id,
          sender_role: data.sender_role,
          sender_id: data.sender_id,
          body: data.body || '',
          created_at: data.created_at_iso || (data.created_at?.toDate?.() ? data.created_at.toDate().toISOString() : new Date().toISOString()),
          read_by_admin: Boolean(data.read_by_admin),
          read_by_customer: Boolean(data.read_by_customer),
          attachment_url: data.attachment_url || null,
          attachment_name: data.attachment_name || null
        });
      });
    } catch (err) {
      console.warn('[Firestore] fetchCustomerChatMessages error:', err);
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
export async function fetchAdminChatConversations(): Promise<CustomerConversation[]> {
  let allMessages: Message[] = [];

  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'messages');
      const snap = await getDocs(query(colRef, limit(500)));
      snap.forEach(d => {
        const data = d.data();
        allMessages.push({
          id: d.id,
          customer_id: data.customer_id,
          sender_role: data.sender_role,
          sender_id: data.sender_id,
          body: data.body || '',
          created_at: data.created_at_iso || (data.created_at?.toDate?.() ? data.created_at.toDate().toISOString() : new Date().toISOString()),
          read_by_admin: Boolean(data.read_by_admin),
          read_by_customer: Boolean(data.read_by_customer),
          attachment_url: data.attachment_url || null,
          attachment_name: data.attachment_name || null
        });
      });
    } catch (err) {
      console.warn('[Firestore] fetchAdminChatConversations error:', err);
    }
  }

  // Merge with local messages
  const local = getLocalMessages();
  const map = new Map<string, Message>();
  for (const m of allMessages) map.set(m.id, m);
  for (const m of local) if (!map.has(m.id)) map.set(m.id, m);

  const merged = Array.from(map.values());

  // Customer metadata lookup map
  const profilesMap = new Map<string, { name: string; phone: string; project_name?: string }>();

  // Fetch profiles from Firestore
  if (isFirebaseConfigured && db) {
    try {
      const profSnap = await getDocs(collection(db, 'profiles'));
      profSnap.forEach(d => {
        const p = d.data();
        const proj = p.project_name || formatProjectName({ title: p.title, surname: p.surname, product: p.product, client_name: p.name });
        profilesMap.set(d.id, {
          name: p.name || 'Valued Customer',
          phone: p.phone || '',
          project_name: proj
        });
      });
    } catch {}
  }

  // Also merge with registered customers cache
  const registered = getRegisteredCustomers();
  for (const c of registered) {
    if (!profilesMap.has(c.id)) {
      const proj = c.project_name || formatProjectName({ title: c.title, surname: c.surname, product: c.product, client_name: c.name });
      profilesMap.set(c.id, {
        name: c.name || 'Valued Customer',
        phone: c.phone || '',
        project_name: proj
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
    msgs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const lastMsg = msgs[0];
    const unreadCount = msgs.filter(m => m.sender_role === 'client' && !m.read_by_admin).length;
    const info = profilesMap.get(customerId) || { name: 'Customer (' + customerId.slice(0, 8) + ')', phone: '' };

    conversations.push({
      customer_id: customerId,
      customer_name: info.name,
      customer_phone: info.phone,
      project_name: info.project_name,
      last_message: lastMsg,
      unread_count: unreadCount
    });
  }

  conversations.sort((a, b) => new Date(b.last_message.created_at).getTime() - new Date(a.last_message.created_at).getTime());
  return conversations;
}

/**
 * Marks customer messages as read by admin.
 */
export async function markChatAsReadByAdmin(customerId: string): Promise<void> {
  if (!customerId) return;

  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'messages'),
        where('customer_id', '==', customerId),
        where('read_by_admin', '==', false)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const batch = writeBatch(db);
        snap.forEach(d => {
          batch.update(d.ref, { read_by_admin: true });
        });
        await batch.commit();
      }
    } catch (err) {
      console.warn('[Firestore] markChatAsReadByAdmin error:', err);
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
export async function markChatAsReadByCustomer(customerId: string): Promise<void> {
  if (!customerId) return;

  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'messages'),
        where('customer_id', '==', customerId),
        where('read_by_customer', '==', false)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const batch = writeBatch(db);
        snap.forEach(d => {
          batch.update(d.ref, { read_by_customer: true });
        });
        await batch.commit();
      }
    } catch (err) {
      console.warn('[Firestore] markChatAsReadByCustomer error:', err);
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
 * Subscribes to real-time changes on the messages collection for admin.
 */
export function subscribeToAdminChatMessages(onChange: () => void): () => void {
  if (!isFirebaseConfigured || !db) {
    const handleLocal = () => onChange();
    window.addEventListener('svvayam-messages-updated', handleLocal);
    return () => window.removeEventListener('svvayam-messages-updated', handleLocal);
  }

  const colRef = collection(db, 'messages');
  const unsub = onSnapshot(colRef, () => {
    onChange();
  }, (err) => {
    console.warn('[Firestore] Admin messages listener notice:', err);
  });

  const handleLocal = () => onChange();
  window.addEventListener('svvayam-messages-updated', handleLocal);

  return () => {
    unsub();
    window.removeEventListener('svvayam-messages-updated', handleLocal);
  };
}

/**
 * Subscribes to real-time changes on messages for a specific customer.
 */
export function subscribeToCustomerChatMessages(customerId: string, onChange: () => void): () => void {
  if (!isFirebaseConfigured || !db || !customerId) {
    const handleLocal = () => onChange();
    window.addEventListener('svvayam-messages-updated', handleLocal);
    return () => window.removeEventListener('svvayam-messages-updated', handleLocal);
  }

  const q = query(collection(db, 'messages'), where('customer_id', '==', customerId));
  const unsub = onSnapshot(q, () => {
    onChange();
  }, (err) => {
    console.warn('[Firestore] Customer messages listener notice:', err);
  });

  const handleLocal = () => onChange();
  window.addEventListener('svvayam-messages-updated', handleLocal);

  return () => {
    unsub();
    window.removeEventListener('svvayam-messages-updated', handleLocal);
  };
}
