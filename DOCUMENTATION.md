# Panduan Lengkap Certificate Editor

## 📋 Deskripsi Project

Certificate Editor adalah aplikasi web yang memungkinkan Anda untuk membuat dan mengedit sertifikat dengan mudah. Template sertifikat menggunakan design border pink ornamental yang elegan, mirip dengan template sertifikat tradisional.

## 🎯 Fitur Utama

### 1. Template Sertifikat
- Border pink dengan ornamen di keempat sudut
- Header "SERTIFIKAT" dengan styling bold
- Layout yang clean dan profesional
- Background putih yang siap untuk di-print

### 2. Draggable Text Elements
Terdapat 3 text field yang dapat dipindahkan posisinya:
- **Nama Penerima**: Text dengan font size besar dan bold
- **Kursus Pelatihan**: Deskripsi kursus yang diikuti
- **Tanggal Terbit**: Lokasi dan tanggal penerbitan sertifikat

### 3. Panel Kontrol
- Input fields untuk edit text secara real-time
- Visual feedback saat text dipilih (shadow effect)
- Tombol download untuk export sertifikat
- Tips penggunaan

### 4. Export Function
- Download sertifikat dalam format PNG
- Resolusi tinggi untuk print quality
- Filename otomatis: `sertifikat.png`

## 🚀 Cara Menggunakan

### Langkah 1: Jalankan Development Server

Buka terminal di folder `certificate-editor` dan jalankan:

\`\`\`bash
npm run dev
\`\`\`

### Langkah 2: Akses Aplikasi

Buka browser dan kunjungi:
\`\`\`
http://localhost:3000
\`\`\`

### Langkah 3: Edit Sertifikat

1. **Edit Text melalui Form**:
   - Ketik di input "Nama Penerima" untuk mengubah nama
   - Ketik di input "Kursus Pelatihan" untuk mengubah nama kursus
   - Ketik di input "Tanggal Terbit" untuk mengubah tanggal

2. **Pindahkan Posisi Text**:
   - Klik pada text di canvas (akan muncul shadow pink)
   - Drag (klik tahan dan geser) ke posisi yang diinginkan
   - Lepas untuk menyimpan posisi baru

3. **Download Sertifikat**:
   - Setelah selesai mengedit, klik tombol "Download Sertifikat"
   - File PNG akan otomatis terdownload
   - Buka file untuk melihat hasil

## 🎨 Customization

### Mengubah Warna Border

Edit file `components/CertificateEditor.tsx`, cari bagian `CertificateBorder`:

\`\`\`typescript
// Ubah warna stroke (border)
stroke="#E91E63"  // Ganti dengan kode warna hex yang diinginkan

// Ubah warna ornamen
fill="#FCE4EC"    // Ganti dengan kode warna hex yang diinginkan
\`\`\`

### Mengubah Font

Edit bagian `textElements`:

\`\`\`typescript
{
  id: 'nama',
  text: 'Hasan Syahbana',
  x: 300,
  y: 250,
  fontSize: 32,           // Ubah ukuran font
  fontFamily: 'Arial',    // Ubah jenis font
  draggable: true,
}
\`\`\`

Font yang tersedia:
- Arial
- Times New Roman
- Georgia
- Courier New
- Comic Sans MS

### Mengubah Posisi Default

Ubah nilai `x` dan `y` pada `textElements`:

\`\`\`typescript
x: 300,  // Posisi horizontal (0-800)
y: 250,  // Posisi vertikal (0-560)
\`\`\`

### Menambah Text Field Baru

Tambahkan object baru di array `textElements`:

\`\`\`typescript
{
  id: 'instructor',
  text: 'Nama Instruktur',
  x: 300,
  y: 400,
  fontSize: 18,
  fontFamily: 'Arial',
  draggable: true,
}
\`\`\`

Jangan lupa tambahkan juga di `inputValues`:

\`\`\`typescript
const [inputValues, setInputValues] = useState({
  nama: 'Hasan Syahbana',
  kursus: 'Kursus Pelatihan Web Development',
  tanggal: 'Lombok, 13 Maret 2024',
  instructor: 'Nama Instruktur',  // Tambahkan di sini
});
\`\`\`

Dan buat input field baru di JSX.

## 🛠️ Troubleshooting

### Text tidak bisa di-drag
- Pastikan property `draggable` di text element adalah `true`
- Coba klik text terlebih dahulu sebelum drag

### Perubahan text tidak muncul
- Pastikan function `handleInputChange` terpanggil dengan benar
- Check console browser untuk error

### Download tidak berfungsi
- Pastikan browser mengizinkan download
- Check setting popup blocker

### Canvas tidak muncul
- Clear browser cache
- Restart development server
- Check console untuk error Konva

## 📁 Struktur File

\`\`\`
certificate-editor/
├── app/
│   ├── page.tsx              # Halaman utama aplikasi
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global CSS styles
│   └── favicon.ico
├── components/
│   └── CertificateEditor.tsx # Komponen utama editor sertifikat
├── public/                   # Folder untuk static assets
├── node_modules/             # Dependencies
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── next.config.mjs          # Next.js configuration
├── package.json             # NPM dependencies
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README_USAGE.md          # File ini
\`\`\`

## 🔧 Dependencies

### Production Dependencies
- **next**: Framework React untuk production
- **react**: Library UI
- **react-dom**: React DOM renderer
- **react-konva**: React bindings untuk Konva
- **konva**: Canvas library untuk manipulasi grafis

### Dev Dependencies
- **typescript**: Type checking
- **@types/node**: Type definitions untuk Node.js
- **@types/react**: Type definitions untuk React
- **@types/react-dom**: Type definitions untuk React DOM
- **tailwindcss**: Utility-first CSS framework
- **eslint**: Linting tool
- **eslint-config-next**: ESLint config untuk Next.js

## 💡 Tips & Best Practices

1. **Gunakan Browser Modern**: Chrome, Firefox, atau Edge versi terbaru untuk performa optimal

2. **Backup Posisi**: Catat posisi x,y yang bagus untuk referensi di masa depan

3. **Test Print**: Selalu test print hasil export untuk memastikan kualitas

4. **Performance**: Hindari terlalu banyak text elements (max 10) untuk performa optimal

5. **Responsive**: Aplikasi ini optimal untuk desktop/laptop. Mobile support terbatas.

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- Template sertifikat dengan border pink
- 3 draggable text fields
- Real-time editing
- PNG export functionality
- Responsive layout dengan TailwindCSS

## 🤝 Contributing

Jika ingin menambahkan fitur atau melakukan improvement:

1. Fork repository
2. Buat branch baru: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push ke branch: `git push origin feature/AmazingFeature`
5. Buat Pull Request

## 📄 License

MIT License - Bebas untuk digunakan dan dimodifikasi.

## 🙋 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository.

---

**Selamat mencoba! 🎉**
