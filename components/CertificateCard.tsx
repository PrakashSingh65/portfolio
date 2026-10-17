"use client";

import React from "react";
import Image from "next/image";

interface CertificateCardProps {
  imageUrl: string;
  onClick?: () => void;
  layoutId?: string;
}

export default function CertificateCard({
  imageUrl,
  onClick,
}: CertificateCardProps) {
  return (
    <div className="h-full transition-transform duration-300 hover:scale-[1.02]">
      <button
        type="button"
        onClick={onClick}
        aria-label="View certificate image full screen"
        className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden cursor-pointer border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 block text-left"
      >
        <Image
          src={imageUrl}
          alt="Certificate credentials"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </button>
    </div>
  );
}