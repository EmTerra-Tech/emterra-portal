/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BE_BASE_URL: process.env.NEXT_PUBLIC_BE_BASE_URL || "http://localhost:8080"
  }
};

module.exports = nextConfig;
