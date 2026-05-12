// API Configuration
// Set NEXT_PUBLIC_BE_BASE_URL in your environment (Vercel for prod, .env.local
// for dev). Defaults to the Render production backend.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BE_BASE_URL || "https://emterra-be-nest.onrender.com";
