import type { NextConfig } from "next";

/**
 * @description Next.js configuration for The Falcon Cafe & Lounge.
 * Configures image domains for Cloudinary and Supabase storage,
 * and enables server actions for admin CRUD operations.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
