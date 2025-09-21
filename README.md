# CycleZen - Menstrual Wellness Tracker

A comprehensive Base MiniApp for tracking menstrual cycles, symptoms, and mood with personalized insights and predictive analytics.

## Features

### Core Functionality
- **Predictive Period Logging**: Log period start/end dates with flow intensity and get cycle predictions
- **Symptom & Mood Correlation**: Track daily symptoms, pain levels, energy, and mood states
- **Health Pattern Analysis**: Discover trends and correlations between cycle phases and symptoms
- **Secure Data Export**: Export complete health data in CSV format for healthcare providers

### Base MiniApp Integration
- **Wallet-Native Experience**: Seamless integration with Base Wallet for secure, decentralized data storage
- **Farcaster Frame Actions**: Quick logging via Farcaster frames with in-feed actions
- **Cross-Platform Compatibility**: Works on mobile and web with consistent UX

### User Experience
- **Intuitive Onboarding**: Step-by-step setup for first-time users
- **Visual Cycle Tracking**: Calendar view with cycle phase visualization
- **Personalized Insights**: AI-powered pattern recognition and health recommendations
- **Privacy-First**: All data stored locally with user-controlled export options

## Technical Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Base Integration**: Coinbase MiniKit for wallet connectivity
- **Farcaster**: Frame actions for social features
- **Storage**: Local storage with CSV export capability

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Base Wallet (for full functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cyclezen
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── frame/         # Farcaster Frame endpoints
│   ├── calendar/          # Calendar page
│   ├── insights/          # Insights page
│   ├── settings/          # Settings page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── AppShell.tsx       # Main app shell with navigation
│   ├── CycleCalendar.tsx  # Calendar component
│   ├── CycleLogForm.tsx   # Period logging form
│   ├── SymptomLogForm.tsx # Symptom logging form
│   ├── HealthInsights.tsx # Insights dashboard
│   └── OnboardingFlow.tsx # User onboarding
├── lib/                   # Utility libraries
│   ├── storage.ts         # Data persistence
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Helper functions
└── public/                # Static assets
```

## Base MiniApp Configuration

The app is configured as a Base MiniApp with the following features:

- **Frame Actions**: Quick logging via Farcaster frames
- **Wallet Integration**: Secure data association with Base wallets
- **Manifest**: Proper app manifest for Base ecosystem

## Data Model

### User
- `userId`: Unique identifier
- `farcasterId`: Optional Farcaster integration
- `createdAt`: Account creation timestamp
- `settings`: User preferences and cycle settings

### CycleLog
- `logId`: Unique log identifier
- `userId`: Associated user
- `startDate`: Period start date
- `endDate`: Period end date (optional)
- `flowIntensity`: Light, medium, or heavy
- `notes`: Additional notes

### SymptomLog
- `symptomLogId`: Unique symptom log identifier
- `userId`: Associated user
- `date`: Date of symptoms
- `painLevel`: Pain level (1-10)
- `energyLevel`: Energy level (1-10)
- `mood`: Current mood state
- `otherSymptoms`: Additional symptoms array
- `notes`: Additional notes

## API Endpoints

### Frame Actions
- `POST /api/frame`: Handle Farcaster Frame interactions
- `GET /api/frame`: Get frame metadata
- `GET /api/frame/image`: Generate dynamic frame images

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Create a Pull Request

## Privacy & Security

- All health data is stored locally in the user's browser
- No data is transmitted to external servers without explicit user consent
- CSV export functionality allows users to share data with healthcare providers
- Wallet-based authentication ensures user-controlled data access

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation for common solutions

---

Built with ❤️ for menstrual wellness and health awareness.

