import Link from "next/link";
import { getSiteSettings, getHeroSection } from "@/lib/contentful";

export default async function HomePage() {
  const [settings, hero] = await Promise.all([
    getSiteSettings().catch(() => null),
    getHeroSection().catch(() => null),
  ]);

  // Fallbacks if Contentful fields are empty
  const headline = hero?.headline || "Expert Mortgage Advice for Your London Life";
  const subheadline = hero?.subheadline || "Tailored lending solutions for first-time buyers and seasoned investors, designed with institutional precision and personal care.";
  const ctaText = hero?.cta_text || "Book Free Consultation";
  const ctaUrl = hero?.cta_url || "/contact";
  const heroImage = hero?.image_url || "https://lh3.googleusercontent.com/aida/AP1WRLt5TeGX2uw7lqBtGhnUPxOAtsCZe2Vm8xYoBE1BSg9zEqDreKVKV0nKqX2fL8pB2pT8xwjqESp_58j1LbnQXEQlE1JdgRMtgNKPzwIHaFurwdh5MMh8DgViUNYjYOX27BhO6cW_Ib59hkFWjopHmKRrau0NcV6j5984-s0rZfP6Dp-kQRuGr_4lNauvLOKLM9-iMrr0tpZiuU59cYingSE4CmJ5j4K_TjhCLpF7tMVHfuP-dM6RTxcEnQg_";

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-navy-50">
        <div className="absolute inset-0 z-0">
          {/* Transparent gradient mask targeting light background variant */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-50 via-navy-50/40 to-transparent z-10" />
          <img 
            alt="Clearpath professional mortgage advice presentation banner" 
            className="w-full h-full object-cover object-center" 
            src={heroImage} 
          />
        </div>
        
        <div className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-16 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500 text-white font-heading text-xs font-semibold mb-6 uppercase tracking-wider">
              The London Specialist
            </span>
            <h1 className="font-heading text-4xl md:text-6xl text-navy-900 mb-6 font-bold leading-[1.1]">
              {headline}
            </h1>
            <p className="font-body text-lg md:text-xl text-brand-text/80 mb-10 max-w-lg leading-relaxed">
              {subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 font-body text-sm font-semibold">
              <Link 
                href={ctaUrl} 
                className="px-8 py-4 bg-navy-900 text-white rounded-lg shadow-lg hover:bg-navy-900/90 hover:scale-105 transition-all text-center"
              >
                {ctaText}
              </Link>
              <Link 
                href="/#calculator" 
                className="px-8 py-4 border border-brand-muted/40 text-navy-900 rounded-lg hover:bg-navy-900/5 transition-all flex items-center justify-center gap-2"
              >
                View Today&apos;s Rates
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>trending_down</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar Section */}
      <section className="bg-navy-100 py-12 border-y border-brand-border">
        <div className="max-w-77xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-gold-500 text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-navy-900">FCA Regulated</h3>
              <p className="font-body text-sm text-brand-muted mt-1">Authorised Financial Advice</p>
            </div>

            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-gold-500 text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-navy-900">
                {settings?.lender_count ? `${settings.lender_count}+ Lenders` : "Whole of Market"}
              </h3>
              <p className="font-body text-sm text-brand-muted mt-1">Unrestricted Lender Access</p>
            </div>

            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-gold-500 text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-navy-900">
                {settings?.cases_completed ? `${settings.cases_completed.toLocaleString()}+ Cases` : "500+ Cases"}
              </h3>
              <p className="font-body text-sm text-brand-muted mt-1">Proven Local Success</p>
            </div>

            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-gold-500 text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-navy-900">
                {settings?.years_experience ? `${settings.years_experience}+ Years` : "12 Years"}
              </h3>
              <p className="font-body text-sm text-brand-muted mt-1">Expertise in Every Cycle</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}