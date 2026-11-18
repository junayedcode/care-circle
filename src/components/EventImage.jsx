"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DEFAULT_THUMBNAIL } from "@/lib/api";
import { useLanguage } from "@/lib/languageContext";
import { translateEventText } from "@/lib/eventLanguage";

function safeSrc(value) {
  return typeof value === "string" && value.trim()
    ? value
    : DEFAULT_THUMBNAIL;
}

// Client wrapper around next/image so a broken event thumbnail can fall back
// to the local default without changing the card markup or dimensions.
export default function EventImage({ src, alt, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(() => safeSrc(src));
  const language = useLanguage();

  useEffect(() => {
    setCurrentSrc(safeSrc(src));
  }, [src]);

  return (
    <>
      {/* Paints the fallback immediately, even if the <img> error fires before hydration. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${DEFAULT_THUMBNAIL})` }}
      />
      <Image
        {...props}
        src={currentSrc}
        alt={language === "bn" ? translateEventText(alt || "") : alt}
        onError={() => {
          if (currentSrc !== DEFAULT_THUMBNAIL) {
            setCurrentSrc(DEFAULT_THUMBNAIL);
          }
        }}
      />
    </>
  );
}
