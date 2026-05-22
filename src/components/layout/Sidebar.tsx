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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/5 text-white"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 z-40 lg:z-auto lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 px-6 py-8 border-b border-slate-800">
          <div className="h-10 w-10 rounded-lg bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="text-xl font-bold">Hintro</h1>
        </div>

        {/* User Profile Section */}
        <div className="px-6 py-6 border-b border-slate-800">
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-full bg-slate-800 animate-pulse" />
              <div className="h-4 w-24 bg-slate-800 animate-pulse rounded" />
              <div className="h-3 w-32 bg-slate-800 animate-pulse rounded" />
            </div>
          ) : profile ? (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{getInitials(profile.name)}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{profile.name}</p>
                <p className="text-xs text-slate-400 truncate">{profile.email}</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-6">
          <div className="space-y-1">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
              <Home className="h-5 w-5 text-slate-300" />
              <span className="text-sm">Dashboard</span>
            </Link>
            <Link href="/call-insights" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
              <Phone className="h-5 w-5 text-slate-300" />
              <span className="text-sm">Call Insights</span>
            </Link>
            <Link href="/knowledge-base" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
              <Book className="h-5 w-5 text-slate-300" />
              <span className="text-sm">Knowledge Base</span>
            </Link>
            <Link href="/prompts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
              <Command className="h-5 w-5 text-slate-300" />
              <span className="text-sm">Prompts</span>
            </Link>
            <Link href="/boxy-controls" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
              <span className="h-5 w-5 text-slate-300 inline-block rounded" />
              <span className="text-sm">Boxy Controls</span>
            </Link>
          </div>
        </nav>

        {/* Feedback Section */}
        <div className="px-6 py-6 border-t border-slate-800">
          <button
            onClick={onFeedbackClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white text-slate-900 font-medium hover:opacity-90 transition-opacity"
          >
            <MessageSquare className="h-5 w-5" />
            Send Feedback
          </button>
        </div>
      </aside>
    </>
  );
};
