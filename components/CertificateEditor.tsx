'use client';

import React, { useState, useRef } from 'react';
import { Stage, Layer, Text, Rect } from 'react-konva';

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  draggable: boolean;
}

const CertificateBorder = () => {
  return (
    <>
      {/* Border Luar Pink */}
      <Rect
        x={10}
        y={10}
        width={780}
        height={540}
        stroke="#E91E63"
        strokeWidth={8}
        cornerRadius={5}
      />
      {/* Border Dalam Pink */}
      <Rect
        x={25}
        y={25}
        width={750}
        height={510}
        stroke="#E91E63"
        strokeWidth={3}
        cornerRadius={3}
      />
      {/* Ornamen Pink - Top Left */}
      <Rect
        x={35}
        y={35}
        width={100}
        height={100}
        fill="#FCE4EC"
        cornerRadius={50}
      />
      {/* Ornamen Pink - Top Right */}
      <Rect
        x={665}
        y={35}
        width={100}
        height={100}
        fill="#FCE4EC"
        cornerRadius={50}
      />
      {/* Ornamen Pink - Bottom Left */}
      <Rect
        x={35}
        y={405}
        width={100}
        height={100}
        fill="#FCE4EC"
        cornerRadius={50}
      />
      {/* Ornamen Pink - Bottom Right */}
      <Rect
        x={665}
        y={405}
        width={100}
        height={100}
        fill="#FCE4EC"
        cornerRadius={50}
      />
    </>
  );
};

const CertificateEditor: React.FC = () => {
  const stageRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [textElements, setTextElements] = useState<TextElement[]>([
    {
      id: 'nama',
      text: 'Hasan Syahbana',
      x: 300,
      y: 250,
      fontSize: 32,
      fontFamily: 'Arial',
      draggable: true,
    },
    {
      id: 'kursus',
      text: 'Kursus Pelatihan Web Development',
      x: 220,
      y: 300,
      fontSize: 24,
      fontFamily: 'Arial',
      draggable: true,
    },
    {
      id: 'tanggal',
      text: 'Lombok, 13 Maret 2024',
      x: 300,
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
      const uri = stageRef.current.toDataURL();
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
      <div className="flex-1">
        <div className="bg-white border-4 border-gray-200 rounded-lg overflow-hidden shadow-lg">
          <Stage
            width={800}
            height={560}
            ref={stageRef}
            className="cursor-move"
          >
            <Layer>
              {/* Background */}
              <Rect x={0} y={0} width={800} height={560} fill="#FFFFFF" />
              
              {/* Border Sertifikat */}
              <CertificateBorder />

              {/* Header Text */}
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

              {/* Draggable Text Elements */}
              {textElements.map((element) => (
                <Text
                  key={element.id}
                  id={element.id}
                  text={element.text}
                  x={element.x}
                  y={element.y}
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
              <input
                type="text"
                value={inputValues.nama}
                onChange={(e) => handleInputChange('nama', e.target.value)}
                className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="Masukkan nama"
              />
            </div>

            {/* Input Kursus */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kursus Pelatihan
              </label>
              <input
                type="text"
                value={inputValues.kursus}
                onChange={(e) => handleInputChange('kursus', e.target.value)}
                className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="Masukkan nama kursus"
              />
            </div>

            {/* Input Tanggal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tanggal Terbit
              </label>
              <input
                type="text"
                value={inputValues.tanggal}
                onChange={(e) => handleInputChange('tanggal', e.target.value)}
                className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="Masukkan tanggal"
              />
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={exportImage}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Download Sertifikat
          </button>

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
