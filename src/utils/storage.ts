import { FeedbackData } from '@/types';
import { STORAGE_KEYS } from '@/constants';

/**
 * Save feedback to localStorage
 */
export const saveFeedback = (feedback: string): void => {
  try {
    if (typeof window === 'undefined') return;
    const data: FeedbackData = {
      feedback,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(data));
  } catch {
    return;
  }
};

/**
 * Get feedback from localStorage
 */
export const getFeedback = (): FeedbackData | null => {
  try {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

/**
 * Clear feedback from localStorage
 */
export const clearFeedback = (): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK);
  } catch {
    return;
  }
};

/**
 * Check if feedback exists
 */
export const hasFeedback = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(STORAGE_KEYS.FEEDBACK);
  } catch {
    return false;
  }
};
