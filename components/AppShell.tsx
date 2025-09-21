'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Calendar, BarChart3, Settings } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', href: '/', icon: Heart, label: 'Home' },
    { id: 'calendar', href: '/calendar', icon: Calendar, label: 'Calendar' },
    { id: 'insights', href: '/insights', icon: BarChart3, label: 'Insights' },
    { id: 'settings', href: '/settings', icon: Settings, label: 'Settings' },
  ];

  const getCurrentPage = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/calendar') return 'calendar';
    if (pathname === '/insights') return 'insights';
    if (pathname === '/settings') return 'settings';
    return 'home';
  };

  const currentPage = getCurrentPage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border px-4 py-3">
        <div className="max-w-xl mx-auto">
          <h1 className="text-xl font-bold text-foreground">CycleZen</h1>
          <p className="text-sm text-gray-600">Your wellness companion</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-6 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex flex-col items-center py-2 px-3 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-foreground hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
