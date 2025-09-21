'use client';

import { ReactNode } from 'react';
import { Heart, Calendar, BarChart3, Settings } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  currentPage?: 'home' | 'calendar' | 'insights' | 'settings';
}

export function AppShell({ children, currentPage = 'home' }: AppShellProps) {
  const navItems = [
    { id: 'home', icon: Heart, label: 'Home' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'insights', icon: BarChart3, label: 'Insights' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">CycleZen</h1>
          <p className="text-sm text-gray-600">Your wellness companion</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-6 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  className={`flex flex-col items-center py-2 px-3 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
