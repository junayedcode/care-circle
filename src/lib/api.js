// Base URL of the Express backend (care-circle-server).
// Set NEXT_PUBLIC_API_URL in your Vercel project environment variables
// (e.g. https://your-backend.onrender.com). Falls back to localhost for dev.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Local fallback used when an event has no thumbnail or its URL fails to load.
export const DEFAULT_THUMBNAIL = "/imege/hero-hands-plant.jpg";
