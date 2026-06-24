import Link from "next/link";
import { notFound } from "next/navigation";
import { getHomePageData, getSiteSettings } from "@/lib/contentful";

// Enforcing clear, immutable type definitions for Contentful schemas
interface ContentfulService {
  title: string;
  description: string;
  icon: string;
  cta_text: string;
  cta_url: string;
}

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const [settings, pageData] = await Promise.all([
    getSiteSettings().catch(() => null),
    getHomePageData().catch(() => ({ services: [] as ContentfulService[] })),
  ]);

  // Type-safe lookup using our explicit interface contract
  const service = pageData.services.find(
    (s: ContentfulService) => s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
  );

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Editorial Header */}
      <section className="bg-navy-50 py-20 border-b border-brand-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-navy-900 mb-8 font-body group transition-colors"
          >
            <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">
              keyboard_backspace
            </span>
            Back to Specialisms
          </Link>

          <div className="max-w-3xl">
            <div className="w-12 h-12 rounded-lg bg-navy-100 flex items-center justify-center text-gold-500 mb-6">
              <span className="material-symbols-outlined text-2xl">{service.icon}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy-900 mb-6 tracking-tight">
              {service.title} Solutions
            </h1>
            <p className="font-body text-lg md:text-xl text-brand-text/80 leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Advisory Pillar Details Layout */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Advisory Column */}
            <div className="lg:col-span-8 space-y-12 font-body text-brand-text">
              <div className="bg-white p-8 rounded-2xl border border-brand-border shadow-xs">
                <h2 className="font-heading text-2xl font-bold text-navy-900 mb-4">
                  Institutional Framework
                </h2>
                <p className="leading-relaxed text-brand-muted mb-6">
                  Navigating the complex whole-of-market landscape requires precision matching against specialized criteria portfolios. Our advisory pipeline ensures your architecture meets strict lending mandates while optimizing capital efficiency.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-semibold text-navy-900 mt-6">
                  <div className="flex items-center gap-3 p-4 bg-navy-50 rounded-lg">
                    <span className="material-symbols-outlined text-gold-500">verified</span>
                    Fully Managed Pipeline
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-navy-50 rounded-lg">
                    <span className="material-symbols-outlined text-gold-500">rate_review</span>
                    Direct Criteria Matching
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action Sidebar Card */}
            <div className="lg:col-span-4">
              <div className="bg-navy-900 p-8 rounded-2xl text-white shadow-xl sticky top-8">
                <h3 className="font-heading text-xl font-bold mb-4">
                  Secure Advisory Access
                </h3>
                <p className="font-body text-sm text-white/80 leading-relaxed mb-8">
                  Connect with an execution partner to analyze your specific portfolio parameters.
                </p>
                <Link
                  href="/contact"
                  className="block w-full py-4 bg-gold-500 text-white font-body font-semibold text-sm text-center rounded-lg hover:bg-gold-600 active:scale-[0.99] transition-all shadow-lg"
                >
                  Book Priority Consultation
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}