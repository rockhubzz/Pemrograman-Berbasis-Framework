<b>Langkah 1 – Pengecekan Lingkungan</b>

1. Buka terminal / command prompt.
2. Jalankan perintah berikut:
3. node -v
4. npm -v
5. git -v

![alt text](image.png)

<b>Langkah 2 – Membuat Project Next.js</b>

1. Buat direktori baru dan masuk ke direktori kerja
   ![alt text](image-1.png)

2. Jalankan perintah:
   ![alt text](image-2.png)

3. Masuk ke folder projectnya
   ![alt text](image-3.png)

<b>Langkah 3 – Menjalankan Server Development</b>

1. Masuk ke folder project:
   ![alt text](image-4.png)

2. Jalankan aplikasi:
   ![alt text](image-5.png)

3. Buka browser dan akses: http://localhost:3000
   ![alt text](image-6.png)

<b>Langkah 4 – Mengenal Struktur Folder</b>

Amati folder utama:<br>
• pages/ → tempat routing halaman
![alt text](image-7.png)

• public/ → aset statis
![alt text](image-8.png)

• styles/ → file CSS<br>
![alt text](image-9.png)

• package.json → konfigurasi project
![alt text](image-10.png)

• gitIgnore -> file konfigurasi di Git yang berfungsi untuk memberitahu Git file atau folder apa saja yang TIDAK perlu di-track / di-commit ke repository.
![alt text](image-11.png)

<b>Langkah 5 – Modifikasi Halaman Utama</b></br>

1. Buka file: pages/index.js, Ubah isi halaman, misalnya:

```tsx
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1>Praktikum Next.js Pages Router</h1> <br />
      <p>Mahasiswa D4 Pengembangan Web</p>
    </div>
  );
}
```

2. Simpan dan lihat perubahan di browser.
   ![alt text](image-12.png)
