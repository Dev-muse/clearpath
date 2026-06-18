import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/contentful";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  return {
    title: settings ? `${settings.company_name} | ${settings.tagline}` : "Clearpath Mortgage Advisors",
    description: "Expert whole-of-market mortgage brokerage services.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch settings safely and print any internal connection/parsing errors to your terminal logs
  const settings = await getSiteSettings().catch((err) => {
    console.error("Contentful connection failed inside RootLayout:", err);
    return null;
  });
  
  return (
    <html className="scroll-smooth" lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${plusJakartaSans.variable} ${inter.variable} bg-background text-on-surface font-body-md selection:bg-secondary-fixed selection:text-on-secondary-fixed min-h-screen flex flex-col justify-between`}>
        <Navbar settings={settings} />
        <main className="pt-20 grow">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}