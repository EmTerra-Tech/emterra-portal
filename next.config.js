/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Set NEXT_PUBLIC_BE_BASE_URL in your environment (Vercel dashboard for prod,
    // .env.local for dev). Falls back to local dev BE.
    NEXT_PUBLIC_BE_BASE_URL: process.env.NEXT_PUBLIC_BE_BASE_URL || "http://localhost:8080",
  },
};

module.exports = nextConfig;
