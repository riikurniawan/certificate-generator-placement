'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Rect, Image as KonvaImage } from 'react-konva';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  draggable: boolean;
}

const CertificateBorder = ({ width, height }: { width: number; height: number }) => {
  const margin = 10;
  const innerMargin = 25;
  const ornamentSize = 100;
  
  return (
    <>
      {/* Border Luar Pink */}
      <Rect
        x={margin}
        y={margin}
        width={width - margin * 2}
        height={height - margin * 2}
        stroke="#E91E63"
        strokeWidth={8}
        cornerRadius={5}
      />
      {/* Border Dalam Pink */}
      <Rect
        x={innerMargin}
        y={innerMargin}
        width={width - innerMargin * 2}
        height={height - innerMargin * 2}
        stroke="#E91E63"
        strokeWidth={3}
        cornerRadius={3}
      />
      {/* Ornamen Pink - Top Left */}
      <Rect
        x={35}
        y={35}
        width={ornamentSize}
        height={ornamentSize}
        fill="#FCE4EC"
        cornerRadius={50}
      />
      {/* Ornamen Pink - Top Right */}
      <Rect
        x={width - 35 - ornamentSize}
        y={35}
        width={ornamentSize}
        height={ornamentSize}
        fill="#FCE4EC"
        cornerRadius={50}
      />
      {/* Ornamen Pink - Bottom Left */}
      <Rect
        x={35}
        y={height - 35 - ornamentSize}
        width={ornamentSize}
        height={ornamentSize}
        fill="#FCE4EC"
        cornerRadius={50}
      />
      {/* Ornamen Pink - Bottom Right */}
      <Rect
        x={width - 35 - ornamentSize}
        y={height - 35 - ornamentSize}
        width={ornamentSize}
        height={ornamentSize}
        fill="#FCE4EC"
        cornerRadius={50}
      />
    </>
  );
};

const CertificateEditor: React.FC = () => {
  const stageRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [textElements, setTextElements] = useState<TextElement[]>([
    {
      id: 'nama',
      text: 'Hasan Syahbana',
      x: 150,
      y: 250,
      fontSize: 32,
      fontFamily: 'Arial',
      draggable: true,
    },
    {
      id: 'kursus',
      text: 'Kursus Pelatihan Web Development',
      x: 150,
      y: 300,
      fontSize: 24,
      fontFamily: 'Arial',
      draggable: true,
    },
    {
      id: 'tanggal',
      text: 'Lombok, 13 Maret 2024',
      x: 250,
      y: 450,
      fontSize: 18,
      fontFamily: 'Arial',
      draggable: true,
    },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState({
    nama: 'Hasan Syahbana',
    kursus: 'Kursus Pelatihan Web Development',
    tanggal: 'Lombok, 13 Maret 2024',
  });

  // Background image states
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');
  const [showBorder, setShowBorder] = useState<boolean>(true);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 560 });
  const [zoom, setZoom] = useState<number>(1);

  // Auto-center text elements when canvas size changes
  useEffect(() => {
    setTextElements((prev) => [
      { ...prev[0], x: canvasSize.width / 2 - 250 },
      { ...prev[1], x: canvasSize.width / 2 - 250 },
      { ...prev[2], x: canvasSize.width / 2 - 150, y: canvasSize.height - 110 },
    ]);
  }, [canvasSize]);

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

  const handleDragEnd = (id: string, e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const newElements = textElements.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return el;
    });
    setTextElements(newElements);
  };

  const handleInputChange = (id: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
    const newElements = textElements.map((el) => {
      if (el.id === id) {
        return { ...el, text: value };
      }
      return el;
    });
    setTextElements(newElements);
  };

  const exportImage = () => {
    if (stageRef.current) {
      // If there's a background image, use its original dimensions for export
      let pixelRatio = 1;
      if (backgroundImage && backgroundImage.width > 0) {
        // Calculate pixel ratio to export at original background image size
        pixelRatio = backgroundImage.width / canvasSize.width;
      }
      
      const uri = stageRef.current.toDataURL({ pixelRatio });
      const link = document.createElement('a');
      link.download = 'sertifikat.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-white p-8 rounded-lg shadow-xl">
      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden">
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
          <span className="px-4 py-2 bg-white rounded border border-gray-200 min-w-[80px] text-center font-semibold text-gray-700">
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
            className="ml-2"
            tooltip="Reset Zoom"
            tooltipOptions={{ position: 'top' }}
          />
        </div>

        <div className="bg-white border-4 border-gray-200 rounded-lg overflow-auto shadow-lg max-h-[700px]">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
            <Stage
              width={canvasSize.width}
              height={canvasSize.height}
              ref={stageRef}
              className="cursor-move"
            >
            <Layer>
              {/* Background - White or Image */}
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
              
              {/* Border Sertifikat (optional) */}
              {showBorder && <CertificateBorder width={canvasSize.width} height={canvasSize.height} />}

              {/* Header Text */}
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

              {/* Draggable Text Elements */}
              {textElements.map((element) => (
                <Text
                  key={element.id}
                  id={element.id}
                  text={element.text}
                  x={element.x}
                  y={element.y}
                  width={500}
                  align="center"
                  fontSize={element.fontSize}
                  fontFamily={element.fontFamily}
                  fontStyle={element.id === 'nama' ? 'bold' : 'normal'}
                  fill={element.id === 'nama' ? '#1A1A1A' : '#333'}
                  draggable={element.draggable}
                  onDragEnd={(e) => handleDragEnd(element.id, e)}
                  onClick={() => setSelectedId(element.id)}
                  onTap={() => setSelectedId(element.id)}
                  shadowColor={selectedId === element.id ? '#E91E63' : 'transparent'}
                  shadowBlur={selectedId === element.id ? 10 : 0}
                  shadowOpacity={selectedId === element.id ? 0.5 : 0}
                />
              ))}

              {/* Signature Label */}
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
      </div>

      {/* Control Panel */}
      <div className="lg:w-80 space-y-6">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Edit Sertifikat
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Klik dan drag text pada canvas untuk mengubah posisi
          </p>

          <div className="space-y-4">
            {/* Input Nama */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Penerima
              </label>
              <InputText
                value={inputValues.nama}
                onChange={(e) => handleInputChange('nama', e.target.value)}
                className="w-full"
                placeholder="Masukkan nama"
              />
            </div>

            {/* Input Kursus */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kursus Pelatihan
              </label>
              <InputText
                value={inputValues.kursus}
                onChange={(e) => handleInputChange('kursus', e.target.value)}
                className="w-full"
                placeholder="Masukkan nama kursus"
              />
            </div>

            {/* Input Tanggal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tanggal Terbit
              </label>
              <InputText
                value={inputValues.tanggal}
                onChange={(e) => handleInputChange('tanggal', e.target.value)}
                className="w-full"
                placeholder="Masukkan tanggal"
              />
            </div>
          </div>

          {/* Background Upload Section */}
          <div className="mt-6 pt-6 border-t-2 border-pink-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Background Template
            </label>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="background-upload"
            />
            
            <div className="space-y-2">
              <label
                htmlFor="background-upload"
                className="block"
              >
                <Button
                  label="Upload Background"
                  icon="pi pi-upload"
                  severity="info"
                  className="w-full"
                  onClick={() => document.getElementById('background-upload')?.click()}
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

              {/* Toggle Border */}
              <div className="flex items-center gap-2 my-3">
                <Checkbox
                  inputId="show-border"
                  checked={showBorder}
                  onChange={(e) => setShowBorder(e.checked || false)}
                />
                <label htmlFor="show-border" className="text-sm text-gray-700 cursor-pointer">
                  Tampilkan Border & Ornamen
                </label>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <Button
            label="Download Sertifikat"
            icon="pi pi-download"
            severity="success"
            className="w-full mt-6"
            onClick={exportImage}
          />

          {/* Info */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>Tips:</strong> Klik pada text di canvas untuk memilihnya, kemudian drag untuk memindahkan posisi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateEditor;
