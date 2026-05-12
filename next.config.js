/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Set NEXT_PUBLIC_BE_BASE_URL in your environment (Vercel dashboard for
    // prod, .env.local for dev). Defaults to the Render production backend so
    // a Vercel build without the env var still hits the right API.
    NEXT_PUBLIC_BE_BASE_URL:
      process.env.NEXT_PUBLIC_BE_BASE_URL || "https://emterra-be-nest.onrender.com",
  },
};

module.exports = nextConfig;
