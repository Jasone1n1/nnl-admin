import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable React strict mode for better DX and catch side-effect issues
  reactStrictMode: true,
};

export default nextConfig;
