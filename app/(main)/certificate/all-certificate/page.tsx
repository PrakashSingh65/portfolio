import React from "react";
import { ConnectDB } from "../../../../lib/db";
import Certificate, {
  ICertificate,
} from "../../../../models/certificate.model";
import CertificateGallery from "@/components/CertificateGallery";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Certificates",
  description: "Browse verified industry certifications and achievements earned by Prakash Singh.",
};

export const revalidate = 60;

async function fetchCertificates(): Promise<ICertificate[]> {
  try {
    await ConnectDB();
    const certificates = await Certificate.find()
      .sort({ priority: 1 })
      .lean<ICertificate[]>();
    return certificates.map((cert) => ({
      ...cert,
      _id: cert._id?.toString(),
    }));
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}

export default async function AllCertificatePage() {
  const certificates = await fetchCertificates();

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div>
        <Link
          href="/certificate"
          aria-label="Back to Featured Certificates"
          className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium min-h-[44px]"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to Featured
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          All Certificates
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 font-medium max-w-lg text-sm md:text-base">
          Verified certifications, course completions, and technical credentials.
        </p>
      </div>
      <Separator />
      <CertificateGallery certificates={certificates} />
    </div>
  );
}