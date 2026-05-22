import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants';
import { UserProfile, DashboardData, CallSessionStats, CallSession, APIError } from '@/types';

interface APIProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface APIDashboard {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  subscription: {
    plan: string;
    billing_cycle: string;
    status: string;
  } | null;
  usage: {
    kb_files: { used: number; limit: number; percentage: number };
    vocab_terms: number;
    notes: number;
  };
}

interface APICallStats {
  totalSessions: number;
  averageDuration: number;
  totalAIInteractions: number;
  lastSession: string[];
}

interface APICallSession {
  _id: string;
  user_id: string;
  status: string;
  client: string;
  description: string;
  started_at: string;
  ended_at: string;
  total_duration_seconds: number;
  language: string[];
  ai_interactions: number;
  participants: { name: string; isUser: boolean }[];
  createdAt: string;
  updatedAt: string;
}

interface APICallSessionsResponse {
  callSessions: APICallSession[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

class APIClient {
  private client: AxiosInstance;
  private userId: string = 'u2';

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add user ID header to all requests
    this.client.interceptors.request.use((config) => {
      config.headers['x-user-id'] = this.userId;
      return config;
    });

    // Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError: APIError = {
          message: error.message || 'An error occurred',
          status: error.response?.status || 500,
        };
        return Promise.reject(apiError);
      }
    );
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  private transformProfile(profile: APIProfile): UserProfile {
    const name = `${profile.firstName} ${profile.lastName}`;
    const initials = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
    return {
      id: profile.id,
      name,
      email: profile.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      initials,
    };
  }

  private transformDashboard(data: APIDashboard): DashboardData {
    return {
      subscriptionPlan: data.subscription
        ? {
            name: data.subscription.plan.charAt(0).toUpperCase() + data.subscription.plan.slice(1),
            status: data.subscription.status === 'active' ? 'active' : 'inactive',
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          }
        : { name: 'Free', status: 'active', expiresAt: new Date('2099-12-31').toISOString() },
      usage: {
        apiCalls: data.usage.kb_files.used,
        apiCallsLimit: data.usage.kb_files.limit,
        storage: 0,
        storageLimit: 1000,
      },
      notes: {
        total: data.usage.notes,
        recent: [],
      },
      vocabTerms: {
        total: data.usage.vocab_terms,
      },
      knowledgeBase: {
        total: data.usage.kb_files.used,
        updated: new Date().toISOString(),
      },
    };
  }

  private transformCallStats(stats: APICallStats): CallSessionStats {
    return {
      totalSessions: stats.totalSessions,
      averageDuration: stats.averageDuration,
      aiInteractions: stats.totalAIInteractions,
      lastSessionDate: stats.lastSession[0] || null,
    };
  }

  private transformCallSession(session: APICallSession): CallSession {
    const startDate = new Date(session.started_at);
    const endDate = new Date(session.ended_at);
    const durationSeconds = (endDate.getTime() - startDate.getTime()) / 1000;

    return {
      id: session._id,
      date: session.started_at,
      duration: session.total_duration_seconds,
      participants: session.participants.map((p) => p.name),
      notes: session.description,
      aiInteractions: session.ai_interactions,
    };
  }

  async getProfile(): Promise<UserProfile> {
    const response = await this.client.get<APIProfile>(API_ENDPOINTS.PROFILE);
    return this.transformProfile(response.data);
  }

  async getDashboard(): Promise<DashboardData> {
    const response = await this.client.get<APIDashboard>(API_ENDPOINTS.DASHBOARD);
    return this.transformDashboard(response.data);
  }

  async getCallStats(): Promise<CallSessionStats> {
    const response = await this.client.get<APICallStats>(API_ENDPOINTS.CALL_STATS);
    return this.transformCallStats(response.data);
  }

  async getCallSessions(limit: number = 10): Promise<CallSession[]> {
    const response = await this.client.get<APICallSessionsResponse>(API_ENDPOINTS.CALL_SESSIONS, {
      params: { limit },
    });
    return response.data.callSessions.map((session) => this.transformCallSession(session));
  }
}

export const apiClient = new APIClient();
