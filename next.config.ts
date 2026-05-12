import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
