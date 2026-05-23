'use client';

import { useState } from 'react';
import { Menu, X, MessageSquare, Home, Phone, Book, Command } from 'lucide-react';
import Link from 'next/link';
import { UserProfile } from '@/types';
import { getInitials } from '@/utils/formatting';

interface SidebarProps {
  profile: UserProfile | undefined;
  isLoading?: boolean;
  onFeedbackClick: () => void;
}

export const Sidebar = ({ profile, isLoading, onFeedbackClick }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-100 text-gray-900"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white text-gray-900 flex flex-col transition-transform duration-300 z-40 lg:z-auto lg:translate-x-0 border-r border-gray-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 px-6 py-8 border-b border-gray-200">
          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-gray-900 font-bold text-lg">H</span>
          </div>
          <h1 className="text-xl font-bold">Hintro</h1>
        </div>

        {/* User Profile Section */}
        <div className="px-6 py-6 border-b border-gray-200">
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
              <div className="h-3 w-32 bg-gray-200 animate-pulse rounded" />
            </div>
          ) : profile ? (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-semibold text-sm">{getInitials(profile.name)}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{profile.name}</p>
                <p className="text-xs text-gray-500 truncate">{profile.email}</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-6">
          <div className="space-y-1">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Home className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Dashboard</span>
            </Link>
            <Link href="/call-insights" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Phone className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Call Insights</span>
            </Link>
            <Link href="/knowledge-base" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Book className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Knowledge Base</span>
            </Link>
            <Link href="/prompts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Command className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Prompts</span>
            </Link>
            <Link href="/boxy-controls" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="h-5 w-5 text-gray-500 inline-block rounded" />
              <span className="text-sm">Boxy Controls</span>
            </Link>
          </div>
        </nav>

        {/* Feedback Section */}
        <div className="px-6 py-6 border-t border-gray-200">
          <button
            onClick={onFeedbackClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:opacity-90 transition-opacity"
          >
            <MessageSquare className="h-5 w-5" />
            Send Feedback
          </button>
        </div>
      </aside>
    </>
  );
};
