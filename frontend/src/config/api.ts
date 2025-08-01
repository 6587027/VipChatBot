// ================================
// src/config/api.ts
// ================================
import { env } from './env';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH: '/api/v1/auth/refresh',
    PROFILE: '/api/v1/auth/profile',
  },
  
  // Chat
  CHAT: {
    ROOMS: '/api/v1/chat/rooms',
    MESSAGES: '/api/v1/chat/messages',
    SEND: '/api/v1/chat/send',
    HISTORY: '/api/v1/chat/history',
  },
  
  // AI
  AI: {
    CHAT: '/api/v1/ai/chat',
    MODELS: '/api/v1/ai/models',
    PERSONALITIES: '/api/v1/ai/personalities',
  },
  
  // User
  USER: {
    PROFILE: '/api/v1/user/profile',
    SETTINGS: '/api/v1/user/settings',
    AVATAR: '/api/v1/user/avatar',
  },
} as const;

export const API_CONFIG = {
  BASE_URL: env.API_URL,
  WS_URL: env.WS_URL,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
