'use client';

import { useState } from 'react';
import { BarChart3, Loader } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
} from '@/components/ui';
import { saveFeedback, getFeedback } from '@/utils/storage';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FeedbackModal = ({ open, onOpenChange }: FeedbackModalProps) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const existingFeedback = getFeedback();

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      saveFeedback(feedback);
      setIsSuccess(true);
      setTimeout(() => {
        setFeedback('');
        setIsSuccess(false);
        onOpenChange(false);
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Send us Feedback
          </DialogTitle>
          <DialogDescription>
            Help us improve Hintro by sharing your thoughts and suggestions.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Thank you!</h3>
            <p className="mt-2 text-sm text-gray-600">
              We've received your feedback and will review it shortly.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {existingFeedback && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
                <p className="text-sm text-blue-900">
                  <strong>Previous feedback:</strong> {existingFeedback.feedback}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Submitted on {new Date(existingFeedback.timestamp).toLocaleDateString()}
                </p>
              </div>
            )}

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!feedback.trim() || isSubmitting}
                isLoading={isSubmitting}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
