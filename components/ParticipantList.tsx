'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Rect, Image as KonvaImage } from 'react-konva';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Participant {
  id: number;
  name: string;
  course: string;
  date: string;
}

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: 'Hasan Syahbana',
      course: 'Kursus Pelatihan Web Development',
      date: 'Lombok, 13 Maret 2024',
    },
    {
      id: 2,
      name: 'Ahmad Hidayat',
      course: 'Kursus Pelatihan UI/UX Design',
      date: 'Lombok, 15 Maret 2024',
    },
    {
      id: 3,
      name: 'Siti Nurhaliza',
      course: 'Kursus Pelatihan Data Science',
      date: 'Lombok, 20 Maret 2024',
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Background image states
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');
  const [showBorder, setShowBorder] = useState<boolean>(true);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 560 });
  const [zoom, setZoom] = useState<number>(1);

  // Load background image when URL changes
  useEffect(() => {
    if (backgroundUrl) {
      const img = new window.Image();
      img.src = backgroundUrl;
      img.onload = () => {
        setBackgroundImage(img);
        
        // Use original image dimensions without any scaling
        const width = img.width;
        const height = img.height;
        
        // Set canvas size to match image dimensions exactly
        setCanvasSize({ width, height });
      };
    } else {
      setBackgroundImage(null);
      // Reset to default size when no background
      setCanvasSize({ width: 800, height: 560 });
    }
  }, [backgroundUrl]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = () => {
    setBackgroundUrl('');
    setBackgroundImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Certificate Border Component
  const CertificateBorder = ({ width, height }: { width: number; height: number }) => {
    const margin = 10;
    const innerMargin = 25;
    const ornamentSize = 100;

    return (
      <>
        <Rect x={margin} y={margin} width={width - margin * 2} height={height - margin * 2} stroke="#E91E63" strokeWidth={8} cornerRadius={5} />
        <Rect x={innerMargin} y={innerMargin} width={width - innerMargin * 2} height={height - innerMargin * 2} stroke="#E91E63" strokeWidth={3} cornerRadius={3} />
        <Rect x={35} y={35} width={ornamentSize} height={ornamentSize} fill="#FCE4EC" cornerRadius={50} />
        <Rect x={width - 35 - ornamentSize} y={35} width={ornamentSize} height={ornamentSize} fill="#FCE4EC" cornerRadius={50} />
        <Rect x={35} y={height - 35 - ornamentSize} width={ornamentSize} height={ornamentSize} fill="#FCE4EC" cornerRadius={50} />
        <Rect x={width - 35 - ornamentSize} y={height - 35 - ornamentSize} width={ornamentSize} height={ornamentSize} fill="#FCE4EC" cornerRadius={50} />
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
        // If there's a background image, use its original dimensions for export
        let pixelRatio = 1;
        if (backgroundImage && backgroundImage.width > 0) {
          // Calculate pixel ratio to export at original background image size
          pixelRatio = backgroundImage.width / canvasSize.width;
        }

        const uri = stageRef.current.toDataURL({ pixelRatio });
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
      {/* Background Template Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i className="pi pi-cog" />
          Pengaturan Template
        </h3>
        
        <div className="flex flex-wrap gap-3 items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="background-upload-participants"
          />
          
          <label
            htmlFor="background-upload-participants"
            className="block"
          >
            <Button
              label="Upload Background Template"
              icon="pi pi-upload"
              severity="info"
              className="w-full"
              onClick={() => document.getElementById('background-upload-participants')?.click()}
            />
          </label>
          
          {backgroundUrl && (
            <Button
              label="Hapus Background"
              icon="pi pi-trash"
              severity="danger"
              className="w-full"
              onClick={handleRemoveBackground}
            />
          )}

          <div className="flex items-center gap-2 mt-3">
            <Checkbox
              inputId="show-border-participants"
              checked={showBorder}
              onChange={(e) => setShowBorder(e.checked || false)}
            />
            <label htmlFor="show-border-participants" className="text-sm text-gray-700 cursor-pointer">
              Tampilkan Border & Ornamen
            </label>
          </div>

          {backgroundUrl && (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1">
                <i className="pi pi-check-circle" />
                Background Active
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-4">
          <Button
            label="Tambah Peserta"
            icon="pi pi-plus"
            severity="success"
            onClick={handleAddNew}
          />
          <Button
            label={`Download Semua Sertifikat (${participants.length})`}
            icon="pi pi-download"
            severity="info"
            onClick={handleBulkDownload}
            disabled={participants.length === 0}
          />
        </div>
      </div>

      {/* Form Modal */}
      <Dialog
        header={editingId ? 'Edit Peserta' : 'Tambah Peserta Baru'}
        visible={showForm}
        style={{ width: '450px' }}
        onHide={() => setShowForm(false)}
        draggable={false}
        resizable={false}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <InputText
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kursus Pelatihan
            </label>
            <InputText
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full"
              placeholder="Masukkan nama kursus"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal Terbit
            </label>
            <InputText
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full"
              placeholder="Contoh: Lombok, 13 Maret 2024"
              required
            />
          </div>
          <div className="flex gap-3 mt-6">
            <Button
              type="submit"
              label={editingId ? 'Update' : 'Tambah'}
              severity="success"
              className="flex-1"
            />
            <Button
              type="button"
              label="Batal"
              severity="secondary"
              className="flex-1"
              onClick={() => setShowForm(false)}
            />
          </div>
        </form>
      </Dialog>

      {/* Participants Table */}
      <div className="card">
        <DataTable
          value={participants}
          stripedRows
          showGridlines
          emptyMessage="Belum ada peserta. Klik 'Tambah Peserta' untuk menambah data."
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            header="No"
            body={(data, options) => options.rowIndex + 1}
            style={{ width: '5rem' }}
          />
          <Column
            field="name"
            header="Nama Peserta"
            sortable
            style={{ minWidth: '12rem' }}
          />
          <Column
            field="course"
            header="Kursus"
            sortable
            style={{ minWidth: '15rem' }}
          />
          <Column
            field="date"
            header="Tanggal"
            sortable
            style={{ minWidth: '10rem' }}
          />
          <Column
            header="Aksi"
            body={(participant: Participant) => (
              <div className="flex items-center justify-center gap-2">
                <Button
                  icon="pi pi-eye"
                  severity="info"
                  size="small"
                  tooltip="Preview"
                  tooltipOptions={{ position: 'top' }}
                  onClick={() => handlePreview(participant)}
                />
                <Button
                  icon="pi pi-download"
                  severity="success"
                  size="small"
                  tooltip="Download"
                  tooltipOptions={{ position: 'top' }}
                  onClick={() => handleDownload(participant)}
                />
                <Button
                  icon="pi pi-pencil"
                  severity="warning"
                  size="small"
                  tooltip="Edit"
                  tooltipOptions={{ position: 'top' }}
                  onClick={() => handleEdit(participant)}
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  size="small"
                  tooltip="Delete"
                  tooltipOptions={{ position: 'top' }}
                  onClick={() => handleDelete(participant.id)}
                />
              </div>
            )}
            style={{ width: '15rem', textAlign: 'center' }}
          />
        </DataTable>
      </div>

      {/* Preview Modal */}
      <Dialog
        header={previewParticipant ? `Preview Sertifikat - ${previewParticipant.name}` : 'Preview'}
        visible={!!previewParticipant}
        style={{ width: '90vw', maxWidth: '1200px' }}
        onHide={() => setPreviewParticipant(null)}
        draggable={false}
        resizable={false}
        maximizable
      >
        {previewParticipant && (
          <>
            {/* Zoom Controls */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Button
                icon="pi pi-search-minus"
                onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
                severity="secondary"
                outlined
                tooltip="Zoom Out"
                tooltipOptions={{ position: 'top' }}
              />
              <span className="px-3 py-1 bg-white rounded border border-gray-200 min-w-[70px] text-center font-semibold text-gray-700 text-sm">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                icon="pi pi-search-plus"
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                severity="secondary"
                outlined
                tooltip="Zoom In"
                tooltipOptions={{ position: 'top' }}
              />
              <Button
                label="Reset"
                onClick={() => setZoom(1)}
                severity="info"
                tooltip="Reset Zoom"
                tooltipOptions={{ position: 'top' }}
              />
            </div>

            <div className="border-4 border-gray-200 rounded-lg overflow-auto max-h-[600px]">
              <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
                <Stage width={canvasSize.width} height={canvasSize.height} ref={stageRef}>
                <Layer>
                  <Rect x={0} y={0} width={canvasSize.width} height={canvasSize.height} fill="#FFFFFF" />
                  
                  {/* Background Image (if uploaded) */}
                  {backgroundImage && (
                    <KonvaImage
                      x={0}
                      y={0}
                      width={canvasSize.width}
                      height={canvasSize.height}
                      image={backgroundImage}
                    />
                  )}
                  
                  {/* Border (optional) */}
                  {showBorder && <CertificateBorder width={canvasSize.width} height={canvasSize.height} />}
                  
                  {/* Header */}
                  <Text
                    x={canvasSize.width / 2 - 200}
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
                    x={canvasSize.width / 2 - 250}
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
                    x={150}
                    y={250}
                    text={previewParticipant.name}
                    width={500}
                    align="center"
                    fontSize={32}
                    fontFamily="Arial"
                    fontStyle="bold"
                    fill="#1A1A1A"
                  />
                  <Text
                    x={canvasSize.width / 2 - 250}
                    y={300}
                    text={previewParticipant.course}
                    width={500}
                    align="center"
                    fontSize={24}
                    fontFamily="Arial"
                    fill="#333"
                  />
                  <Text
                    x={canvasSize.width / 2 - 150}
                    y={canvasSize.height - 110}
                    text={previewParticipant.date}
                    width={300}
                    align="center"
                    fontSize={18}
                    fontFamily="Arial"
                    fill="#333"
                  />
                  
                  {/* Signature */}
                  <Text
                    x={canvasSize.width - 250}
                    y={canvasSize.height - 60}
                    text="Direktur Kursus,"
                    fontSize={14}
                    fontFamily="Arial"
                    fill="#666"
                  />
                </Layer>
              </Stage>
              </div>
            </div>
            <div className="flex mt-4">
              <Button
                label="Download Sertifikat Ini"
                icon="pi pi-download"
                severity="success"
                className="w-full"
                onClick={() => handleDownload(previewParticipant)}
              />
            </div>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default ParticipantList;
