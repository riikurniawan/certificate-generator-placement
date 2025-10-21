'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';
import { Card } from 'primereact/card';

const CertificateEditor = dynamic(() => import('@/components/CertificateEditor'), {
  ssr: false,
});

export default function Home() {
  return (
    <AppLayout>
      <Card className="shadow-md">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <i className="pi pi-file-edit text-primary"></i>
            Certificate Editor
          </h1>
          <p className="text-gray-600">
            Drag dan pindahkan text untuk menyesuaikan posisi pada sertifikat
          </p>
        </div>

        <CertificateEditor />
      </Card>
    </AppLayout>
  );
}
