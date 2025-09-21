import { NextRequest, NextResponse } from 'next/server';
import { frameActions } from '@/app/providers';

// Handle Farcaster Frame POST requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'log_period_start':
        const result1 = await frameActions.logPeriodStart(data?.flowIntensity);
        return NextResponse.json(result1);

      case 'log_symptom':
        const result2 = await frameActions.logSymptom(data?.painLevel, data?.mood);
        return NextResponse.json(result2);

      case 'get_todays_vibe':
        const result3 = await frameActions.getTodaysVibe();
        return NextResponse.json(result3);

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle Farcaster Frame GET requests (for initial frame display)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (action === 'todays_vibe') {
    const vibe = await frameActions.getTodaysVibe();
    return NextResponse.json(vibe);
  }

  // Default frame response
  return NextResponse.json({
    type: 'frame',
    title: 'CycleZen',
    description: 'Your menstrual wellness companion',
    image: `${request.nextUrl.origin}/api/frame/image`,
    buttons: [
      {
        label: 'Log Period Start',
        action: 'post',
        target: `${request.nextUrl.origin}/api/frame`,
        data: { action: 'log_period_start', flowIntensity: 'medium' }
      },
      {
        label: 'Log Symptom',
        action: 'post',
        target: `${request.nextUrl.origin}/api/frame`,
        data: { action: 'log_symptom', painLevel: 3, mood: 'calm' }
      },
      {
        label: "Today's Vibe",
        action: 'post',
        target: `${request.nextUrl.origin}/api/frame`,
        data: { action: 'get_todays_vibe' }
      }
    ]
  });
}

