'use client';

import ParticipantList from '@/components/ParticipantList';
import Link from 'next/link';

export default function ParticipantsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Daftar Peserta Kursus
            </h1>
            <p className="text-gray-600">
              Kelola data peserta dan generate sertifikat
            </p>
          </div>
          <Link
            href="/"
            className="bg-white text-gray-700 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
          >
            ← Kembali ke Editor
          </Link>
        </div>

        {/* Participant List Component */}
        <ParticipantList />
      </div>
    </main>
  );
}
