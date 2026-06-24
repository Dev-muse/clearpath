import Link from "next/link";
import { ContentfulSiteSettings } from "@/types/contentful";

interface NavbarProps {
  settings: ContentfulSiteSettings | null;
}

// 1. Define a structured array for your main navigation links
const NAV_ITEMS = [
  { label: "Home", href: "/", isActive: true }, // You can handle active states dynamically later if needed
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ settings }: NavbarProps) {
  const companyName = settings?.company_name || "Clearpath";

  return (
    <header className="fixed top-0 w-full z-50 bg-navy-50/90 backdrop-blur-md border-b border-brand-border shadow-sm">
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-xl md:text-2xl font-bold text-navy-900 tracking-tight"
        >
          {companyName}
        </Link>

        {/* 2. Map through the items to eliminate repetitive JSX */}
        <div className="hidden md:flex items-center gap-8 text-brand-muted font-body text-sm font-semibold">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.isActive
                  ? "text-navy-900 border-b-2 border-gold-500 pb-1 font-bold"
                  : "hover:text-navy-900 transition-colors"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex items-center gap-4 font-body text-sm font-semibold">
          <Link
            href="/#calculator"
            className="hidden lg:block px-6 py-2 rounded-lg border border-brand-muted/40 text-navy-900 hover:bg-navy-900/5 transition-all"
          >
            Calculate Rate
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 rounded-lg bg-navy-900 text-white hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            Apply Now
          </Link>
        </div>
      </nav>
    </header>
  );
}