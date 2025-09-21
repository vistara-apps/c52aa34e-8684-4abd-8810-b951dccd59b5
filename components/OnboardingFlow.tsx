'use client';

import { useState } from 'react';
import { Calendar, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { CycleLogForm } from './CycleLogForm';
import { SymptomLogForm } from './SymptomLogForm';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [showCycleForm, setShowCycleForm] = useState(false);
  const [showSymptomForm, setShowSymptomForm] = useState(false);

  const handleCycleSaved = () => {
    setShowCycleForm(false);
    setStep(3);
  };

  const handleSymptomSaved = () => {
    setShowSymptomForm(false);
    setStep(4);
  };

  if (showCycleForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-4 py-6">
          <div className="mb-6">
            <button
              onClick={() => setShowCycleForm(false)}
              className="text-primary hover:underline"
            >
              ← Back to onboarding
            </button>
          </div>
          <CycleLogForm
            onSave={handleCycleSaved}
            onCancel={() => setShowCycleForm(false)}
          />
        </div>
      </div>
    );
  }

  if (showSymptomForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-4 py-6">
          <div className="mb-6">
            <button
              onClick={() => setShowSymptomForm(false)}
              className="text-primary hover:underline"
            >
              ← Back to onboarding
            </button>
          </div>
          <SymptomLogForm
            onSave={handleSymptomSaved}
            onCancel={() => setShowSymptomForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNumber <= step
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stepNumber < step ? <CheckCircle size={16} /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      stepNumber < step ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome to CycleZen</h1>
              <p className="text-gray-600">
                Your intuitive guide to menstrual wellness and personalized insights.
              </p>
            </div>
            <div className="space-y-4">
              <div className="card text-left">
                <h3 className="font-semibold mb-2">What you'll get:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Predictive period tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Symptom and mood correlation insights
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Personalized health recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Secure data storage and export
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="btn-primary w-full"
            >
              Get Started
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Log Your First Cycle</h1>
              <p className="text-gray-600">
                Start by logging your current or last period to help us understand your cycle.
              </p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-600 mb-4">
                This will help CycleZen predict your future cycles and provide personalized insights.
              </p>
              <button
                onClick={() => setShowCycleForm(true)}
                className="btn-primary w-full"
              >
                Log My Cycle
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="text-accent" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Track Your Well-being</h1>
              <p className="text-gray-600">
                Now let's log how you're feeling today to start building your wellness profile.
              </p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-600 mb-4">
                Regular symptom tracking helps identify patterns and correlations with your cycle phases.
              </p>
              <button
                onClick={() => setShowSymptomForm(true)}
                className="btn-primary w-full"
              >
                Log Today's Symptoms
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">You're All Set!</h1>
              <p className="text-gray-600">
                Welcome to your personalized menstrual wellness journey.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-2">What's next:</h3>
              <ul className="space-y-2 text-sm text-left">
                <li>• Continue logging daily symptoms for better insights</li>
                <li>• Check the Calendar view for your cycle visualization</li>
                <li>• Explore Insights to discover patterns in your data</li>
                <li>• Customize settings to match your preferences</li>
              </ul>
            </div>
            <button
              onClick={onComplete}
              className="btn-primary w-full"
            >
              Start Using CycleZen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

