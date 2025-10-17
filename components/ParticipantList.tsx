'use client';

import React, { useState, useRef } from 'react';
import { Stage, Layer, Text, Rect } from 'react-konva';

interface Participant {
  id: number;
  name: string;
  course: string;
  date: string;
  status: 'pending' | 'generated';
}

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: 'Hasan Syahbana',
      course: 'Kursus Pelatihan Web Development',
      date: 'Lombok, 13 Maret 2024',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Ahmad Hidayat',
      course: 'Kursus Pelatihan UI/UX Design',
      date: 'Lombok, 15 Maret 2024',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Siti Nurhaliza',
      course: 'Kursus Pelatihan Data Science',
      date: 'Lombok, 20 Maret 2024',
      status: 'pending',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    date: '',
  });

  const [previewParticipant, setPreviewParticipant] = useState<Participant | null>(null);
  const stageRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Certificate Border Component
  const CertificateBorder = () => {
    return (
      <>
        <Rect x={10} y={10} width={780} height={540} stroke="#E91E63" strokeWidth={8} cornerRadius={5} />
        <Rect x={25} y={25} width={750} height={510} stroke="#E91E63" strokeWidth={3} cornerRadius={3} />
        <Rect x={35} y={35} width={100} height={100} fill="#FCE4EC" cornerRadius={50} />
        <Rect x={665} y={35} width={100} height={100} fill="#FCE4EC" cornerRadius={50} />
        <Rect x={35} y={405} width={100} height={100} fill="#FCE4EC" cornerRadius={50} />
        <Rect x={665} y={405} width={100} height={100} fill="#FCE4EC" cornerRadius={50} />
      </>
    );
  };

  const handleAddNew = () => {
    setFormData({ name: '', course: '', date: '' });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (participant: Participant) => {
    setFormData({
      name: participant.name,
      course: participant.course,
      date: participant.date,
    });
    setEditingId(participant.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus peserta ini?')) {
      setParticipants(participants.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing
      setParticipants(
        participants.map((p) =>
          p.id === editingId
            ? { ...p, name: formData.name, course: formData.course, date: formData.date }
            : p
        )
      );
    } else {
      // Add new
      const newParticipant: Participant = {
        id: Math.max(...participants.map((p) => p.id), 0) + 1,
        name: formData.name,
        course: formData.course,
        date: formData.date,
        status: 'pending',
      };
      setParticipants([...participants, newParticipant]);
    }
    setShowForm(false);
    setFormData({ name: '', course: '', date: '' });
  };

  const handlePreview = (participant: Participant) => {
    setPreviewParticipant(participant);
  };

  const handleDownload = (participant: Participant) => {
    setPreviewParticipant(participant);
    // Wait for render then download
    setTimeout(() => {
      if (stageRef.current) {
        const uri = stageRef.current.toDataURL();
        const link = document.createElement('a');
        link.download = `sertifikat-${participant.name.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Update status
        setParticipants(
          participants.map((p) =>
            p.id === participant.id ? { ...p, status: 'generated' } : p
          )
        );
      }
    }, 100);
  };

  const handleBulkDownload = () => {
    if (confirm(`Generate ${participants.length} sertifikat?`)) {
      participants.forEach((participant, index) => {
        setTimeout(() => {
          handleDownload(participant);
        }, index * 500); // Delay each download by 500ms
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            + Tambah Peserta
          </button>
          <button
            onClick={handleBulkDownload}
            disabled={participants.length === 0}
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📥 Download Semua Sertifikat ({participants.length})
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {editingId ? 'Edit Peserta' : 'Tambah Peserta Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kursus Pelatihan
                </label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500"
                  placeholder="Masukkan nama kursus"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal Terbit
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500"
                  placeholder="Contoh: Lombok, 13 Maret 2024"
                  required
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  {editingId ? 'Update' : 'Tambah'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Participants Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">No</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Nama Peserta</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Kursus</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Tanggal</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {participants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Belum ada peserta. Klik &quot;Tambah Peserta&quot; untuk menambah data.
                  </td>
                </tr>
              ) : (
                participants.map((participant, index) => (
                  <tr
                    key={participant.id}
                    className="hover:bg-pink-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {participant.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {participant.course}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {participant.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          participant.status === 'generated'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {participant.status === 'generated' ? '✓ Generated' : '⏳ Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handlePreview(participant)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-600 transition-colors"
                          title="Preview"
                        >
                          👁️ Preview
                        </button>
                        <button
                          onClick={() => handleDownload(participant)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors"
                          title="Download"
                        >
                          📥 Download
                        </button>
                        <button
                          onClick={() => handleEdit(participant)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-600 transition-colors"
                          title="Edit"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(participant.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Preview Sertifikat - {previewParticipant.name}
              </h2>
              <button
                onClick={() => setPreviewParticipant(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="border-4 border-gray-200 rounded-lg overflow-hidden">
              <Stage width={800} height={560} ref={stageRef}>
                <Layer>
                  <Rect x={0} y={0} width={800} height={560} fill="#FFFFFF" />
                  <CertificateBorder />
                  
                  {/* Header */}
                  <Text
                    x={200}
                    y={120}
                    text="SERTIFIKAT"
                    fontSize={42}
                    fontFamily="Arial"
                    fontStyle="bold"
                    fill="#E91E63"
                    align="center"
                    width={400}
                  />
                  <Text
                    x={150}
                    y={180}
                    text="Diberikan Kepada:"
                    fontSize={20}
                    fontFamily="Arial"
                    fill="#666"
                    align="center"
                    width={500}
                  />
                  
                  {/* Participant Data */}
                  <Text
                    x={300}
                    y={250}
                    text={previewParticipant.name}
                    fontSize={32}
                    fontFamily="Arial"
                    fontStyle="bold"
                    fill="#1A1A1A"
                  />
                  <Text
                    x={220}
                    y={300}
                    text={previewParticipant.course}
                    fontSize={24}
                    fontFamily="Arial"
                    fill="#333"
                  />
                  <Text
                    x={300}
                    y={450}
                    text={previewParticipant.date}
                    fontSize={18}
                    fontFamily="Arial"
                    fill="#333"
                  />
                  
                  {/* Signature */}
                  <Text
                    x={550}
                    y={500}
                    text="Direktur Kursus,"
                    fontSize={14}
                    fontFamily="Arial"
                    fill="#666"
                  />
                </Layer>
              </Stage>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleDownload(previewParticipant)}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
              >
                📥 Download Sertifikat Ini
              </button>
              <button
                onClick={() => setPreviewParticipant(null)}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-3xl font-bold mb-2">{participants.length}</div>
          <div className="text-blue-100">Total Peserta</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-3xl font-bold mb-2">
            {participants.filter((p) => p.status === 'generated').length}
          </div>
          <div className="text-green-100">Sertifikat Generated</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-3xl font-bold mb-2">
            {participants.filter((p) => p.status === 'pending').length}
          </div>
          <div className="text-yellow-100">Pending</div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantList;
