import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configured natively for Next.js 16 Turbopack matching the 2026 specifications
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
};

export default nextConfig;
