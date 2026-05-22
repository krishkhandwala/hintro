'use client';

import { Sidebar, TopNavbar } from '@/components/layout';
import { useProfile } from '@/hooks/useProfile';

export default function KnowledgeBasePage() {
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
        <h1 className="text-2xl font-bold mb-4">Knowledge Base</h1>
        <p className="text-sm text-gray-600">This section will display knowledge base articles.</p>
      </div>
    </>
  );
}
