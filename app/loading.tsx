export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Loading CycleZen</h2>
        <p className="text-sm text-gray-600">Preparing your wellness dashboard...</p>
      </div>
    </div>
  );
}
