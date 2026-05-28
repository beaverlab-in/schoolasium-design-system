import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow optimised images from the same host and any future CDN
    remotePatterns: [],
    // Logo PNGs are large — increase quality threshold
    formats: ["image/avif", "image/webp"],
  },

  // Enforce strict mode for React 19
  reactStrictMode: true,

  // Silence the "x-powered-by" header
  poweredByHeader: false,

  // Redirect old paths if needed (none yet)
  async redirects() {
    return [];
  },
};

export default nextConfig;
