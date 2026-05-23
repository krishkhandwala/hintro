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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gray-900 mb-4">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hintro</h1>
          <p className="text-gray-600">Demo Account Selection</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => signIn('u1')}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div>John Doe</div>
            <div className="text-xs text-gray-600 font-normal mt-1">New User • Empty State</div>
          </button>
          <button
            onClick={() => signIn('u2')}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div>Sarah Smith</div>
            <div className="text-xs text-gray-300 font-normal mt-1">Active User • Pro Plan</div>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          This is a demo app with two test users. Select one to continue.
        </p>
      </div>
    </div>
  );
}
