import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add Next.js config here if needed
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
