'use client';

import { useState, useEffect } from 'react';
import { Calendar, Droplets, TrendingUp, Clock } from 'lucide-react';
import { CycleLog, SymptomLog } from '@/lib/types';
import { getCycleLogs, getSymptomLogs } from '@/lib/storage';
import { calculateCycleDay, getCurrentCyclePhase, predictNextPeriod, formatDate } from '@/lib/utils';

export function CycleOverview() {
  const [cycleLogs, setCycleLogs] = useState<CycleLog[]>([]);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);

  useEffect(() => {
    setCycleLogs(getCycleLogs());
    setSymptomLogs(getSymptomLogs());
  }, []);

  const lastCycle = cycleLogs[cycleLogs.length - 1];
  const currentCycleDay = lastCycle ? calculateCycleDay(lastCycle.startDate) : 1;
  const currentPhase = getCurrentCyclePhase(currentCycleDay);
  const nextPeriod = predictNextPeriod(cycleLogs);
  
  // Calculate average cycle length
  const averageCycleLength = cycleLogs.length > 1 
    ? Math.round(cycleLogs.slice(1).reduce((sum, cycle, index) => {
        const prevCycle = cycleLogs[index];
        const daysBetween = Math.abs(cycle.startDate.getTime() - prevCycle.startDate.getTime()) / (1000 * 60 * 60 * 24);
        return sum + daysBetween;
      }, 0) / (cycleLogs.length - 1))
    : 28;

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'menstrual': return 'text-red-600 bg-red-50';
      case 'follicular': return 'text-green-600 bg-green-50';
      case 'ovulation': return 'text-purple-600 bg-purple-50';
      case 'luteal': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Phase Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Current Phase</h2>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPhaseColor(currentPhase.phase)}`}>
            Day {currentCycleDay}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium capitalize">{currentPhase.phase} Phase</h3>
          <p className="text-sm text-gray-600">{currentPhase.description}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-primary" size={16} />
            <span className="text-sm font-medium">Next Period</span>
          </div>
          <p className="text-lg font-semibold">{formatDate(nextPeriod)}</p>
          <p className="text-xs text-gray-600">
            {Math.ceil((nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-accent" size={16} />
            <span className="text-sm font-medium">Avg Cycle</span>
          </div>
          <p className="text-lg font-semibold">{averageCycleLength} days</p>
          <p className="text-xs text-gray-600">Based on {cycleLogs.length} cycles</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="font-semibold mb-3">Recent Activity</h3>
        
        {cycleLogs.length === 0 && symptomLogs.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Calendar size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No data logged yet</p>
            <p className="text-xs">Start by logging your current cycle or symptoms</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Recent Cycle Logs */}
            {cycleLogs.slice(-2).reverse().map((cycle) => (
              <div key={cycle.logId} className="flex items-center gap-3 p-2 bg-red-50 rounded-md">
                <Droplets className="text-red-500" size={16} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Period logged</p>
                  <p className="text-xs text-gray-600">
                    {formatDate(cycle.startDate)} • {cycle.flowIntensity} flow
                  </p>
                </div>
              </div>
            ))}

            {/* Recent Symptom Logs */}
            {symptomLogs.slice(-2).reverse().map((symptom) => (
              <div key={symptom.symptomLogId} className="flex items-center gap-3 p-2 bg-blue-50 rounded-md">
                <Clock className="text-blue-500" size={16} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Symptoms logged</p>
                  <p className="text-xs text-gray-600">
                    {formatDate(symptom.date)} • Pain: {symptom.painLevel}/10, Energy: {symptom.energyLevel}/10
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
