import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants';
import { UserProfile, DashboardData, CallSessionStats, CallSession, APIError } from '@/types';

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

  async getProfile(): Promise<UserProfile> {
    const response = await this.client.get<UserProfile>(API_ENDPOINTS.PROFILE);
    return response.data;
  }

  async getDashboard(): Promise<DashboardData> {
    const response = await this.client.get<DashboardData>(API_ENDPOINTS.DASHBOARD);
    return response.data;
  }

  async getCallStats(): Promise<CallSessionStats> {
    const response = await this.client.get<CallSessionStats>(API_ENDPOINTS.CALL_STATS);
    return response.data;
  }

  async getCallSessions(limit: number = 10): Promise<CallSession[]> {
    const response = await this.client.get<CallSession[]>(API_ENDPOINTS.CALL_SESSIONS, {
      params: { limit },
    });
    return response.data;
  }
}

export const apiClient = new APIClient();
