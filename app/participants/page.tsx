'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';
import { Card } from 'primereact/card';

const ParticipantList = dynamic(() => import('@/components/ParticipantList'), {
  ssr: false,
});

export default function ParticipantsPage() {
  return (
    <AppLayout>
      <Card className="shadow-md">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <i className="pi pi-users text-primary"></i>
            Daftar Peserta Kursus
          </h1>
          <p className="text-gray-600">
            Kelola data peserta dan generate sertifikat
          </p>
        </div>

        {/* Participant List Component */}
        <ParticipantList />
      </Card>
    </AppLayout>
  );
}
