import type { Metadata } from "next";
import { Plus_Jakarta_Sans,Inter } from "next/font/google";
import "./globals.css";

 const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clearpath Mortgage Advisors",
  description: "Your mortgage, made simple. Independent whole-of-market mortgage brokers based in London.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="bg-brand-bg text-brand-text font-body antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
