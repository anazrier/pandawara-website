#  Project Tugas Akhir - Website Profil Pandawara Group

---

##  Identitas Mahasiswa
* **Nama Mahasiswa:** Anazri Eriyani
* **NPM:** 125111043
* **Kelas:** Informatika B
* **Judul Project:** Profil Pandawara Group
* **Deskripsi Project:** Website Profil Pandawara Group

---

##  Tautan Penting
* **Link Video Demo (YouTube):** [Tonton di YouTube](https://youtu.be/nkxnwHunAgE?si=YNCJD4VrE_-abLXK)
* **Link Deploy Web (GitHub Pages):** [Kunjungi Website](https://anazrier.github.io/pandawara-website/index.html)

---

##  Deskripsi Proyek
Selamat datang di repositori **Website Profil Organisasi Pemuda**. Proyek ini adalah sebuah platform web profil interaktif yang dirancang khusus untuk komunitas yang membangun seperti **Pandawara Group**.

Website ini berfokus pada *clean design*, pesan yang kuat, serta kemudahan bagi calon relawan untuk bergabung dalam aksi nyata.

---

##  Fitur JavaScript yang Diimplementasikan
* **Event Click:** Digunakan untuk mekanisme peralihan tema (*light mode* / *dark mode*).
* **Validasi Form:** Memastikan seluruh data yang diinput oleh pengguna pada form pendaftaran dan donasi sudah sesuai standar sebelum diproses.
* **Manipulasi DOM:** Mengubah struktur, elemen, dan gaya dokumen HTML secara dinamis (seperti performa komponen accordion, perubahan tema, dan list donasi).
* **Penggunaan API:** Mengambil data eksternal secara *real-time* untuk sinkronisasi wilayah.
* **Aritmatika:** Digunakan pada sistem perhitungan *counter* donasi dan akumulasi data nominal yang masuk.

---

##  Fitur Utama Website

1. **Multipage Navigation**
   Menggunakan konsep *multi-page* agar informasi di halaman utama (`index.html`) tidak terkesan menumpuk atau terlalu padat dengan konten.
   * **Beranda (Home):** Berisi etalase ringkas yang mencakup *hero section*, jadwal event yang akan datang, *scoreboard* dampak, dan *call to action* (CTA).
   * **Tentang Kami (About):** Berisi kisah singkat perjalanan komunitas, foto pendiri, serta anggota inti dari Pandawara Group.
   * **Galeri (Gallery):** Berisi dokumentasi visual dan arsip kegiatan aksi lapangan.
   * **Kontak Kami (Contact):** Menyediakan informasi alamat fisik, email, media sosial resmi, form interaktif untuk pertanyaan, serta komponen *Accordion FAQ*.
   * **Daftar Relawan (Volunteer Registration):** Berisi formulir khusus bagi masyarakat yang ingin bergabung menjadi relawan aksi Pandawara Group.
   * **Donasi (Donation):** Berisi form donasi, fitur *counter* kalkulasi dana, serta daftar *real-time* data donatur terbaru.

2. **Dark Mode Support**
   Mendukung penuh perubahan tema visual secara instan dari *light mode* ke *dark mode* hanya dengan satu kali klik demi kenyamanan navigasi pengguna.

---

##  Teknologi yang Digunakan
* **HTML5:** Menyusun struktur semantik halaman web demi aksesibilitas dan SEO yang baik.
* **CSS3:** Mengatur desain responsif, tata letak kustom layout, serta transisi tema yang halus (*Smooth Dark Mode Transition*).
* **JavaScript (Vanilla JS & JS DOM):** Menangani logika validasi formulir, *toggle* tema gelap, manipulasi elemen halaman, dan kalkulasi data donasi.
* **API Wilayah Indonesia:** Sinkronisasi data administratif wilayah nusantara untuk form pendaftaran relawan agar lebih akurat.

---

##  Struktur Repositori

```text
├── img/                     # Folder untuk gambar kegiatan, logo, dan ikon
├── css/
│   └── style.css            # File gaya utama (termasuk variabel warna & dark mode)
├── js/
│   └── script.js            # Logika global (dark mode toggle, responsif navbar, validasi, API)
├── index.html               # Halaman Beranda
├── tentangkami.html         # Halaman Tentang Kami
├── galeri.html              # Halaman Galeri Aksi
├── kontakkami.html          # Halaman Kontak & FAQ Accordion
├── daftarrelawan.html       # Halaman Pendaftaran Relawan
├── donasi.html              # Halaman Donasi & Counter
└── README.md                # Dokumentasi Proyek
