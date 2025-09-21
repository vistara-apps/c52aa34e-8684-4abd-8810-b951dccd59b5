export interface User {
  userId: string;
  farcasterId?: string;
  createdAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  cycleLength: number;
  periodLength: number;
  notifications: boolean;
  theme: 'light' | 'dark';
}

export interface CycleLog {
  logId: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  flowIntensity: 'light' | 'medium' | 'heavy';
  notes?: string;
}

export interface SymptomLog {
  symptomLogId: string;
  userId: string;
  date: Date;
  painLevel: number; // 1-10 scale
  energyLevel: number; // 1-10 scale
  mood: 'happy' | 'sad' | 'anxious' | 'irritable' | 'calm' | 'energetic' | 'tired';
  otherSymptoms: string[];
  notes?: string;
}

export interface CyclePhase {
  phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  day: number;
  description: string;
}

export interface HealthInsight {
  id: string;
  type: 'pattern' | 'correlation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  isPremium: boolean;
}
