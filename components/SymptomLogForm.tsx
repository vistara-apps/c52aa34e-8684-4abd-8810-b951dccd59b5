'use client';

import { useState } from 'react';
import { Heart, Zap } from 'lucide-react';
import { SymptomLog } from '@/lib/types';
import { saveSymptomLog } from '@/lib/storage';

interface SymptomLogFormProps {
  onSave?: (log: SymptomLog) => void;
  onCancel?: () => void;
  selectedDate?: Date;
  initialData?: Partial<SymptomLog>;
}

export function SymptomLogForm({ onSave, onCancel, selectedDate, initialData }: SymptomLogFormProps) {
  const [date, setDate] = useState(
    selectedDate?.toISOString().split('T')[0] || 
    initialData?.date?.toISOString().split('T')[0] || 
    new Date().toISOString().split('T')[0]
  );
  const [painLevel, setPainLevel] = useState(initialData?.painLevel || 1);
  const [energyLevel, setEnergyLevel] = useState(initialData?.energyLevel || 5);
  const [mood, setMood] = useState<SymptomLog['mood']>(initialData?.mood || 'calm');
  const [otherSymptoms, setOtherSymptoms] = useState<string[]>(initialData?.otherSymptoms || []);
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const symptomLog: SymptomLog = {
        symptomLogId: initialData?.symptomLogId || `symptom_${Date.now()}`,
        userId: 'current_user', // In a real app, this would come from auth
        date: new Date(date),
        painLevel,
        energyLevel,
        mood,
        otherSymptoms,
        notes: notes.trim() || undefined,
      };

      saveSymptomLog(symptomLog);
      onSave?.(symptomLog);
    } catch (error) {
      console.error('Error saving symptom log:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const moodOptions = [
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'energetic', label: 'Energetic', emoji: '⚡' },
    { value: 'tired', label: 'Tired', emoji: '😴' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'irritable', label: 'Irritable', emoji: '😤' },
    { value: 'sad', label: 'Sad', emoji: '😢' },
  ] as const;

  const commonSymptoms = [
    'Headache', 'Bloating', 'Cramps', 'Breast tenderness', 
    'Acne', 'Food cravings', 'Nausea', 'Back pain'
  ];

  const toggleSymptom = (symptom: string) => {
    setOtherSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="text-primary" size={20} />
        <h2 className="text-lg font-semibold">Log Symptoms & Mood</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
            required
          />
        </div>

        {/* Pain Level */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Pain Level: {painLevel}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>No pain</span>
            <span>Severe</span>
          </div>
        </div>

        {/* Energy Level */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Energy Level: {energyLevel}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Exhausted</span>
            <span>Energetic</span>
          </div>
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Mood
          </label>
          <div className="grid grid-cols-2 gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setMood(option.value)}
                className={`p-3 rounded-md border text-center transition-colors duration-200 ${
                  mood === option.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-gray-50'
                }`}
              >
                <div className="text-lg mb-1">{option.emoji}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Other Symptoms */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Other Symptoms
          </label>
          <div className="grid grid-cols-2 gap-2">
            {commonSymptoms.map((symptom) => (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className={`p-2 rounded-md border text-sm transition-colors duration-200 ${
                  otherSymptoms.includes(symptom)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-gray-50'
                }`}
              >
                {symptom}
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
            placeholder="Any additional notes about how you're feeling..."
            className="input min-h-[80px] resize-none"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Symptoms'}
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
