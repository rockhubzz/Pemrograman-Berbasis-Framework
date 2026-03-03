# Custom Document dan Custom Error Page pada Next.js

<b>Langkah 1 – Menjalankan Project</b>

1. Buka folder project.
2. Jalankan:
3. npm run dev
4. Akses:
5. http://localhost:3000
6. Jika saat dirun ada kendala tampilan index lama tampil <li>Uninstall package Tailwind
<li>npm uninstall tailwindcss postcss autoprefixer
<li> Hapus file config Tailwind<br>
a. tailwind.config.js<br>
b. postcss.config.js

![alt text](imgs/JS6/image.png)
Catatan: Tidak ada error terkait tailwindcss

<b>Langkah 2 – Membuat Custom Document</b>

<li>Masuk ke folder: /src/pages/
<li> Modifikasi _document.js
<li> Isi dengan kode berikut:

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

Periksa di Inspect Element bahwa atribut lang="id" sudah berubah.

![alt text](imgs/JS6/image-1.png)

<b>Langkah 3 – Pengaturan Title per Halaman</b>

1. Buka pages/index.js.
2. Tambahkan:

```tsx
<head>
  <title>Praktikum Next.js Pages Router</title>
</head>
```

Refresh halaman dan perhatikan judul tab browser.
![alt text](imgs/JS6/image-2.png)

<b>Langkah 4 – Membuat Custom Error Page (404)</b>

<li>Di folder pages, buat file 404.tsx dengan isi kode:

```tsx
const Custom404 = () => {
  return (
    <div>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
    </div>
  );
};

export default Custom404;
```

<li>Akses URL yang tidak ada, misalnya:

/dashboard

![alt text](imgs/JS6/image-3.png)

<b>Langkah 5 – Styling Halaman 404</b>

<li>Buat file: styles/404.module.scss

![alt text](imgs/JS6/image-4.png)

<li>Tambahkan style:

```scss
.error {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__image {
    width: 300px;
  }
}
```

<li>Modifikasi kode pada pages/404.tsx:

```tsx
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
    </div>
  );
};

export default Custom404;
```

<li>Jalankan browser

![alt text](imgs/JS6/image-5.png)

<li>Jika dijalankan masih ada navbarnya , untuk itu lakukan Handling Navbar di Halaman 404

Tambahkan ’/404’ pada disable navbar

```tsx
const disableNavbar = ["/auth/login", "/auth/register", "/404"];
```

<li>Jalankan browser

![alt text](imgs/JS6/image-6.png)

<b>Langkah 6 – Menampilkan Gambar dari Folder Public</b>

<li>Buka website https://undraw.co/ download png 404
<li>Cari 404 dan download png

![alt text](imgs/JS6/image-7.png)

<li>Simpan gambar not-found.png ke folder public/ dan rename agar memudahkan

![alt text](imgs/JS6/image-8.png)

<li>Modifikasi kode pada 404.tsx:

```tsx
<img src="/page-not-found.png" alt="404" className={styles.error__image} />
```

<li>Jalankan browser

![alt text](imgs/JS6/image-9.png)

<b>Tugas 1 (Wajib)</b>

Tambahkan:

<li> Judul halaman
<li> Deskripsi singkat
<li> Gambar ilustrasi

![alt text](imgs/JS6/image-10.png)

<b>Tugas 2 (Wajib)</b>

<li> Custom warna, font, dan layout halaman 404
<li> Navbar tidak tampil di halaman 404

![alt text](imgs/JS6/image-11.png)

<b>Tugas 3 (Pengayaan)</b>

<li> Tambahkan tombol “Kembali ke Home”
<li> Gunakan navigasi Next.js (Link)

```tsx
import Link from "next/link";

<Link href="/" className={styles.button}>
  Kembali ke Beranda
</Link>;
```
