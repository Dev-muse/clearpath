import { ContentfulSiteSettings } from "@/types/contentful";

interface TrustbarProps {
  settings: ContentfulSiteSettings | null;
}

const Trustbar = ({ settings }: TrustbarProps) => {
  return (
    <section className="bg-navy-100 py-12 border-y border-brand-border">
      <div className="max-w-77xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span
              className="material-symbols-outlined text-gold-500 text-4xl mb-2"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-navy-900">
              FCA Regulated
            </h3>
            <p className="font-body text-sm text-brand-muted mt-1">
              Authorised Financial Advice
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span
              className="material-symbols-outlined text-gold-500 text-4xl mb-2"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-navy-900">
              {settings?.lender_count
                ? `${settings.lender_count}+ Lenders`
                : "Whole of Market"}
            </h3>
            <p className="font-body text-sm text-brand-muted mt-1">
              Unrestricted Lender Access
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span
              className="material-symbols-outlined text-gold-500 text-4xl mb-2"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              groups
            </span>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-navy-900">
              {settings?.cases_completed
                ? `${settings.cases_completed.toLocaleString()}+ Cases`
                : "500+ Cases"}
            </h3>
            <p className="font-body text-sm text-brand-muted mt-1">
              Proven Local Success
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span
              className="material-symbols-outlined text-gold-500 text-4xl mb-2"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              calendar_today
            </span>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-navy-900">
              {settings?.years_experience
                ? `${settings.years_experience}+ Years`
                : "12 Years"}
            </h3>
            <p className="font-body text-sm text-brand-muted mt-1">
              Expertise in Every Cycle
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trustbar;
