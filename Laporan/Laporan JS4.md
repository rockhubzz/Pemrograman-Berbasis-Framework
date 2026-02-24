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

<b>Langkah 3 – Pengujian Catch-All Route</b>

Akses URL berikut di browser:
/shop/clothes

![alt text](image-6.png)

/shop/clothes/tops

![alt text](image-7.png)

/shop/clothes/tops/t-shirt

![alt text](image-8.png)

Jika dilihat ada yang terbaca undifined dan ada yang tidak terbaca ini dikarena segmennya dibatasi Cuma array[0] dan array[1]. Solusinya bagaimana ?

Modifikasi […slug].tsx menjadi berikut

```tsx
import { useRouter } from "next/router";

const halamanToko = () => {
  // const Router = useRouter();
  // console.log(Router);

  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Toko</h1>
      {/* <p>Toko: {`${query.slug && query.slug[0]}-${query.slug[1]}`}</p> menggunakan backtick bukan petik satu */}
      <p>
        Toko: {Array.isArray(query.slug) ? query.slug.join("-") : query.slug}
      </p>
    </div>
  );
};

export default halamanToko;
```

Jalankan browser : Berapapun banyaknya seqment tetap terbaca

![alt text](image-9.png)

![alt text](image-10.png)

Untuk saat ini gunakan:

```tsx
import { useRouter } from "next/router";

const halamanToko = () => {
  // const Router = useRouter();
  // console.log(Router);

  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Toko</h1>
      <p>Toko: {`${query.slug && query.slug[0]}-` + query.slug[1]}</p>{" "}
      {/* menggunakan backtick bukan petik satu*/}
    </div>
  );
};

export default halamanToko;
```

Perhatikan bahwa:

<li> slug berbentuk array
<li> Isi halaman berubah sesuai URL

<br>
<b>Langkah 4 – Optional Catch-All Route</b>

<br>

1. Jika menggunakan [...slug].js maka ketika mengakses shop akan terjadi error

![alt text](image-11.png)

2. Solusinya dengan Rename file: [...slug].js → [[...slug]].js

![alt text](image-12.png)

3. Sekarang akses:
   /shop

![alt text](image-13.png)

4. Halaman dapat diakses meskipun tanpa parameter.

<b>Langkah 5 – Validasi Parameter</b>

Tambahkan validasi agar tidak error saat slug kosong:

```html
<p>Kategori: {slug ? slug[0] : "Semua Kategori"}</p>
```

/shop

![alt text](image-14.png)

/shop/baju/tshirt/pria

![alt text](image-15.png)
