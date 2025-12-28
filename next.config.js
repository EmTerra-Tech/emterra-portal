/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BE_BASE_URL: process.env.NEXT_PUBLIC_BE_BASE_URL || "https://emterra-backend-515470181668.asia-southeast1.run.app"
  }
};

module.exports = nextConfig;
