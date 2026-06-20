import Link from "next/link";
import { getSiteSettings, getHomePageData } from "@/lib/contentful";
import Trustbar from "@/components/Trustbar";

export default async function HomePage() {
  const [settings, pageData] = await Promise.all([
    getSiteSettings().catch(() => null),
    getHomePageData().catch(() => ({
      hero: null,
      services: [],
      process_steps: [],
      testimonials: []
    })),
  ]);

  const { hero, services, process_steps, testimonials } = pageData;

  // Fallbacks if Contentful fields are empty
  const headline = hero?.headline || "Expert Mortgage Advice for Your London Life";
  const subheadline = hero?.subheadline || "Tailored lending solutions for first-time buyers and seasoned investors, designed with institutional precision and personal care.";
  const ctaText = hero?.cta_text || "Book Free Consultation";
  const ctaUrl = hero?.cta_url || "/contact";
  const heroImage = hero?.image_url;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-navy-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-navy-50 via-navy-50/40 to-transparent z-10" />
          {heroImage ? (
            <img
              alt="Clearpath professional mortgage advice presentation banner"
              className="w-full h-full object-cover object-center"
              src={heroImage}
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-navy-100 to-navy-50" />
          )}
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
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  trending_down
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar Section */}
      <Trustbar settings={settings} />

      {/* Services Grid Section */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 font-bold mb-4">
              Our Lending Specialisms
            </h2>
            <p className="font-body text-brand-muted leading-relaxed">
              Whole-of-market options mapped across specialized criteria portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-xl border border-brand-border shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-navy-100 flex items-center justify-center text-gold-500 mb-6">
                    <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <Link 
                  href={service.cta_url}
                  className="font-body text-sm font-semibold text-navy-900 hover:text-gold-600 inline-flex items-center gap-1 transition-colors mt-auto group"
                >
                  {service.cta_text}
                  <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                    arrow_right_alt
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Pathway Section */}
      <section className="py-20 bg-navy-100 border-y border-brand-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-heading tracking-widest text-gold-500 font-bold block mb-2">
              Timeline Strategy
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 font-bold">
              The Path to Completion
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {process_steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-start bg-white p-8 rounded-xl border border-brand-border">
                <div className="absolute top-6 right-8 font-heading text-5xl font-bold text-navy-900/5 select-none">
                  0{step.step_number}
                </div>
                <div className="w-12 h-12 rounded-full bg-gold-500 text-white flex items-center justify-center mb-6 shadow-md">
                  <span className="material-symbols-outlined text-xl">{step.icon}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-navy-900 mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Block Section */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 font-bold mb-4">
              Client Experiences
            </h2>
            <p className="font-body text-brand-muted leading-relaxed">
              Read how we assist clients across competitive capital market sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-brand-border flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex gap-1 text-gold-500 mb-6">
                    {Array.from({ length: item.star_rating || 5 }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body text-base text-brand-text/90 italic leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-brand-border pt-4 mt-auto">
                  <h4 className="font-heading text-sm font-bold text-navy-900">
                    {item.author_name}
                  </h4>
                  <p className="font-body text-xs text-brand-muted mt-0.5">
                    {item.mortgage_type} — {item.area}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}