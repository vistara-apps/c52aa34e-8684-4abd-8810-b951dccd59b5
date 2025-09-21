'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { CycleCalendar } from '@/components/CycleCalendar';
import { CycleLogForm } from '@/components/CycleLogForm';
import { SymptomLogForm } from '@/components/SymptomLogForm';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCycleForm, setShowCycleForm] = useState(false);
  const [showSymptomForm, setShowSymptomForm] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCycleSaved = () => {
    setShowCycleForm(false);
    setSelectedDate(null);
    // Refresh calendar data
    window.location.reload();
  };

  const handleSymptomSaved = () => {
    setShowSymptomForm(false);
    setSelectedDate(null);
    // Refresh calendar data
    window.location.reload();
  };

  if (showCycleForm) {
    return (
      <AppShell>
        <CycleLogForm
          onSave={handleCycleSaved}
          onCancel={() => {
            setShowCycleForm(false);
            setSelectedDate(null);
          }}
          initialData={selectedDate ? { startDate: selectedDate } : undefined}
        />
      </AppShell>
    );
  }

  if (showSymptomForm) {
    return (
      <AppShell>
        <SymptomLogForm
          onSave={handleSymptomSaved}
          onCancel={() => {
            setShowSymptomForm(false);
            setSelectedDate(null);
          }}
          selectedDate={selectedDate || undefined}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Calendar</h1>
          <p className="text-sm text-gray-600">
            View your cycle history and log new entries
          </p>
        </div>

        <CycleCalendar
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate || undefined}
        />

        {selectedDate && (
          <div className="card">
            <h3 className="font-semibold mb-3">
              Selected: {selectedDate.toLocaleDateString()}
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCycleForm(true)}
                className="btn-primary flex-1"
              >
                Log Period
              </button>
              <button
                onClick={() => setShowSymptomForm(true)}
                className="btn-secondary flex-1"
              >
                Log Symptoms
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
