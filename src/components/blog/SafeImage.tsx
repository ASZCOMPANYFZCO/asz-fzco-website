"use client";

import { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}

export function SafeImage({ src, alt, sizes, priority }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        onError={() => setError(true)}
      />
    </div>
  );
}
