import { FeedbackData } from '@/types';
import { STORAGE_KEYS } from '@/constants';

/**
 * Save feedback to localStorage
 */
export const saveFeedback = (feedback: string): void => {
  try {
    const data: FeedbackData = {
      feedback,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save feedback:', error);
  }
};

/**
 * Get feedback from localStorage
 */
export const getFeedback = (): FeedbackData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get feedback:', error);
    return null;
  }
};

/**
 * Clear feedback from localStorage
 */
export const clearFeedback = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK);
  } catch (error) {
    console.error('Failed to clear feedback:', error);
  }
};

/**
 * Check if feedback exists
 */
export const hasFeedback = (): boolean => {
  try {
    return !!localStorage.getItem(STORAGE_KEYS.FEEDBACK);
  } catch {
    return false;
  }
};
