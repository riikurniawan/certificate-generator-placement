# Certificate Editor

Project Next.js untuk membuat editor sertifikat dengan draggable text menggunakan React Konva dan TailwindCSS.

## Fitur Utama

### 🎨 Certificate Editor (Single)
- Template sertifikat dengan border pink ornamental
- Draggable text fields (Nama, Kursus Pelatihan, Tanggal Terbit)
- Edit text secara real-time
- Export sertifikat sebagai gambar PNG
- Responsive design dengan TailwindCSS

### 📋 Participant Management (NEW!)
- Daftar peserta dalam bentuk tabel
- CRUD operations (Create, Read, Update, Delete)
- Preview sertifikat individual
- Download sertifikat per peserta
- Bulk download semua sertifikat sekaligus
- Real-time statistics dashboard

## Teknologi

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- React Konva
- Konva.js

## Instalasi

Semua dependencies sudah terinstall. Jika ingin menginstall ulang:

\`\`\`bash
npm install
\`\`\`

## Cara Menjalankan

1. Buka terminal di folder `certificate-editor`
2. Jalankan development server:

\`\`\`bash
npm run dev
\`\`\`

3. Buka browser dan akses: `http://localhost:3000`

## Cara Menggunakan

### Mode 1: Single Certificate Editor (`/`)

1. **Edit Text**: Gunakan form di sebelah kanan untuk mengubah text pada sertifikat
   - Nama Penerima
   - Kursus Pelatihan
   - Tanggal Terbit

2. **Pindahkan Posisi**: Klik dan drag text pada canvas untuk mengubah posisinya

3. **Download**: Klik tombol "Download Sertifikat" untuk export sebagai gambar PNG

### Mode 2: Participant Management (`/participants`)

1. **Tambah Peserta**: Klik tombol "+ Tambah Peserta" untuk menambah data baru

2. **Preview**: Klik tombol "👁️ Preview" untuk melihat sertifikat peserta

3. **Download Individual**: Klik tombol "📥 Download" untuk download sertifikat per peserta

4. **Bulk Download**: Klik "📥 Download Semua Sertifikat" untuk download semua sekaligus

5. **Edit/Delete**: Gunakan tombol Edit atau Hapus untuk mengelola data

**📖 Baca PARTICIPANT_GUIDE.md untuk panduan lengkap fitur Participant Management**

## Struktur Project

\`\`\`
certificate-editor/
├── app/
│   ├── page.tsx          # Halaman utama
│   ├── layout.tsx        # Layout aplikasi
│   └── globals.css       # Global styles
├── components/
│   └── CertificateEditor.tsx  # Komponen utama editor
├── public/               # Static files
├── package.json
└── README.md
\`\`\`

## Customization

Anda dapat mengcustomize:
- Warna border (default: pink #E91E63)
- Font size dan font family
- Posisi awal text elements
- Template design

Edit file `components/CertificateEditor.tsx` untuk melakukan customization.

## Build untuk Production

\`\`\`bash
npm run build
npm start
\`\`\`

## License

MIT
