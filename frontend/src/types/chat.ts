// types/chat.ts
// ✅ Export interfaces ที่ชัดเจน

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'system';
  isEdited?: boolean;
  replyTo?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  members: User[];
  lastMessage?: Message;
  unreadCount: number;
  isPrivate: boolean;
  createdAt: Date;
}

export interface TypingUser {
  userId: string;
  username: string;
  timestamp: Date;
}

export interface ChatState {
  currentRoom: ChatRoom | null;
  messages: Message[];
  typingUsers: TypingUser[];
  isConnected: boolean;
  isLoading: boolean;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SendMessageRequest {
  roomId: string;
  content: string;
  type?: 'text' | 'image' | 'file';
  replyTo?: string;
}

export interface WebSocketMessage {
  type: 'message' | 'typing' | 'user_joined' | 'user_left' | 'bot_response';
  data: any;
  timestamp: Date;
}

// ✅ เพิ่ม Room alias สำหรับ backward compatibility
export type Room = ChatRoom;