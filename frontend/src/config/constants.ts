// ================================
// src/config/constants.ts
// ================================
export const APP_CONSTANTS = {
  // App Info
  APP_NAME: 'Zenith Comp AI Assistant',
  COMPANY_NAME: 'Zenith Comp',
  BRAND_TAGLINE: 'Reaching the Peak of Innovation',
  
  // Chat Limits
  MAX_MESSAGE_LENGTH: 2000,
  MAX_MESSAGES_HISTORY: 100,
  TYPING_INDICATOR_DELAY: 500,
  
  // File Upload
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/png', 
    'image/gif',
    'text/plain',
    'application/pdf',
  ],
  
  // AI Config
  AI_PERSONALITIES: {
    FRIENDLY: 'friendly_assistant',
    PROFESSIONAL: 'professional_helper',
    CREATIVE: 'creative_writer',
    TECHNICAL: 'technical_expert',
  },
  
  // WebSocket Events
  WS_EVENTS: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    MESSAGE: 'message',
    TYPING: 'typing',
    STOP_TYPING: 'stop_typing',
    USER_JOINED: 'user_joined',
    USER_LEFT: 'user_left',
  },
  
  // Local Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'zenith_auth_token',
    USER_PREFERENCES: 'zenith_user_prefs',
    CHAT_HISTORY: 'zenith_chat_history',
    THEME: 'zenith_theme',
  },
  
  // Error Messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
    AUTH_FAILED: 'Authentication failed. Please login again.',
    MESSAGE_FAILED: 'Failed to send message. Please try again.',
    FILE_TOO_LARGE: 'File size exceeds the maximum limit of 10MB.',
    INVALID_FILE_TYPE: 'File type not supported.',
  },
} as const;