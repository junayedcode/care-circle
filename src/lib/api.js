// Base URL of the Express backend (care-circle-server).
// Set NEXT_PUBLIC_API_URL in your Vercel project environment variables
// (e.g. https://your-backend.onrender.com). Falls back to localhost for dev.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1200&q=80";
