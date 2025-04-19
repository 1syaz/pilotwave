import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
};

export default nextConfig;
