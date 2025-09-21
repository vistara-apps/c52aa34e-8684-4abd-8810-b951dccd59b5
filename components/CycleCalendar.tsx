'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { CycleLog, SymptomLog } from '@/lib/types';
import { getCycleLogs, getSymptomLogs } from '@/lib/storage';

interface CycleCalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export function CycleCalendar({ onDateSelect, selectedDate }: CycleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [cycleLogs, setCycleLogs] = useState<CycleLog[]>([]);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);

  useEffect(() => {
    setCycleLogs(getCycleLogs());
    setSymptomLogs(getSymptomLogs());
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getDayInfo = (date: Date) => {
    const cycleLog = cycleLogs.find(log => 
      isSameDay(log.startDate, date) || 
      (log.endDate && date >= log.startDate && date <= log.endDate)
    );
    
    const symptomLog = symptomLogs.find(log => isSameDay(log.date, date));
    
    return { cycleLog, symptomLog };
  };

  const getDayStyle = (date: Date) => {
    const { cycleLog, symptomLog } = getDayInfo(date);
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isToday = isSameDay(date, new Date());
    
    let baseClasses = 'w-10 h-10 flex items-center justify-center rounded-full text-sm transition-colors duration-200 ';
    
    if (isSelected) {
      baseClasses += 'bg-primary text-white ';
    } else if (isToday) {
      baseClasses += 'bg-accent text-white ';
    } else if (cycleLog) {
      if (isSameDay(cycleLog.startDate, date)) {
        baseClasses += 'bg-red-500 text-white ';
      } else {
        baseClasses += 'bg-red-200 text-red-800 ';
      }
    } else if (symptomLog) {
      baseClasses += 'bg-blue-100 text-blue-800 ';
    } else {
      baseClasses += 'hover:bg-gray-100 text-foreground ';
    }
    
    return baseClasses;
  };

  return (
    <div className="card">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const dayNumber = format(day, 'd');
          const isCurrentMonth = isSameMonth(day, currentMonth);
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect?.(day)}
              className={getDayStyle(day)}
              disabled={!isCurrentMonth}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Circle size={12} className="fill-red-500 text-red-500" />
            <span>Period</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle size={12} className="fill-blue-100 text-blue-100" />
            <span>Symptoms logged</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle size={12} className="fill-accent text-accent" />
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
