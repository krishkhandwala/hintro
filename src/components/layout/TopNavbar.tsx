'use client';

import { LogOut } from 'lucide-react';

export const TopNavbar = () => (
  <nav className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 lg:ml-64 z-20">
    <div className="flex items-center justify-between gap-4">
      <div className="lg:hidden w-16" /> {/* Spacing for mobile menu button */}
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      <div className="flex items-center gap-2 ml-auto">
        <button
          title="Sign out"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  </nav>
);
