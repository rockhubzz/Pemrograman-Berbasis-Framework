# Laporan Jobsheet 4 - Catch-All Routing, Optional Catch-All, Linking & Navigating pada Next.js Pages Router

<b>Langkah 1 – Menjalankan Project</b>

1. Buka folder project Next.js.
2. Jalankan server:
3. npm run dev
4. Akses:
5. http://localhost:3000

![alt text](image.png)

<b>Langkah 2 – Membuat Catch-All Route</b>

1. Masuk ke folder pages.
2. Buat folder shop dan file […slug].tsx:

![alt text](image-2.png)

3. Modifikasi Isi file […slug].tsx dengan kode berikut:

```tsx
import { useRouter } from "next/router";

const halamanToko = () => {
  const Router = useRouter();
  console.log(Router);
  // const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Toko</h1>
    </div>
  );
};

export default halamanToko;
```

Cek menggunakan console.log apakah nilai segment berhasil didapat

<li> Jalankan browser dan ketik urlnya sebagai berikut

![alt text](image-3.png)

<li>Cek Vscode jika pada console.log dapat menampilkan nilai querynya berarti berhasil

![alt text](image-4.png)

<li> Modifikasi [...slug].tsx untuk menampilkan nilai query

```tsx
import { useRouter } from "next/router";

const halamanToko = () => {
  // const Router = useRouter();
  // console.log(Router);

  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Toko</h1>
      <p>
        Toko: {`${query.slug && query.slug[0] + "-" + query.slug[1]}`}{" "}
        {/* menggunakan backtick bukan petik satu*/}
      </p>{" "}
      {/* menggunakan backtick bukan petik satu*/}
    </div>
  );
};

export default halamanToko;
```

Output:

![alt text](image-5.png)
