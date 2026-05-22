'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

export default function SignInPage() {
  const router = useRouter();
  const { switchUser, isLoading } = useUser();

  const signIn = async (id: string) => {
    await switchUser(id);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Sign in to Hintro (Demo)</h2>
        <p className="text-sm text-gray-600 mb-6">Choose a demo user to sign in as:</p>
        <div className="space-y-3">
          <button
            onClick={() => signIn('u1')}
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-md border text-sm"
          >
            Sign in as John Doe (Empty)
          </button>
          <button
            onClick={() => signIn('u2')}
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-md bg-black text-white text-sm"
          >
            Sign in as Sarah Smith (Pro)
          </button>
        </div>
      </div>
    </div>
  );
}
