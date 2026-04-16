"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import CertificateFormDialog from './CertificateFormDialog'

export interface Certificate {
  _id: string;
  priority: number;
  imageUrl: string;
  imageUrlPublicId: string;
}

export default function CertificateList() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/certificate');
      const result = await res.json();
      if (res.ok && result?.data) {
        setCertificates(result.data);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    
    try {
      const res = await fetch(`/api/certificate/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchCertificates();
      } else {
         const err = await res.json();
         alert(err.error || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete certificate");
    }
  }

  if (loading) {
    return <div className="p-10 flex justify-center items-center text-muted-foreground">Loading certificates...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-lg border border-border/50">
        <p className="text-sm font-medium">You have {certificates.length} certificate(s).</p>
        <CertificateFormDialog onSuccess={() => fetchCertificates()} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certificates.map((cert) => (
          <Card key={cert._id} className="overflow-hidden flex flex-col">
            <div className="h-48 w-full relative group bg-muted overflow-hidden">
              <img src={cert.imageUrl} alt="Certificate" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center border-b border-border/40 pb-4">
                   <Badge variant="outline">Priority: {cert.priority}</Badge>
              </div>
              
              <div className="flex gap-2 justify-end">
                  <CertificateFormDialog certificateToEdit={cert} onSuccess={() => fetchCertificates()} />
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(cert._id)}>
                     <Trash2 className="w-4 h-4" />
                  </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
