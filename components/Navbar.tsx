import Link from "next/link";
import { ContentfulSiteSettings } from "@/types/contentful";

interface NavbarProps {
  settings: ContentfulSiteSettings | null;
}

export default function Navbar({ settings }: NavbarProps) {
  // If settings is null, we safely fall back to a default string
  const companyName = settings?.company_name || "Clearpath";

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <nav className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link href="/" className="font-heading text-headline-md font-bold text-primary tracking-tight">
          {companyName}
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-on-surface-variant font-body">
          <Link href="/" className="text-primary border-b-2 border-secondary pb-1 font-bold">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="/services" className="hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 font-body text-sm font-medium">
          <Link href="/#calculator" className="hidden lg:block px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-all">
            Calculate Rate
          </Link>
          <Link href="/contact" className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:scale-105 active:scale-95 transition-transform duration-200">
            Apply Now
          </Link>
        </div>
      </nav>
    </header>
  );
}