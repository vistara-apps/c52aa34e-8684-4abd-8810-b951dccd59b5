'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Sparkles, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CycleLog, SymptomLog, HealthInsight } from '@/lib/types';
import { getCycleLogs, getSymptomLogs } from '@/lib/storage';
import { analyzeSymptomPatterns, exportHealthData, formatDate } from '@/lib/utils';

export function HealthInsights() {
  const [cycleLogs, setCycleLogs] = useState<CycleLog[]>([]);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [showPremium, setShowPremium] = useState(false);

  useEffect(() => {
    const cycles = getCycleLogs();
    const symptoms = getSymptomLogs();
    
    setCycleLogs(cycles);
    setSymptomLogs(symptoms);
    setInsights(analyzeSymptomPatterns(symptoms));
  }, []);

  // Prepare chart data
  const chartData = symptomLogs
    .slice(-14) // Last 14 days
    .map(log => ({
      date: formatDate(log.date).split(',')[0], // Short date format
      pain: log.painLevel,
      energy: log.energyLevel,
      mood: log.mood === 'happy' ? 8 : log.mood === 'calm' ? 7 : log.mood === 'energetic' ? 9 : 
            log.mood === 'tired' ? 4 : log.mood === 'anxious' ? 3 : log.mood === 'irritable' ? 2 : 1
    }));

  const handleExportData = () => {
    const csvData = exportHealthData(cycleLogs, symptomLogs);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyclezen-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const premiumInsights: HealthInsight[] = [
    {
      id: 'cycle-prediction',
      type: 'prediction',
      title: 'Advanced Cycle Prediction',
      description: 'Get 3-month cycle predictions with 95% accuracy based on your unique patterns.',
      confidence: 0.95,
      isPremium: true
    },
    {
      id: 'symptom-correlation',
      type: 'correlation',
      title: 'Symptom-Lifestyle Correlation',
      description: 'Discover how sleep, exercise, and diet affect your cycle symptoms.',
      confidence: 0.85,
      isPremium: true
    },
    {
      id: 'personalized-tips',
      type: 'pattern',
      title: 'Personalized Wellness Tips',
      description: 'Get custom recommendations for nutrition, exercise, and self-care based on your cycle phase.',
      confidence: 0.9,
      isPremium: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Health Insights</h1>
          <p className="text-sm text-gray-600">Discover patterns in your wellness journey</p>
        </div>
        
        <button
          onClick={handleExportData}
          className="btn-secondary flex items-center gap-2"
          disabled={cycleLogs.length === 0 && symptomLogs.length === 0}
        >
          <Download size={16} />
          Export Data
        </button>
      </div>

      {/* Charts Section */}
      {chartData.length > 0 && (
        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="text-primary" size={20} />
            Symptom Trends (Last 14 Days)
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="pain" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Pain Level"
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Energy Level"
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Mood Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Free Insights */}
      {insights.length > 0 && (
        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="text-accent" size={20} />
            Your Insights
          </h3>
          
          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight.id} className="p-3 bg-blue-50 rounded-md">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-blue-600 mt-0.5" size={16} />
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900">{insight.title}</h4>
                    <p className="text-sm text-blue-700 mt-1">{insight.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="text-xs text-blue-600">
                        Confidence: {Math.round(insight.confidence * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Premium Insights Teaser */}
      <div className="card border-2 border-dashed border-primary/30">
        <div className="text-center py-6">
          <Sparkles className="text-primary mx-auto mb-3" size={32} />
          <h3 className="font-semibold text-lg mb-2">Unlock Advanced Insights</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get deeper analysis and personalized recommendations with Zen Pro
          </p>
          
          <div className="space-y-3 mb-6">
            {premiumInsights.map((insight) => (
              <div key={insight.id} className="p-3 bg-gray-50 rounded-md text-left">
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setShowPremium(true)}
            className="btn-primary"
          >
            Upgrade to Zen Pro - $4.99/month
          </button>
        </div>
      </div>

      {/* No Data State */}
      {cycleLogs.length === 0 && symptomLogs.length === 0 && (
        <div className="card text-center py-12">
          <BarChart3 size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="font-semibold text-lg mb-2">No Data Yet</h3>
          <p className="text-gray-600 mb-4">
            Start logging your cycles and symptoms to see personalized insights
          </p>
          <button className="btn-primary">
            Log Your First Entry
          </button>
        </div>
      )}

      {/* Premium Modal (Simple) */}
      {showPremium && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full">
            <h3 className="font-bold text-lg mb-4">Zen Pro Features</h3>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• Advanced 3-month cycle predictions</li>
              <li>• Symptom-lifestyle correlations</li>
              <li>• Personalized wellness recommendations</li>
              <li>• Priority customer support</li>
              <li>• Export detailed reports</li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPremium(false)}
                className="btn-secondary flex-1"
              >
                Maybe Later
              </button>
              <button className="btn-primary flex-1">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
