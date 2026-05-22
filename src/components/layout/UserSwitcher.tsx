'use client';

import { useState } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { DEMO_USERS } from '@/constants';

export const UserSwitcher = () => {
  const { userId, switchUser, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const users = [
    { id: DEMO_USERS.EMPTY, name: 'John Doe (Empty)', description: 'New user' },
    { id: DEMO_USERS.POPULATED, name: 'Sarah Smith (Pro)', description: 'Active user' },
  ];

  const currentUser = users.find((u) => u.id === userId);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
        title="Switch user"
      >
        <Users className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-600">{currentUser?.name}</span>
        <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-600 uppercase">Demo Users</p>
            </div>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={async () => {
                  await switchUser(user.id);
                  setIsOpen(false);
                }}
                disabled={isLoading}
                className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 disabled:opacity-50 ${
                  userId === user.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${userId === user.id ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{user.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
