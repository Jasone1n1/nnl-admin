'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils/utils';
import {
  ClipboardList,
  FileDown,
  UserPlus,
  UserCircle,
  LayoutDashboard,
  LogOut,
  X,
} from 'lucide-react';
import React from 'react';

export type SidebarUser = {
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
};

const menuItems: Record<
  SidebarUser['role'],
  { href: string; label: string; icon: React.ReactNode }[]
> = {
  admin: [
    { href: '/admin/protected/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="size-5 shrink-0" /> },
    { href: '/admin/protected/applications', label: 'Applications', icon: <ClipboardList className="size-5 shrink-0" /> },
    { href: '/admin/protected/export', label: 'Export', icon: <FileDown className="size-5 shrink-0" /> },
    { href: '/admin/protected/create-user', label: 'Create User', icon: <UserPlus className="size-5 shrink-0" /> },
    { href: '/admin/protected/profile', label: 'Profile', icon: <UserCircle className="size-5 shrink-0" /> },
  ],
  viewer: [
    { href: '/admin/protected/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="size-5 shrink-0" /> },
    { href: '/admin/protected/applications', label: 'Applications', icon: <ClipboardList className="size-5 shrink-0" /> },
    { href: '/admin/protected/profile', label: 'Profile', icon: <UserCircle className="size-5 shrink-0" /> },
  ],
  editor: [
    { href: '/admin/protected/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="size-5 shrink-0" /> },
    { href: '/admin/protected/applications', label: 'Applications', icon: <ClipboardList className="size-5 shrink-0" /> },
    { href: '/admin/protected/profile', label: 'Profile', icon: <UserCircle className="size-5 shrink-0" /> },
  ],
};

const avatarColors = [
  'bg-emerald-500',
  'bg-sky-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-rose-500',
];

function getAvatarColor(name?: string) {
  if (!name || name.length === 0) return 'bg-slate-400';
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export interface SidebarProps {
  user: SidebarUser;
  variant: 'desktop' | 'mobile';
  open?: boolean;
  onNavigate?: () => void;
  className?: string;
}

export function Sidebar({ user, variant, onNavigate, className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const initials = user?.username?.charAt(0)?.toUpperCase() ?? 'U';
  const color = getAvatarColor(user?.username);
  const items = menuItems[user.role] ?? [];

  const handleNav = (href: string) => {
    router.push(href);
    onNavigate?.();
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    onNavigate?.();
    router.push('/admin/login');
  };

  const isMobile = variant === 'mobile';
  const widthClass = isMobile ? 'w-72' : 'w-64';

  return (
    <aside
      className={cn(
        'flex flex-col bg-white border-r border-slate-200/80 shadow-sm',
        !isMobile && 'fixed inset-y-0 left-0',
        widthClass,
        isMobile && 'shadow-xl',
        className
      )}
    >
      {/* Mobile: close button */}
      {isMobile && (
        <div className="flex h-14 items-center justify-between border-b border-slate-200/80 px-4">
          <span className="text-sm font-medium text-slate-700">Menu</span>
          <button
            type="button"
            onClick={onNavigate}
            className="flex size-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
      )}

      {/* Avatar */}
      <div className={cn('flex items-center gap-3', isMobile ? 'p-4' : 'p-5')}>
        <div className="relative shrink-0">
          <div
            className={cn(
              'flex items-center justify-center rounded-full text-white font-semibold transition-transform duration-200',
              color,
              isMobile ? 'size-12 text-lg' : 'size-10 text-sm'
            )}
          >
            {initials}
          </div>
          <span
            className={cn(
              'absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white',
              user?.isActive === false ? 'bg-red-500' : 'bg-emerald-500'
            )}
            aria-hidden
          />
        </div>
        {isMobile && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">{user.username}</p>
            <p className="truncate text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4 sm:px-3" aria-label="Main navigation">
        {items.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              type="button"
              onClick={() => handleNav(href)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={cn('flex items-center justify-center', isActive && 'text-emerald-600')}>
                {icon}
              </span>
              <span>{label}</span>
            </button>
          );
        })}

        <div className="my-2 border-t border-slate-200/80" />

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <LogOut className="size-5 shrink-0" />
          <span>Log out</span>
        </button>
      </nav>
    </aside>
  );
}
