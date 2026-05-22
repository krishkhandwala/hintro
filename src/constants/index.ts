export const API_BASE_URL = 'http://localhost:4000';

export const API_ENDPOINTS = {
  PROFILE: '/api/auth/profile',
  DASHBOARD: '/api/auth/dashboard',
  CALL_STATS: '/api/call-sessions/stats',
  CALL_SESSIONS: '/api/call-sessions',
};

export const QUERY_KEYS = {
  PROFILE: ['profile'],
  DASHBOARD: ['dashboard'],
  CALL_STATS: ['callStats'],
  CALL_SESSIONS: ['callSessions'],
};

export const THEME_COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  muted: '#6b7280',
  accent: '#f59e0b',
  border: '#e5e7eb',
  success: '#10b981',
  warning: '#f59e0b',
  destructive: '#ef4444',
};

export const BREAKPOINTS = {
  mobile: 390,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
};

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const STORAGE_KEYS = {
  FEEDBACK: 'hintro_sidebar_feedback',
  THEME: 'hintro_theme',
};

export const DEMO_USERS = {
  EMPTY: 'u1',
  POPULATED: 'u2',
};
