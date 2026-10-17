"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import CertificateCard from "./CertificateCard";
import { ICertificate } from "../models/certificate.model";

interface CertificateGalleryProps {
  certificates: ICertificate[];
  limit?: number;
}

export default function CertificateGallery({
  certificates,
  limit,
}: CertificateGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const displayedCertificates = limit
    ? certificates.slice(0, limit)
    : certificates;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCertificates.map((cert) => (
          <CertificateCard
            key={cert._id}
            imageUrl={cert.imageUrl}
            onClick={() => setSelectedId(cert._id as string)}
            layoutId={cert._id as string}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Certificate Preview"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              layoutId={selectedId}
              className="relative w-full max-w-5xl z-10 flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close certificate preview"
                className="absolute -top-12 right-0 z-20 p-2 text-white hover:text-zinc-300 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X size={32} aria-hidden="true" />
              </button>

              <div className="relative w-full h-[80vh]">
                {(() => {
                  const selectedCert = certificates.find(
                    (c) => c._id === selectedId
                  );
                  return selectedCert ? (
                    <Image
                      src={selectedCert.imageUrl}
                      alt="Certificate full view"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority
                    />
                  ) : null;
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}