'use client';

import CertificateEditor from '@/components/CertificateEditor';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Certificate Editor
            </h1>
            <p className="text-gray-600">
              Drag dan pindahkan text untuk menyesuaikan posisi pada sertifikat
            </p>
          </div>
          <Link
            href="/participants"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            📋 Daftar Peserta →
          </Link>
        </div>

        <CertificateEditor />
      </div>
    </main>
  );
}
