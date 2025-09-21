'use client';

import { useState, useEffect } from 'react';
import { User, Bell, Download, Trash2, Shield } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { getUser, createUser, saveUser, clearAllData } from '@/lib/storage';
import { User as UserType } from '@/lib/types';

export default function SettingsPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    let currentUser = getUser();
    if (!currentUser) {
      currentUser = createUser();
    }
    setUser(currentUser);
  }, []);

  const handleSettingChange = (key: keyof UserType['settings'], value: any) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      settings: {
        ...user.settings,
        [key]: value
      }
    };
    
    setUser(updatedUser);
    saveUser(updatedUser);
  };

  const handleClearAllData = () => {
    clearAllData();
    setShowClearConfirm(false);
    // Create a new user
    const newUser = createUser();
    setUser(newUser);
  };

  if (!user) {
    return (
      <AppShell currentPage="settings">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell currentPage="settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-sm text-gray-600">
            Customize your CycleZen experience
          </p>
        </div>

        {/* Profile Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <User className="text-primary" size={20} />
            <h2 className="font-semibold">Profile</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                User ID
              </label>
              <input
                type="text"
                value={user.userId}
                disabled
                className="input bg-gray-50 text-gray-500"
              />
            </div>
            
            {user.farcasterId && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Farcaster ID
                </label>
                <input
                  type="text"
                  value={user.farcasterId}
                  disabled
                  className="input bg-gray-50 text-gray-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Cycle Settings */}
        <div className="card">
          <h2 className="font-semibold mb-4">Cycle Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Average Cycle Length (days)
              </label>
              <input
                type="number"
                min="21"
                max="35"
                value={user.settings.cycleLength}
                onChange={(e) => handleSettingChange('cycleLength', Number(e.target.value))}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Average Period Length (days)
              </label>
              <input
                type="number"
                min="3"
                max="8"
                value={user.settings.periodLength}
                onChange={(e) => handleSettingChange('periodLength', Number(e.target.value))}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-primary" size={20} />
            <h2 className="font-semibold">Notifications</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Notifications</p>
              <p className="text-sm text-gray-600">Get reminders to log symptoms and cycle updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        {/* Data Management */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-primary" size={20} />
            <h2 className="font-semibold">Data Management</h2>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Your health data is stored securely on your device. You can export or clear your data at any time.
            </p>
            
            <div className="flex gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <Download size={16} />
                Export Data
              </button>
              
              <button
                onClick={() => setShowClearConfirm(true)}
                className="btn-secondary flex items-center gap-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Clear All Data
              </button>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="card">
          <h2 className="font-semibold mb-4">About CycleZen</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Version 1.0.0</p>
            <p>Built with ❤️ for menstrual wellness</p>
            <p>© 2024 CycleZen. All rights reserved.</p>
          </div>
        </div>

        {/* Clear Data Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-lg p-6 max-w-md w-full">
              <h3 className="font-bold text-lg mb-4 text-red-600">Clear All Data?</h3>
              <p className="text-sm text-gray-600 mb-6">
                This action cannot be undone. All your cycle logs, symptom data, and settings will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAllData}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 flex-1"
                >
                  Clear All Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
