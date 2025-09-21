'use client';

import { useState } from 'react';
import { Plus, Calendar, Activity } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { CycleOverview } from '@/components/CycleOverview';
import { CycleLogForm } from '@/components/CycleLogForm';
import { SymptomLogForm } from '@/components/SymptomLogForm';

export default function HomePage() {
  const [showCycleForm, setShowCycleForm] = useState(false);
  const [showSymptomForm, setShowSymptomForm] = useState(false);

  const handleCycleSaved = () => {
    setShowCycleForm(false);
    // Refresh data by re-rendering components
    window.location.reload();
  };

  const handleSymptomSaved = () => {
    setShowSymptomForm(false);
    // Refresh data by re-rendering components
    window.location.reload();
  };

  if (showCycleForm) {
    return (
      <AppShell currentPage="home">
        <CycleLogForm
          onSave={handleCycleSaved}
          onCancel={() => setShowCycleForm(false)}
        />
      </AppShell>
    );
  }

  if (showSymptomForm) {
    return (
      <AppShell currentPage="home">
        <SymptomLogForm
          onSave={handleSymptomSaved}
          onCancel={() => setShowSymptomForm(false)}
        />
      </AppShell>
    );
  }

  return (
    <AppShell currentPage="home">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to CycleZen
          </h1>
          <p className="text-gray-600">
            Your intuitive guide to menstrual wellness
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowCycleForm(true)}
            className="card hover:shadow-lg transition-shadow duration-200 text-center p-6"
          >
            <Calendar className="text-blue-600 mx-auto mb-2" size={24} />
            <h3 className="font-medium">Log Period</h3>
            <p className="text-sm text-gray-600 mt-1">Track your cycle</p>
          </button>

          <button
            onClick={() => setShowSymptomForm(true)}
            className="card hover:shadow-lg transition-shadow duration-200 text-center p-6"
          >
            <Activity className="text-green-600 mx-auto mb-2" size={24} />
            <h3 className="font-medium">Log Symptoms</h3>
            <p className="text-sm text-gray-600 mt-1">Track how you feel</p>
          </button>
        </div>

        {/* Cycle Overview */}
        <CycleOverview />

        {/* Quick Tips */}
        <div className="card">
          <h3 className="font-semibold mb-3">💡 Today's Tip</h3>
          <p className="text-sm text-gray-700">
            Regular tracking helps you understand your unique patterns and can improve 
            conversations with healthcare providers. Even logging just a few symptoms 
            can provide valuable insights over time.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
