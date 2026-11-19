"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DEFAULT_THUMBNAIL, getEventImageUrl } from "@/lib/api";
import { useLanguage } from "@/lib/languageContext";
import { getLocalizedEventValue } from "@/lib/eventLanguage";

// Shared event thumbnail renderer. A valid submitted URL is displayed exactly
// as saved; only missing/invalid/failed images use the one fixed default.
export default function EventImage({ src, alt, event, ...props }) {
  const language = useLanguage();
  const [currentSrc, setCurrentSrc] = useState(() => getEventImageUrl(src));

  useEffect(() => {
    setCurrentSrc(getEventImageUrl(src));
  }, [src]);

  const localizedAlt = event
    ? getLocalizedEventValue(event, "title", language) || alt || ""
    : alt || "";

  return (
    <>
      {/* Painted only while the fixed default is actually being displayed. */}
      {currentSrc === DEFAULT_THUMBNAIL && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${DEFAULT_THUMBNAIL})` }}
        />
      )}

      <Image
        {...props}
        src={currentSrc}
        alt={localizedAlt}
        unoptimized
        onError={() => {
          if (currentSrc !== DEFAULT_THUMBNAIL) {
            setCurrentSrc(DEFAULT_THUMBNAIL);
          }
        }}
      />
    </>
  );
}
