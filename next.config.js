/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    BE_BASE_URL: "https://emterra-be-production.up.railway.app"
  }
};

module.exports = nextConfig;
