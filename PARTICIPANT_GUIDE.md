# 📋 Participant Management - User Guide

## Fitur Baru: Manajemen Daftar Peserta

Sekarang Certificate Editor dilengkapi dengan halaman **Daftar Peserta** untuk mengelola data peserta dan generate sertifikat secara batch!

## 🎯 Akses Halaman Daftar Peserta

1. Dari halaman utama, klik tombol **"📋 Daftar Peserta →"** di pojok kanan atas
2. Atau akses langsung: `http://localhost:3000/participants`

## ✨ Fitur-Fitur

### 1. 📊 Tabel Data Peserta

Menampilkan semua data peserta dalam bentuk tabel yang rapi:
- **No**: Nomor urut
- **Nama Peserta**: Nama lengkap peserta
- **Kursus**: Nama kursus yang diikuti
- **Tanggal**: Tanggal terbit sertifikat
- **Status**: Status generate (Pending/Generated)
- **Aksi**: Tombol untuk berbagai aksi

### 2. ➕ Tambah Peserta Baru

**Cara:**
1. Klik tombol **"+ Tambah Peserta"**
2. Isi form:
   - Nama Lengkap
   - Kursus Pelatihan
   - Tanggal Terbit (contoh: Lombok, 13 Maret 2024)
3. Klik **"Tambah"**

### 3. ✏️ Edit Data Peserta

**Cara:**
1. Klik tombol **"✏️ Edit"** pada baris peserta
2. Update data yang diperlukan
3. Klik **"Update"**

### 4. 🗑️ Hapus Peserta

**Cara:**
1. Klik tombol **"🗑️ Hapus"** pada baris peserta
2. Konfirmasi penghapusan

### 5. 👁️ Preview Sertifikat

**Cara:**
1. Klik tombol **"👁️ Preview"** pada baris peserta
2. Lihat preview sertifikat dalam modal
3. Bisa langsung download dari preview

**Fitur Preview:**
- Tampilan sertifikat lengkap dengan border pink
- Data peserta ter-populate otomatis
- Tombol download langsung tersedia

### 6. 📥 Download Individual

**Cara:**
1. Klik tombol **"📥 Download"** pada baris peserta
2. Sertifikat langsung terdownload dengan format:
   ```
   sertifikat-nama-peserta.png
   ```
3. Status otomatis berubah menjadi **"✓ Generated"**

### 7. 📥 Bulk Download (Download Semua)

**Cara:**
1. Klik tombol **"📥 Download Semua Sertifikat (X)"**
2. Konfirmasi action
3. Semua sertifikat akan di-generate dan download secara otomatis
4. Setiap download memiliki delay 500ms untuk stabilitas

**Note:** Bulk download akan memproses semua peserta dalam list

### 8. 📈 Statistik Real-time

Dashboard menampilkan 3 kartu statistik:

1. **Total Peserta** (Biru)
   - Jumlah total peserta terdaftar

2. **Sertifikat Generated** (Hijau)
   - Jumlah sertifikat yang sudah di-generate

3. **Pending** (Kuning)
   - Jumlah peserta yang belum di-generate sertifikatnya

## 🎨 Tampilan Interface

### Tabel List Peserta

```
┌─────────────────────────────────────────────────────────────────┐
│  [+ Tambah Peserta]  [📥 Download Semua Sertifikat (3)]        │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ No │ Nama      │ Kursus          │ Tanggal  │ Status │ Aksi     │
├────┼───────────┼─────────────────┼──────────┼────────┼──────────┤
│ 1  │ Hasan     │ Web Development │ 13/03/24 │ ⏳     │ 👁️📥✏️🗑️ │
│ 2  │ Ahmad     │ UI/UX Design    │ 15/03/24 │ ✓      │ 👁️📥✏️🗑️ │
│ 3  │ Siti      │ Data Science    │ 20/03/24 │ ⏳     │ 👁️📥✏️🗑️ │
└────┴───────────┴─────────────────┴──────────┴────────┴──────────┘

┌────────────┐ ┌────────────┐ ┌────────────┐
│ Total: 3   │ │ Generated: │ │ Pending: 2 │
│ Peserta    │ │ 1          │ │            │
└────────────┘ └────────────┘ └────────────┘
```

## 🔄 Workflow Penggunaan

### Scenario 1: Generate Sertifikat Individual

1. Akses halaman Daftar Peserta
2. Tambah peserta baru atau pilih peserta existing
3. Klik **Preview** untuk melihat hasil
4. Jika sudah OK, klik **Download**
5. File PNG terdownload otomatis

### Scenario 2: Generate Batch/Bulk

1. Pastikan semua data peserta sudah terisi
2. Review data di tabel
3. Klik **"Download Semua Sertifikat"**
4. Konfirmasi
5. Tunggu proses selesai
6. Semua file PNG terdownload ke folder Downloads

### Scenario 3: Edit dan Re-generate

1. Klik **Edit** pada peserta yang ingin diubah
2. Update data (misal: typo pada nama)
3. Save changes
4. Klik **Download** untuk generate ulang
5. Sertifikat baru terdownload dengan data updated

## 💾 Data Storage

**Saat ini:** Data disimpan di **local state** (React useState)

**Implikasi:**
- Data hilang saat refresh browser
- Cocok untuk testing dan demo
- Untuk production, perlu implementasi:
  - Backend API (Next.js API Routes)
  - Database (PostgreSQL, MongoDB, etc.)
  - Local Storage / Session Storage (temporary)

## 🎯 Sample Data

Project sudah include 3 sample data:

```javascript
[
  {
    id: 1,
    name: 'Hasan Syahbana',
    course: 'Kursus Pelatihan Web Development',
    date: 'Lombok, 13 Maret 2024',
    status: 'pending'
  },
  {
    id: 2,
    name: 'Ahmad Hidayat',
    course: 'Kursus Pelatihan UI/UX Design',
    date: 'Lombok, 15 Maret 2024',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Siti Nurhaliza',
    course: 'Kursus Pelatihan Data Science',
    date: 'Lombok, 20 Maret 2024',
    status: 'pending'
  }
]
```

## 🚀 Tips & Best Practices

### 1. Naming Convention
Gunakan format tanggal yang konsisten:
- ✅ **Good**: "Lombok, 13 Maret 2024"
- ❌ **Avoid**: "13/3/24", "March 13"

### 2. Preview Before Download
Selalu preview sertifikat sebelum bulk download untuk memastikan:
- Posisi text sudah pas
- Tidak ada typo
- Format sudah sesuai

### 3. Bulk Download Considerations
- Pastikan popup blocker tidak aktif
- Untuk list besar (>20), consider download in batches
- Browser mungkin ask permission untuk multiple downloads

### 4. Data Backup
Karena data di local state, backup dengan cara:
- Screenshot tabel
- Copy-paste ke spreadsheet
- Atau implementasi export to CSV

## 🔧 Customization

### Mengubah Sample Data

Edit file: `components/ParticipantList.tsx`

```typescript
const [participants, setParticipants] = useState<Participant[]>([
  {
    id: 1,
    name: 'Your Name',
    course: 'Your Course',
    date: 'Your Date',
    status: 'pending',
  },
  // Add more...
]);
```

### Mengubah Delay Bulk Download

```typescript
setTimeout(() => {
  handleDownload(participant);
}, index * 500); // Change 500 to desired delay (ms)
```

### Menambah Kolom Baru

1. Update interface `Participant`:
```typescript
interface Participant {
  id: number;
  name: string;
  course: string;
  date: string;
  status: 'pending' | 'generated';
  instructor?: string; // New field
}
```

2. Update form dan tabel sesuai kebutuhan

## 📱 Responsive Design

- ✅ Desktop: Optimal experience
- ✅ Tablet: Table scrollable
- ⚠️ Mobile: Limited support (table might overflow)

**Recommendation:** Use on desktop/laptop untuk experience terbaik

## 🔮 Future Enhancements

Possible improvements:
- [ ] Export to CSV/Excel
- [ ] Import from CSV
- [ ] Backend integration
- [ ] Database storage
- [ ] User authentication
- [ ] Print multiple certificates
- [ ] Email delivery
- [ ] Custom templates
- [ ] Search & filter
- [ ] Pagination
- [ ] Sort by column

## 🐛 Known Issues

1. **Data tidak persist**: Refresh = data hilang
   - **Solution**: Implement localStorage or backend

2. **Bulk download popup blocker**: Browser might block multiple downloads
   - **Solution**: Allow downloads in browser settings

3. **Table overflow on mobile**: Horizontal scroll needed
   - **Solution**: Use on desktop or implement mobile-optimized view

## 📞 Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi ini
2. Review code di `components/ParticipantList.tsx`
3. Check browser console untuk errors

---

**Happy Certificate Generating! 🎓✨**
