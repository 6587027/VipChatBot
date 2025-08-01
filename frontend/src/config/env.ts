// ================================
// src/config/env.ts
// ================================
interface EnvConfig {
  API_URL: string;
  WS_URL: string;
  GEMINI_API_KEY: string;
  AI_MODEL: string;
  AI_TEMPERATURE: number;
  APP_NAME: string;
  APP_VERSION: string;
  ENVIRONMENT: string;
  COMPANY_NAME: string;
  ENABLE_VOICE: boolean;
  ENABLE_ANALYTICS: boolean;
  ENABLE_THEMES: boolean;
  MAX_FILE_SIZE: number;
  PRIMARY_COLOR: string;
  SECONDARY_COLOR: string;
  BRAND_NAME: string;
}

export const env: EnvConfig = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:8000',
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  AI_MODEL: import.meta.env.VITE_AI_MODEL || 'gemini-pro',
  AI_TEMPERATURE: Number(import.meta.env.VITE_AI_TEMPERATURE) || 0.7,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Zenith Comp AI Assistant',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'Zenith Comp',
  ENABLE_VOICE: import.meta.env.VITE_ENABLE_VOICE === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_THEMES: import.meta.env.VITE_ENABLE_THEMES === 'true',
  MAX_FILE_SIZE: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760, // 10MB
  PRIMARY_COLOR: import.meta.env.VITE_PRIMARY_COLOR || '#15206c',
  SECONDARY_COLOR: import.meta.env.VITE_SECONDARY_COLOR || '#EB7C24',
  BRAND_NAME: import.meta.env.VITE_BRAND_NAME || 'Zenith Comp',
};

export const isDevelopment = env.ENVIRONMENT === 'development';
export const isProduction = env.ENVIRONMENT === 'production';