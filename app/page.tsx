export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-success/10 text-brand-success text-xs font-medium mb-6 border border-brand-success/20">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
        FCA Regulated · Firm Reference 123456
      </div>
      
      <h1 className="text-4xl sm:text-6xl font-bold text-navy-900 mb-4">
        Clearpath Mortgage Advisors
      </h1>
      
      <p className="text-xl text-brand-muted max-w-xl mx-auto mb-8">
        Your mortgage, made simple. Approachable, independent advice from brokers who work for you, not the bank.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="bg-gold-500 hover:bg-gold-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm">
          Book Free Consultation
        </button>
        <button className="border border-brand-border bg-white hover:bg-navy-50 text-navy-900 font-semibold py-3 px-6 rounded-lg transition-colors">
          Explore Services
        </button>
      </div>
    </main>
  );
}