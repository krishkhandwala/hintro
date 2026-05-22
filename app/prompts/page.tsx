'use client';

import { Sidebar, TopNavbar } from '@/components/layout';
import { useProfile } from '@/hooks/useProfile';

export default function PromptsPage() {
  const profileQuery = useProfile();

  return (
    <>
      <Sidebar
        profile={profileQuery.data}
        isLoading={profileQuery.isLoading}
        onFeedbackClick={() => {}}
      />
      <TopNavbar />
      <div className="lg:ml-64 p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Prompts</h1>
        <p className="text-sm text-gray-600">This section will list saved prompts.</p>
      </div>
    </>
  );
}
