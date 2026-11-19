// Base URL of the Express backend (care-circle-server).
// Set NEXT_PUBLIC_API_URL in your Vercel project environment variables
// (e.g. https://your-backend.onrender.com). Falls back to localhost for dev.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// The single, consistent image used when an event has no valid thumbnail.
export const DEFAULT_THUMBNAIL = "/imege/hero-hands-plant.jpg";

// Keep the exact URL submitted by the organizer (only outer whitespace is
// trimmed). Invalid or missing values resolve to the one fixed default.
export function normalizeThumbnailUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";

  const trimmed = value.trim();
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
    return trimmed;
  } catch {
    return "";
  }
}

export function getEventImageUrl(value) {
  return normalizeThumbnailUrl(value) || DEFAULT_THUMBNAIL;
}
