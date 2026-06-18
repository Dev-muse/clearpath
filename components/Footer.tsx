import Link from "next/link";
import { ContentfulSiteSettings } from "@/types/contentful";

interface FooterProps {
  settings: ContentfulSiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  const companyName = settings?.company_name || "Clearpath";
  const tagline = settings?.tagline || "Providing tailored mortgage solutions with a focus on transparency, expertise, and personalized service.";
  const fcaNumber = settings?.fca_number || "123456";

  return (
    <footer className="bg-navy-900 text-navy-50 py-16 border-t border-brand-border/20 font-body">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="font-heading text-xl md:text-2xl text-gold-500 mb-6 font-bold tracking-tight">
            {companyName}
          </div>
          <p className="text-navy-100/80 max-w-md text-base mb-8 leading-relaxed">
            {tagline}
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Language" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold-500 transition-colors">
              <span className="material-symbols-outlined text-sm">language</span>
            </a>
            <a href={`mailto:${settings?.email || "hello@clearpath.co.uk"}`} aria-label="Email" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold-500 transition-colors">
              <span className="material-symbols-outlined text-sm">alternate_email</span>
            </a>
            <a href={`tel:${settings?.phone || ""}`} aria-label="Phone" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold-500 transition-colors">
              <span className="material-symbols-outlined text-sm">call</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold-500 mb-6 font-bold">Explore</h4>
          <ul className="space-y-4 text-navy-100/70 text-sm">
            <li><Link className="hover:text-gold-500 transition-colors" href="/">Home</Link></li>
            <li><Link className="hover:text-gold-500 transition-colors" href="/about">About Us</Link></li>
            <li><Link className="hover:text-gold-500 transition-colors" href="/how-it-works">Our Process</Link></li>
            <li><Link className="hover:text-gold-500 transition-colors" href="/services">Mortgage Types</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold-500 mb-6 font-bold">Legal</h4>
          <ul className="space-y-4 text-navy-100/70 text-sm">
            <li><a className="hover:text-gold-500 transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-gold-500 transition-colors" href="#">Terms of Service</a></li>
            <li><a className="hover:text-gold-500 transition-colors" href="#">FCA Regulation</a></li>
            <li><a className="hover:text-gold-500 transition-colors" href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-12 border-t border-white/10">
        <p className="text-xs text-navy-100/50 leading-relaxed max-w-4xl">
          © {new Date().getFullYear()} {companyName}. All rights reserved. {companyName} is an appointed representative of The Mortgage Network, which is authorised and regulated by the Financial Conduct Authority (FCA) under registration number {fcaNumber}. Your home may be repossessed if you do not keep up repayments on your mortgage.
        </p>
      </div>
    </footer>
  );
}