// Bilingual event content helpers.
//
// Data contract (existing MongoDB records remain compatible):
//   title / description / location / type  -> English content
//   titleBn / descriptionBn / locationBn / typeBn -> Bengali content
//
// There is no automatic translation service configured in this project, so no
// generated or transliterated text is produced here. If a language version is
// missing, a localized placeholder is shown instead of displaying the other
// language's content as if it were a translation.

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const TRANSLATION_FALLBACKS = {
  en: "English translation not available",
  bn: "বাংলা অনুবাদ এখনো যোগ করা হয়নি",
};

const BENGALI_SCRIPT = /[\u0980-\u09FF]/;

export function toBnDigits(value) {
  return String(value ?? "").replace(/\d/g, (digit) => BN_DIGITS[Number(digit)]);
}

export function containsBengaliScript(value) {
  return typeof value === "string" && BENGALI_SCRIPT.test(value);
}

export function containsLatinLetters(value) {
  return typeof value === "string" && /[A-Za-z]/.test(value);
}

// Returns the stored value for the selected language. Never mutates the event
// and never falls back to a machine-generated translation.
export function getLocalizedEventValue(
  event,
  field,
  language = "en",
  missingFallback
) {
  const originalValue = event?.[field];
  const original = originalValue === null || originalValue === undefined
    ? ""
    : String(originalValue);
  const localizedValue = event?.[`${field}Bn`];
  const localized = typeof localizedValue === "string" ? localizedValue.trim() : "";
  const originalHasBengali = containsBengaliScript(original);

  if (language === "bn") {
    if (localized) return localizedValue;
    // Legacy records may contain Bengali text in the old canonical field.
    // Keep showing that real content instead of losing it, but never invent a
    // Bengali version for an English-only record.
    if (originalHasBengali && original.trim()) return original;
    return missingFallback ?? TRANSLATION_FALLBACKS.bn;
  }

  // English mode must never display Bengali content from a legacy record.
  if (original.trim() && !originalHasBengali) return original;
  return missingFallback ?? TRANSLATION_FALLBACKS.en;
}

export function formatLocalizedDate(value, language = "en") {
  if (!value) return "";
  const original = String(value);
  if (language !== "bn") return original;

  const date = new Date(original);
  if (Number.isNaN(date.getTime())) return toBnDigits(original);

  const day = toBnDigits(date.getDate());
  const month = BN_MONTHS[date.getMonth()];
  const year = toBnDigits(date.getFullYear());
  return `${day} ${month} ${year}`;
}
