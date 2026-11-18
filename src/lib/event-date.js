// Shared helpers for interpreting event dates.
//
// Events are currently created with a date-only value ("YYYY-MM-DD"), but the
// API also accepts date-time strings. An event is considered over once its
// scheduled moment has passed:
//   - date-only  -> available through the end of that local day
//   - date+time  -> expires at the scheduled local/absolute time
//
// Keep this logic in sync with care-circle-server/event-date.js — the backend
// must enforce the exact same rule.

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_PATTERN = /[T ]\d{1,2}:\d{2}/;

export function parseEventDate(value) {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : new Date(value.getTime());
  }

  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const raw = String(value).trim();

  if (!raw) return null;

  const dateOnly = DATE_ONLY_PATTERN.exec(raw);

  if (dateOnly) {
    const [, year, month, day] = dateOnly;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));

    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const parsed = new Date(raw);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getEventExpiryTime(value) {
  const raw = typeof value === "string" ? value.trim() : "";
  const parsed = parseEventDate(value);

  if (!parsed) return null;

  // A date-only value has no start time to compare against, so the event
  // remains joinable for the whole day and expires at the next local midnight.
  if (!TIME_PATTERN.test(raw)) {
    return new Date(
      parsed.getFullYear(),
      parsed.getMonth(),
      parsed.getDate() + 1,
      0,
      0,
      0,
      0
    );
  }

  return parsed;
}

export function isEventExpired(dateValue, now = new Date()) {
  const expiry = getEventExpiryTime(dateValue);

  // If the date cannot be interpreted, avoid blocking a potentially valid
  // event. The listing pages already filter out invalid dates.
  if (!expiry) return false;

  return now.getTime() >= expiry.getTime();
}
