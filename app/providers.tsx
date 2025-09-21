'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key'}
      chain={base}
    >
      {children}
    </OnchainKitProvider>
  );
}

// Frame action handlers for Farcaster integration
export const frameActions = {
  logPeriodStart: async (flowIntensity: 'light' | 'medium' | 'heavy' = 'medium') => {
    // This would be called from a Farcaster Frame action
    // In a real implementation, this would submit to a backend API
    console.log('Logging period start with flow:', flowIntensity);
    return { success: true, message: 'Period logged successfully' };
  },

  logSymptom: async (painLevel: number, mood: string) => {
    // This would be called from a Farcaster Frame action
    console.log('Logging symptom:', { painLevel, mood });
    return { success: true, message: 'Symptom logged successfully' };
  },

  getTodaysVibe: async () => {
    // Return current cycle phase and mood summary
    return {
      phase: 'follicular',
      day: 12,
      mood: 'energetic',
      message: 'You\'re in your follicular phase - energy levels are typically high!'
    };
  }
};
