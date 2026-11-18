"use client";

import { useEffect, useState } from "react";

export const LANGUAGE_CHANGE_EVENT = "carecircle:languagechange";

// Reuses the language already stored and applied by the Navbar toggle.
// Initial state is "en" to match server-rendered markup; the real value is
// picked up from <html lang> immediately after mount, so there is no flash of
// wrong content and no hydration mismatch.
export function useLanguage() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const readLanguage = () => {
      const current =
        typeof document === "undefined"
          ? "en"
          : document.documentElement.lang;
      setLanguage(current === "bn" ? "bn" : "en");
    };

    readLanguage();
    window.addEventListener(LANGUAGE_CHANGE_EVENT, readLanguage);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, readLanguage);
  }, []);

  return language;
}

// Called by the existing Navbar toggle after it persists the preference.
export function notifyLanguageChange(language) {
  if (typeof window === "undefined") return;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", language);
  }
  window.dispatchEvent(
    new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: language })
  );
}
