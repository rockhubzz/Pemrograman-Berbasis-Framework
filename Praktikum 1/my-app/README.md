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

<b>Langkah 6 – Modifikasi API</b>

1. Buka folder api
   ![alt text](image-13.png)

2. Modifikasi hello.ts

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  alamat: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe", alamat: "jl.suka suka no 1" });
}
```

3. Jalankan browser dengan Alamat http://localhost:3000/api/hello
   ![alt text](image-14.png)

Catatan: Pada saat screenshot di atas dilakukan, extension "JSON Formatter" sudah terinstall

<b>Langkah 7 – Modifikasi Background</b>

1. Buka file \_app.tsx
2. Modifikasi menjadi berikut

```tsx
// import '@/styles/globals.css'
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

3. Jalankan localhost
   ![alt text](image-15.png)

<b>Langkah 8 – Setup ext pada VSCode (opsional)</b>

![alt text](image-16.png)

<b>Tugas 1 (Wajib)</b><br>
• Buat halaman baru about.js di folder pages.<br>
• Tampilkan:<br>
o Nama Mahasiswa<br>
o NIM<br>
o Program Studi<br>

Code about.tsx:

```tsx
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <p>Nama: Rocky Alessandro Kristanto</p>
      <p>NIM: 2341720197</p>
      <p>Program Studi: Teknik Informatika</p>
    </div>
  );
}
```

Output:
![alt text](image-17.png)
