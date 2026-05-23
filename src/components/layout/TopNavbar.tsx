'use client';

import { LogOut, Play } from 'lucide-react';
import Link from 'next/link';

export const TopNavbar = () => (
  <nav className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 lg:ml-64 z-20 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div className="lg:hidden w-16" /> {/* Spacing for mobile menu button */}
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      <div className="flex items-center gap-3 ml-auto">
        <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
          <Play className="h-4 w-4" />
          Watch Tutorial
        </button>

        <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
          Start New Call
        </button>

        <Link href="/signin" className="ml-2">
          <button title="Sign in" className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-400 transition-colors">
            U
          </button>
        </Link>
      </div>
    </div>
  </nav>
);

