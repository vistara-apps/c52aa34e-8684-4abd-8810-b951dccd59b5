import { format, differenceInDays, addDays, startOfDay } from 'date-fns';
import { CycleLog, SymptomLog, CyclePhase, HealthInsight } from './types';

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy');
}

export function calculateCycleDay(lastPeriodStart: Date, currentDate: Date = new Date()): number {
  const daysSince = differenceInDays(startOfDay(currentDate), startOfDay(lastPeriodStart));
  return daysSince + 1;
}

export function predictNextPeriod(cycleLogs: CycleLog[], averageCycleLength: number = 28): Date {
  if (cycleLogs.length === 0) {
    return addDays(new Date(), averageCycleLength);
  }

  const lastCycle = cycleLogs[cycleLogs.length - 1];
  return addDays(lastCycle.startDate, averageCycleLength);
}

export function getCurrentCyclePhase(cycleDay: number): CyclePhase {
  if (cycleDay <= 5) {
    return {
      phase: 'menstrual',
      day: cycleDay,
      description: 'Menstrual phase - Your period is here'
    };
  } else if (cycleDay <= 13) {
    return {
      phase: 'follicular',
      day: cycleDay,
      description: 'Follicular phase - Energy is building'
    };
  } else if (cycleDay <= 16) {
    return {
      phase: 'ovulation',
      day: cycleDay,
      description: 'Ovulation phase - Peak fertility window'
    };
  } else {
    return {
      phase: 'luteal',
      day: cycleDay,
      description: 'Luteal phase - Preparing for next cycle'
    };
  }
}

export function analyzeSymptomPatterns(symptomLogs: SymptomLog[]): HealthInsight[] {
  const insights: HealthInsight[] = [];

  if (symptomLogs.length < 7) {
    return insights;
  }

  // Analyze pain patterns
  const avgPain = symptomLogs.reduce((sum, log) => sum + log.painLevel, 0) / symptomLogs.length;
  if (avgPain > 6) {
    insights.push({
      id: 'high-pain',
      type: 'pattern',
      title: 'High Pain Levels Detected',
      description: 'Your average pain level is higher than normal. Consider consulting a healthcare provider.',
      confidence: 0.8,
      isPremium: false
    });
  }

  // Analyze energy patterns
  const recentLogs = symptomLogs.slice(-7);
  const avgEnergy = recentLogs.reduce((sum, log) => sum + log.energyLevel, 0) / recentLogs.length;
  if (avgEnergy < 4) {
    insights.push({
      id: 'low-energy',
      type: 'pattern',
      title: 'Low Energy Pattern',
      description: 'You\'ve been experiencing lower energy levels. Focus on rest and nutrition.',
      confidence: 0.7,
      isPremium: false
    });
  }

  return insights;
}

export function exportHealthData(cycleLogs: CycleLog[], symptomLogs: SymptomLog[]): string {
  const headers = [
    'Date',
    'Type',
    'Flow Intensity',
    'Pain Level',
    'Energy Level',
    'Mood',
    'Symptoms',
    'Notes'
  ];

  const rows = [headers.join(',')];

  // Add cycle logs
  cycleLogs.forEach(log => {
    rows.push([
      formatDate(log.startDate),
      'Period Start',
      log.flowIntensity,
      '',
      '',
      '',
      '',
      log.notes || ''
    ].join(','));

    if (log.endDate) {
      rows.push([
        formatDate(log.endDate),
        'Period End',
        '',
        '',
        '',
        '',
        '',
        ''
      ].join(','));
    }
  });

  // Add symptom logs
  symptomLogs.forEach(log => {
    rows.push([
      formatDate(log.date),
      'Symptom Log',
      '',
      log.painLevel.toString(),
      log.energyLevel.toString(),
      log.mood,
      log.otherSymptoms.join(';'),
      log.notes || ''
    ].join(','));
  });

  return rows.join('\n');
}
