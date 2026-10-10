export type SenderRole = 'client' | 'admin';

export interface Message {
  id: string;
  customer_id: string;
  sender_role: SenderRole;
  sender_id: string | null;
  body: string;
  created_at: string;
  read_by_admin: boolean;
  read_by_customer: boolean;
  attachment_url?: string | null;
  attachment_name?: string | null;
}

export interface CustomerConversation {
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  project_name?: string;
  last_message: Message;
  unread_count: number;
}
