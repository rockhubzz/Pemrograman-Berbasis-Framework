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
