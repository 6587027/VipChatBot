// utils/constants.ts

// API Endpoints
export const API_ENDPOINTS = {
  CHAT: '/api/v1/chat',
  ROOMS: '/api/v1/rooms',
  MESSAGES: '/api/v1/messages',
  AI: '/api/v1/ai',
  AUTH: '/api/v1/auth',
  WEBSOCKET: '/ws'
} as const;

// WebSocket Events
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE_SENT: 'message_sent',
  MESSAGE_RECEIVED: 'message_received',
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  USER_JOINED: 'user_joined',
  USER_LEFT: 'user_left',
  BOT_RESPONSE: 'bot_response'
} as const;

// UI Constants
export const UI_CONFIG = {
  MAX_MESSAGE_LENGTH: 2000,
  TYPING_TIMEOUT: 3000,
  AUTO_SCROLL_THRESHOLD: 100,
  PAGINATION_SIZE: 50,
  UPLOAD_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FILE_TYPES: ['image/*', '.pdf', '.doc', '.docx', '.txt']
} as const;

// Color Theme (Blue Ocean)
export const COLORS = {
  PRIMARY: '#2563EB',
  PRIMARY_LIGHT: '#3B82F6', 
  PRIMARY_DARK: '#1D4ED8',
  SECONDARY: '#06B6D4',
  ACCENT: '#0EA5E9',
  
  // Message Colors
  USER_MESSAGE: 'linear-gradient(135deg, #3B82F6, #2563EB)',
  BOT_MESSAGE: '#F8FAFC',
  SYSTEM_MESSAGE: '#EFF6FF',
  
  // Status Colors
  SUCCESS: '#16A34A',
  WARNING: '#D97706', 
  ERROR: '#DC2626',
  INFO: '#2563EB',
  
  // Neutral Colors
  WHITE: '#FFFFFF',
  GRAY_50: '#F8FAFC',
  GRAY_100: '#F1F5F9',
  GRAY_200: '#E2E8F0',
  GRAY_500: '#64748B',
  GRAY_900: '#0F172A'
} as const;

// Animation Durations
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
  TYPING_DOTS: 1400
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440
} as const;

// Default Values
export const DEFAULTS = {
  AVATAR: '/assets/icons/default-avatar.png',
  ROOM_AVATAR: '/assets/icons/default-room.png',
  BOT_AVATAR: '/assets/icons/bot-avatar.png',
  PAGE_TITLE: 'VipChatBot - Modern AI Chat Assistant',
  ROOM_NAME: 'General Chat'
} as const;

// Bot Personalities
export const BOT_PERSONALITIES = {
  FRIENDLY: {
    name: 'Friendly Assistant',
    prompt: 'You are a helpful and friendly AI assistant. Be warm and supportive.',
    avatar: '/assets/icons/friendly-bot.png'
  },
  PROFESSIONAL: {
    name: 'Professional Helper', 
    prompt: 'You are a professional AI assistant. Be formal and efficient.',
    avatar: '/assets/icons/professional-bot.png'
  },
  CREATIVE: {
    name: 'Creative Writer',
    prompt: 'You are a creative AI assistant. Be imaginative and inspiring.',
    avatar: '/assets/icons/creative-bot.png'
  },
  TECHNICAL: {
    name: 'Technical Expert',
    prompt: 'You are a technical AI assistant. Focus on programming and tech topics.',
    avatar: '/assets/icons/tech-bot.png'
  }
} as const;