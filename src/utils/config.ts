// API Configuration
// Use NEXT_PUBLIC_ prefix for client-side access in Next.js
// Defaults to localhost:8080 in development, production URL otherwise
const DEFAULT_LOCAL_URL = "http://localhost:8080";
const DEFAULT_PRODUCTION_URL = "https://emterra-backend-515470181668.asia-southeast1.run.app";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BE_BASE_URL ||
  (process.env.NODE_ENV === "development" ? DEFAULT_LOCAL_URL : DEFAULT_PRODUCTION_URL);

// Debug log to verify which URL is being used
console.log("[Config] API_BASE_URL:", API_BASE_URL);
console.log("[Config] NODE_ENV:", process.env.NODE_ENV);
console.log("[Config] NEXT_PUBLIC_BE_BASE_URL:", process.env.NEXT_PUBLIC_BE_BASE_URL);
