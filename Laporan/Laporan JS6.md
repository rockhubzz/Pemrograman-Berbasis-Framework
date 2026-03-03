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

![alt text](image.png)
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

![alt text](image-1.png)

<b>Langkah 3 – Pengaturan Title per Halaman</b>

1. Buka pages/index.js.
2. Tambahkan:

```tsx
<head>
  <title>Praktikum Next.js Pages Router</title>
</head>
```

Refresh halaman dan perhatikan judul tab browser.
![alt text](image-2.png)

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

![alt text](image-3.png)
