export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
}

export interface SubscriptionPlan {
  name: string;
  status: 'active' | 'inactive';
  expiresAt: string;
}

export interface DashboardData {
  subscriptionPlan: SubscriptionPlan;
  usage: {
    apiCalls: number;
    apiCallsLimit: number;
    storage: number;
    storageLimit: number;
  };
  notes: {
    total: number;
    recent: string[];
  };
  vocabTerms: {
    total: number;
  };
  knowledgeBase: {
    total: number;
    updated: string;
  };
}

export interface CallSessionStats {
  totalSessions: number;
  averageDuration: number;
  aiInteractions: number;
  lastSessionDate: string | null;
}

export interface CallSession {
  id: string;
  date: string;
  duration: number;
  participants: string[];
  notes: string;
  aiInteractions: number;
}

export interface APIError {
  message: string;
  status: number;
}

export interface FeedbackData {
  feedback: string;
  timestamp: string;
}
