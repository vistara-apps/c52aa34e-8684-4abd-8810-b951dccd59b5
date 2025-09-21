import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // In a real implementation, this would generate a dynamic image
  // For now, we'll return a simple SVG as a placeholder

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <circle cx="600" cy="200" r="80" fill="#22c55e" opacity="0.1"/>
      <circle cx="500" cy="250" r="60" fill="#3b82f6" opacity="0.1"/>
      <circle cx="700" cy="180" r="70" fill="#ef4444" opacity="0.1"/>
      <text x="600" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#1e293b">
        CycleZen
      </text>
      <text x="600" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#64748b">
        Your Menstrual Wellness Guide
      </text>
      <text x="600" y="450" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#94a3b8">
        Track • Predict • Understand
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=300',
    },
  });
}

