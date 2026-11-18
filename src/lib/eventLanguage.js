// Bilingual event content helpers.
//
// Event records live in MongoDB and many existing records contain only English
// text. These helpers let the UI show Bengali without overwriting or losing the
// original fields: records may optionally carry titleBn/descriptionBn/
// locationBn/typeBn, and known demo content is mapped to natural Bengali here.
// Unknown text is rendered in Bengali script so no English is left visible.

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

// Natural Bengali for the demo events currently stored in the database.
const DEMO_EVENT_TRANSLATIONS = {
  "corrupti laudantium": {
    title: "দুর্নীতির প্রশংসা",
    description:
      "সমাজে দুর্নীতির বিরুদ্ধে সচেতনতা তৈরি এবং স্বচ্ছতার পক্ষে কমিউনিটিকে একত্রিত করার একটি উদ্যোগ।",
  },
  "qui ullamco optio t": {
    title: "কারণ ও সুযোগ",
    description:
      "প্রত্যেকের জন্য উপযুক্ত সুযোগ খুঁজে দেওয়া এবং সেই সুযোগকে কাজে রূপ দেওয়ার একটি সামাজিক প্রচেষ্টা।",
  },
  "cupiditate totam exp": {
    title: "লোভ ও সমর্পণ",
    description:
      "ব্যক্তিগত স্বার্থের ঊর্ধ্বে উঠে সমাজের কল্যাণে নিজেদের সমর্পণ করার বার্তা ছড়িয়ে দেওয়া।",
  },
  "eum dicta expedita d": {
    title: "তার কথা ও কর্ম",
    description:
      "কথা ও কাজের মিল রেখে সমাজসেবার মাধ্যমে অন্যদের অনুপ্রাণিত করার এক দিন।",
  },
  "mollitia sint eum ex": {
    title: "কোমলতা ও সহানুভূতি",
    description:
      "কোমলতা ও সহানুভূতির মাধ্যমে আশেপাশের মানুষের পাশে দাঁড়াও এবং একটি দয়ালু কমিউনিটি গড়ে তোলো।",
  },
};

// Common event vocabulary plus the pseudo-Latin words used by the demo data.
const WORD_TRANSLATIONS = {
  // Event / platform vocabulary
  donation: "দান",
  donations: "দান",
  drive: "অভিযান",
  drives: "অভিযান",
  community: "কমিউনিটি",
  volunteer: "স্বেচ্ছাসেবক",
  volunteers: "স্বেচ্ছাসেবক",
  volunteering: "স্বেচ্ছাসেবা",
  event: "ইভেন্ট",
  events: "ইভেন্ট",
  initiative: "উদ্যোগ",
  initiatives: "উদ্যোগ",
  cleanup: "পরিষ্কার",
  plantation: "বৃক্ষরোপণ",
  winter: "শীতকালীন",
  relief: "সাহায্য",
  food: "খাদ্য",
  distribution: "বিতরণ",
  health: "স্বাস্থ্য",
  camp: "শিবির",
  organizer: "আয়োজক",
  location: "অবস্থান",
  venue: "স্থান",
  date: "তারিখ",
  join: "যোগদান",
  joined: "যোগদানকৃত",
  social: "সামাজিক",
  service: "সেবা",
  development: "উন্নয়ন",
  impact: "প্রভাব",
  support: "সমর্থন",
  help: "সাহায্য",
  hands: "হাত",
  together: "একসাথে",
  dhaka: "ঢাকা",
  park: "পার্ক",
  central: "কেন্দ্রীয়",
  // Demo / lorem vocabulary
  corrupti: "দুর্নীতি",
  laudantium: "প্রশংসা",
  qui: "যে",
  ullamco: "অনেক",
  optio: "পছন্দ",
  cupiditate: "লোভ",
  totam: "সম্পূর্ণ",
  expedita: "স্পষ্ট",
  eum: "তাকে",
  dicta: "কথা",
  mollitia: "কোমলতা",
  sint: "এবং",
  ex: "থেকে",
  et: "ও",
  est: "হয়",
  sed: "কিন্তু",
  ut: "যাতে",
  in: "এ",
  ad: "প্রতি",
  a: "একটি",
  the: "এই",
  and: "ও",
  for: "জন্য",
  with: "সাথে",
  at: "এ",
  will: "করবে",
  activities: "কার্যক্রম",
  this: "এই",
  our: "আমাদের",
  // Common lorem-ipsum vocabulary used by generated demo descriptions
  lorem: "লোরেম",
  ipsum: "ইপসাম",
  dolor: "বেদনা",
  sit: "বসে",
  amet: "আমেত",
  consectetur: "অনুসরণ",
  adipiscing: "অনুসরণ",
  elit: "এলিট",
  do: "করি",
  eiusmod: "এইরকম",
  tempor: "সময়",
  incididunt: "ঘটনা",
  labore: "কাজ",
  dolore: "বেদনা",
  magna: "বড়",
  aliqua: "কিছু",
  enim: "প্রকৃতপক্ষে",
  minim: "ন্যূনতম",
  veniam: "অনুমতি",
  quis: "কে",
  nostrud: "আমাদের",
  exercitation: "অনুশীলন",
  laboris: "শ্রম",
  nisi: "নিশ্চয়",
  aliquip: "কিছু",
  ea: "এই",
  commodo: "সুবিধা",
  consequat: "ফলাফল",
  duis: "এই",
  aute: "গান",
  irure: "এই",
  reprehenderit: "প্রতিনিধি",
  voluptate: "আনন্দ",
  velit: "ব্যাপক",
  esse: "হয়",
  cillum: "এই",
  fugiat: "পলায়ন",
  nulla: "কোনো",
  pariatur: "অংশ",
  excepteur: "ব্যতীত",
  occaecat: "সুযোগ",
  cupidatat: "লোভ",
  non: "না",
  proident: "পেশাদার",
  sunt: "হয়",
  culpa: "দোষ",
  officia: "দায়িত্ব",
  deserunt: "সম্মান",
  mollit: "কোমল",
  anim: "প্রাণ",
  laborum: "শ্রম",
};

const BN_CONSONANTS = {
  b: "ব",
  c: "ক",
  d: "দ",
  f: "ফ",
  g: "গ",
  h: "হ",
  j: "জ",
  k: "ক",
  l: "ল",
  m: "ম",
  n: "ন",
  p: "প",
  q: "ক",
  r: "র",
  s: "স",
  t: "ত",
  v: "ভ",
  w: "ও",
  x: "ক্স",
  y: "য়",
  z: "জ",
};

const BN_VOWEL_SIGNS = { a: "া", e: "ে", i: "ি", o: "ো", u: "ু" };
const BN_INDEPENDENT_VOWELS = { a: "আ", e: "এ", i: "ই", o: "ও", u: "উ" };

export function toBnDigits(value) {
  return String(value ?? "").replace(/\d/g, (digit) => BN_DIGITS[Number(digit)]);
}

function transliterate(token) {
  let result = "";
  let previousWasConsonant = false;

  for (const character of token.toLowerCase()) {
    if (BN_VOWEL_SIGNS[character]) {
      result +=
        previousWasConsonant
          ? BN_VOWEL_SIGNS[character]
          : BN_INDEPENDENT_VOWELS[character];
      previousWasConsonant = false;
    } else if (BN_CONSONANTS[character]) {
      result += BN_CONSONANTS[character];
      previousWasConsonant = true;
    } else if (/\d/.test(character)) {
      result += BN_DIGITS[Number(character)];
      previousWasConsonant = false;
    } else {
      result += character;
      previousWasConsonant = false;
    }
  }

  return result;
}

function translateToken(token) {
  // Brand names, URLs and emails must be kept as-is.
  if (/^https?:\/\//i.test(token) || /^www\./i.test(token) || token.includes("@")) {
    return token;
  }
  if (/^carecircle$/i.test(token)) return "CareCircle";

  const leading = token.match(/^[^A-Za-z0-9]+/)?.[0] || "";
  const trailing = token.match(/[^A-Za-z0-9]+$/)?.[0] || "";
  const core = token.slice(leading.length, token.length - trailing.length);
  if (!core) return token;

  const normalized = core.toLowerCase();
  const known = WORD_TRANSLATIONS[normalized];
  const translated = known || transliterate(core);

  return `${leading}${translated}${trailing}`;
}

// Translate arbitrary event text while preserving URLs, emails and spacing.
export function translateEventText(text) {
  if (text === null || text === undefined) return "";
  const original = String(text);
  if (!original.trim()) return original;

  const normalized = original.trim().toLowerCase();
  const exact = DEMO_EVENT_TRANSLATIONS[normalized];
  if (exact) {
    return (
      exact.title ||
      exact.description ||
      exact.location ||
      original
    );
  }

  // Truncated demo titles (e.g. "Qui ullamco optio t") still match by prefix.
  const prefixMatch = Object.entries(DEMO_EVENT_TRANSLATIONS).find(
    ([key]) => key.length > 8 && normalized.startsWith(key)
  );
  if (prefixMatch) {
    return prefixMatch[1].title || original;
  }

  return original
    .split(/(\s+)/)
    .map((part) => (/^\s+$/.test(part) ? part : translateToken(part)))
    .join("");
}

// Read the Bengali field first when a record has one; never mutate the record.
export function getLocalizedEventValue(event, field, language = "en") {
  const original = event?.[field] ?? "";
  if (language !== "bn") return original;

  const localized = event?.[`${field}Bn`];
  if (typeof localized === "string" && localized.trim()) return localized;

  return translateEventText(original);
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
