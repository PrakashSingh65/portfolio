import React from "react";
import { getCertificatesData } from "@/lib/data";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export const revalidate = 60;

const CertificateGallery = dynamic(
  () => import("@/components/CertificateGallery"),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-2xl" />
        ))}
      </div>
    ),
  }
);

export default async function CertificatePage() {
  const certificates = await getCertificatesData(3);

  return (
    <section id="certificates" aria-label="Certifications & Credentials" className="container mx-auto px-4 py-8">
      <div className="flex flex-col mb-6">
        <p className="text-sm font-semibold dark:text-emerald-400 text-emerald-600 uppercase tracking-wider">
          Featured
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Certificates
        </h2>
      </div>

      <CertificateGallery certificates={certificates} limit={3} />

      <div className="flex justify-center w-full mt-12 mb-6">
        <Link href="/certificate/all-certificate" aria-label="Browse all earned certificates">
          <Button variant="outline" className="hover:bg-emerald-50 dark:hover:bg-zinc-800 cursor-pointer min-h-[44px]">
            Show all Certificates <MoveRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </section>
  );
}