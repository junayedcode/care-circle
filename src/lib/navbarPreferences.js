export const THEME_STORAGE_KEY = "carecircle-theme";
export const LANGUAGE_STORAGE_KEY = "carecircle-language";

const VALID_THEMES = ["light", "dark"];
const VALID_LANGUAGES = ["en", "bn"];

function readStoredValue(key, validValues, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return validValues.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredValue(key, value) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable (private mode, restricted settings).
  }
}

export function getStoredTheme() {
  return readStoredValue(THEME_STORAGE_KEY, VALID_THEMES, "light");
}

export function getStoredLanguage() {
  return readStoredValue(LANGUAGE_STORAGE_KEY, VALID_LANGUAGES, "en");
}

export function setStoredTheme(theme) {
  if (VALID_THEMES.includes(theme)) writeStoredValue(THEME_STORAGE_KEY, theme);
}

export function setStoredLanguage(language) {
  if (VALID_LANGUAGES.includes(language)) {
    writeStoredValue(LANGUAGE_STORAGE_KEY, language);
  }
}
