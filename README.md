# CycleZen - Menstrual Wellness Base MiniApp

CycleZen is a comprehensive menstrual wellness tracking application built as a Base MiniApp. It helps users track their menstrual cycles, symptoms, and mood while providing personalized insights and health pattern analysis.

## Features

### Core Functionality
- **Predictive Period Logging**: Track period start/end dates and flow intensity with cycle predictions
- **Symptom & Mood Correlation**: Log daily symptoms, pain levels, energy, and mood states
- **Health Pattern Analysis**: Discover trends and correlations between cycle phases and symptoms
- **Secure Data & Export**: Local data storage with CSV export functionality

### User Interface
- **Calendar View**: Visual cycle tracking with color-coded period and symptom indicators
- **Dashboard**: Overview of current cycle phase, next period prediction, and recent activity
- **Insights**: Charts and analytics showing symptom trends and health patterns
- **Settings**: Customizable cycle parameters and data management

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: Local Storage (browser-based)
- **Base Integration**: MiniKit for Base ecosystem integration

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

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

4. Add your MiniKit API key to `.env.local`:
```
NEXT_PUBLIC_MINIKIT_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
cyclezen/
├── app/                    # Next.js App Router pages
│   ├── calendar/          # Calendar view page
│   ├── insights/          # Health insights page
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # App providers
├── components/            # React components
│   ├── AppShell.tsx       # Main app layout
│   ├── CycleCalendar.tsx  # Calendar component
│   ├── CycleLogForm.tsx   # Period logging form
│   ├── SymptomLogForm.tsx # Symptom logging form
│   ├── CycleOverview.tsx  # Dashboard overview
│   └── HealthInsights.tsx # Analytics component
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript interfaces
│   ├── utils.ts           # Helper functions
│   └── storage.ts         # Local storage management
└── public/               # Static assets
```

## Data Model

### User
- `userId`: Unique identifier
- `farcasterId`: Optional Farcaster integration
- `createdAt`: Account creation date
- `settings`: User preferences and cycle parameters

### CycleLog
- `logId`: Unique log identifier
- `userId`: Associated user
- `startDate`: Period start date
- `endDate`: Period end date (optional)
- `flowIntensity`: Light, medium, or heavy
- `notes`: Optional notes

### SymptomLog
- `symptomLogId`: Unique log identifier
- `userId`: Associated user
- `date`: Log date
- `painLevel`: 1-10 scale
- `energyLevel`: 1-10 scale
- `mood`: Predefined mood states
- `otherSymptoms`: Array of symptoms
- `notes`: Optional notes

## Features in Detail

### Cycle Tracking
- Visual calendar with period indicators
- Flow intensity tracking (light, medium, heavy)
- Automatic cycle length calculation
- Next period predictions based on historical data

### Symptom Monitoring
- Pain and energy level tracking (1-10 scale)
- Mood selection from predefined options
- Common symptom checkboxes
- Free-form notes for additional details

### Health Insights
- Symptom trend charts over time
- Pattern recognition and correlations
- Personalized health recommendations
- Data export for healthcare providers

### Premium Features (Zen Pro)
- Advanced 3-month cycle predictions
- Symptom-lifestyle correlations
- Personalized wellness recommendations
- Priority customer support

## Base MiniApp Integration

CycleZen is built as a Base MiniApp with:
- MiniKit provider integration
- Base chain compatibility
- Farcaster Frame actions support
- Social-native user experience

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [support@cyclezen.app](mailto:support@cyclezen.app) or open an issue on GitHub.

## Roadmap

- [ ] Healthcare provider integration
- [ ] Advanced AI-powered insights
- [ ] Community features and support groups
- [ ] Wearable device integration
- [ ] Multi-language support
- [ ] Offline functionality improvements
