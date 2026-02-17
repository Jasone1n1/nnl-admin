'use client';

import { useState } from 'react';
import { cn } from '@/utils/utils';
import { Sidebar } from './sidebar';

export interface AppShellProps {
  user: { username: string; role: 'admin' | 'editor' | 'viewer'; isActive: boolean };
  children: React.ReactNode;
}

export function AppShell({ user, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50" style={{ ['--sidebar-width' as string]: '16rem' }}>
      {/* Desktop sidebar - hidden on mobile */}
      <Sidebar
        user={user}
        variant="desktop"
        onNavigate={() => {}}
        className="hidden lg:flex"
      />
      {/* Mobile overlay when drawer is open */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setSidebarOpen(false)}
        className={cn(
          'fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden',
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      {/* Mobile drawer sidebar */}
      <Sidebar
        user={user}
        variant="mobile"
        open={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex lg:hidden',
          'transition-transform duration-300 ease-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      />
      {/* Main content */}
      <main
        id="main-content"
        className={cn(
          'flex-1 min-h-screen transition-all duration-200',
          'lg:pl-[var(--sidebar-width)]'
        )}
        role="main"
      >
        {/* Top bar for mobile */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center justify-center size-10 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 min-w-0" />
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
