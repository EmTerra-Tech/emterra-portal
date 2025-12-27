/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BE_BASE_URL: "http://localhost:8080"
  }
};

module.exports = nextConfig;
