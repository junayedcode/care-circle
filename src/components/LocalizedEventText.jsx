"use client";

import { useLanguage } from "@/lib/languageContext";
import {
  formatLocalizedDate,
  getLocalizedEventValue,
} from "@/lib/eventLanguage";

// Renders a single localizable event value as a text node, so using it does not
// add wrappers or change the existing card/detail layouts.
export default function LocalizedEventText({ value, bnValue, field = "text" }) {
  const language = useLanguage();

  if (field === "date") {
    if (language === "bn") {
      return bnValue || formatLocalizedDate(value, "bn");
    }
    return value ?? "";
  }

  return getLocalizedEventValue(
    { [field]: value, [`${field}Bn`]: bnValue },
    field,
    language
  );
}
