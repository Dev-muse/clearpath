import Link from "next/link";
import { ContentfulSiteSettings } from "@/types/contentful";

interface NavbarProps {
  settings: ContentfulSiteSettings | null;
}

export default function Navbar({ settings }: NavbarProps) {
  // If settings is null, we safely fall back to a default string
  const companyName = settings?.company_name || "Clearpath";

  return (
    <header className="fixed top-0 w-full z-50 bg-navy-50/90 backdrop-blur-md border-b border-brand-border shadow-sm">
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 max-w-7xl mx-auto">
        <Link href="/" className="font-heading text-xl md:text-2xl font-bold text-navy-900 tracking-tight">
          {companyName}
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-brand-muted font-body text-sm font-semibold">
          <Link href="/" className="text-navy-900 border-b-2 border-gold-500 pb-1 font-bold">
            Home
          </Link>
          <Link href="/about" className="hover:text-navy-900 transition-colors">
            About
          </Link>
          <Link href="/how-it-works" className="hover:text-navy-900 transition-colors">
            How It Works
          </Link>
          <Link href="/services" className="hover:text-navy-900 transition-colors">
            Services
          </Link>
          <Link href="/contact" className="hover:text-navy-900 transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 font-body text-sm font-semibold">
          <Link href="/#calculator" className="hidden lg:block px-6 py-2 rounded-lg border border-brand-muted/40 text-navy-900 hover:bg-navy-900/5 transition-all">
            Calculate Rate
          </Link>
          <Link href="/contact" className="px-6 py-2 rounded-lg bg-navy-900 text-white hover:scale-105 active:scale-95 transition-transform duration-200">
            Apply Now
          </Link>
        </div>
      </nav>
    </header>
  );
}