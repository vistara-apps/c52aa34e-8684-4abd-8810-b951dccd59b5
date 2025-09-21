import { CycleLog, SymptomLog, User, UserSettings } from './types';

const STORAGE_KEYS = {
  USER: 'cyclezen_user',
  CYCLE_LOGS: 'cyclezen_cycle_logs',
  SYMPTOM_LOGS: 'cyclezen_symptom_logs',
} as const;

// User management
export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  if (!userData) return null;
  
  const user = JSON.parse(userData);
  return {
    ...user,
    createdAt: new Date(user.createdAt),
  };
}

export function saveUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function createUser(farcasterId?: string): User {
  const user: User = {
    userId: `user_${Date.now()}`,
    farcasterId,
    createdAt: new Date(),
    settings: {
      cycleLength: 28,
      periodLength: 5,
      notifications: true,
      theme: 'light',
    },
  };
  
  saveUser(user);
  return user;
}

// Cycle logs management
export function getCycleLogs(): CycleLog[] {
  if (typeof window === 'undefined') return [];
  
  const logsData = localStorage.getItem(STORAGE_KEYS.CYCLE_LOGS);
  if (!logsData) return [];
  
  const logs = JSON.parse(logsData);
  return logs.map((log: any) => ({
    ...log,
    startDate: new Date(log.startDate),
    endDate: log.endDate ? new Date(log.endDate) : undefined,
  }));
}

export function saveCycleLog(log: CycleLog): void {
  if (typeof window === 'undefined') return;
  
  const existingLogs = getCycleLogs();
  const updatedLogs = [...existingLogs.filter(l => l.logId !== log.logId), log];
  
  localStorage.setItem(STORAGE_KEYS.CYCLE_LOGS, JSON.stringify(updatedLogs));
}

export function deleteCycleLog(logId: string): void {
  if (typeof window === 'undefined') return;
  
  const existingLogs = getCycleLogs();
  const updatedLogs = existingLogs.filter(log => log.logId !== logId);
  
  localStorage.setItem(STORAGE_KEYS.CYCLE_LOGS, JSON.stringify(updatedLogs));
}

// Symptom logs management
export function getSymptomLogs(): SymptomLog[] {
  if (typeof window === 'undefined') return [];
  
  const logsData = localStorage.getItem(STORAGE_KEYS.SYMPTOM_LOGS);
  if (!logsData) return [];
  
  const logs = JSON.parse(logsData);
  return logs.map((log: any) => ({
    ...log,
    date: new Date(log.date),
  }));
}

export function saveSymptomLog(log: SymptomLog): void {
  if (typeof window === 'undefined') return;
  
  const existingLogs = getSymptomLogs();
  const updatedLogs = [...existingLogs.filter(l => l.symptomLogId !== log.symptomLogId), log];
  
  localStorage.setItem(STORAGE_KEYS.SYMPTOM_LOGS, JSON.stringify(updatedLogs));
}

export function deleteSymptomLog(logId: string): void {
  if (typeof window === 'undefined') return;
  
  const existingLogs = getSymptomLogs();
  const updatedLogs = existingLogs.filter(log => log.symptomLogId !== logId);
  
  localStorage.setItem(STORAGE_KEYS.SYMPTOM_LOGS, JSON.stringify(updatedLogs));
}

// Clear all data
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
