import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // The lab (~/lab) is its own Vercel project with basePath "/lab"
  async rewrites() {
    return [
      { source: "/lab", destination: "https://ak-lab-lovat.vercel.app/lab" },
      { source: "/lab/:path*", destination: "https://ak-lab-lovat.vercel.app/lab/:path*" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
