'use client';

import { useState } from 'react';
import { Calendar, Droplets } from 'lucide-react';
import { CycleLog } from '@/lib/types';
import { saveCycleLog } from '@/lib/storage';

interface CycleLogFormProps {
  onSave?: (log: CycleLog) => void;
  onCancel?: () => void;
  initialData?: Partial<CycleLog>;
}

export function CycleLogForm({ onSave, onCancel, initialData }: CycleLogFormProps) {
  const [startDate, setStartDate] = useState(
    initialData?.startDate ? initialData.startDate.toISOString().split('T')[0] : ''
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate ? initialData.endDate.toISOString().split('T')[0] : ''
  );
  const [flowIntensity, setFlowIntensity] = useState<'light' | 'medium' | 'heavy'>(
    initialData?.flowIntensity || 'medium'
  );
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) return;

    setIsSubmitting(true);

    try {
      const cycleLog: CycleLog = {
        logId: initialData?.logId || `cycle_${Date.now()}`,
        userId: 'current_user', // In a real app, this would come from auth
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : undefined,
        flowIntensity,
        notes: notes.trim() || undefined,
      };

      saveCycleLog(cycleLog);
      onSave?.(cycleLog);
    } catch (error) {
      console.error('Error saving cycle log:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const flowOptions = [
    { value: 'light', label: 'Light', icon: '💧' },
    { value: 'medium', label: 'Medium', icon: '💧💧' },
    { value: 'heavy', label: 'Heavy', icon: '💧💧💧' },
  ] as const;

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-primary" size={20} />
        <h2 className="text-lg font-semibold">Log Your Cycle</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-foreground mb-1">
            Period Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-foreground mb-1">
            Period End Date (optional)
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input"
            min={startDate}
          />
        </div>

        {/* Flow Intensity */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Flow Intensity
          </label>
          <div className="grid grid-cols-3 gap-2">
            {flowOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFlowIntensity(option.value)}
                className={`p-3 rounded-md border text-center transition-colors duration-200 ${
                  flowIntensity === option.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-gray-50'
                }`}
              >
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes about your cycle..."
            className="input min-h-[80px] resize-none"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !startDate}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Cycle'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
