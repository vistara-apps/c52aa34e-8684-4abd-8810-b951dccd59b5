'use client';

import { AppShell } from '@/components/AppShell';
import { HealthInsights } from '@/components/HealthInsights';

export default function InsightsPage() {
  return (
    <AppShell currentPage="insights">
      <HealthInsights />
    </AppShell>
  );
}
