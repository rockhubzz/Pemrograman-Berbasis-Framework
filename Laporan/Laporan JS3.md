# Laporan Jobsheet 3 - Routing, Nested Routing, Dynamic Routing, dan Layouting pada Next.js (Pages Router)

<b>1. Routing Dasar (Static Routing)</b><br>
<b>a. Struktur Awal</b><br>
pages/<br>
└── index.tsx<br>

<b>b. Tambahkan Halaman About</b><br>
![alt text](image.png)<br>

<b>c. Uji di Browser</b><br>
![alt text](image-1.png)<br>

<b>2. Routing Menggunakan Folder<br>
a. Rapikan Struktur Pages</br></b>
Ubah struktur menjadi:<br>
pages/<br>
└── about/<br>
└── index.tsx ( yang sebelumnya about.tsx menjadi index.tsx )

![alt text](image-2.png)

Akses /about<br>
Insight: index.tsx di dalam folder mewakili root folder tersebut.

<b>b. Akses dari halaman browser ( tetap sama tetapi lebih rapi )</b>

![alt text](image-3.png)

<b>3. Nested Routing<br>
a. Buat Folder Setting</b></br>

![alt text](image-4.png)

Modifikasi kodenya<br>

<li>user.tsx

```tsx
const UserSettingPage = () => {
  return (
    <div>
        User Setting Page
    </div>;
  )
};

export default UserSettingPage;
```

<li>app.tsx

```tsx
const AppSetting = () => {
    return  (
        <div>
            App Setting Page
        </div>;
)
};

export default AppSetting;
```

Akses:

<li>/setting/user

![alt text](image-5.png)

<li>/setting/app

![alt text](image-6.png)

Modifikasi struktur folder pages dengan menambahkan folder user dan user.tsx pada setting dipindah ke folder user dan rubah file user.tsx menjadi index.tsx

![alt text](image-7.png)

Jalankan pada browser

![alt text](image-8.png)

<b>b. Nested Lebih Dalam</b>

![alt text](image-9.png)

Akses /user/password

![alt text](image-10.png)

<b>4. Dynamic Routing<br>
a. Buat Halaman Produk</b>

![alt text](image-11.png)

<li>Modifikasi index.tsx

```tsx
const produk = () => {
  return ()
    <div>
        Produk User Page
    </div>;
};

export default produk;
```

<li> Modifikasi [id].tsx

Buka browser http://localhost:3000/produk/sepatu tambahkan segment sepatu

![alt text](image-12.png)

<li> Cek menggunakan console.log

![alt text](image-13.png)

<li>Modifikasi [id].tsx agar dapat mengambil nilai dari id

```tsx
import { useRouter } from "next/router";

const HalamanProduk = () => {
  // const Router = useRouter();
  // console.log(Router);
  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk: {query.id}</p>
    </div>
  );
};

export default HalamanProduk;
```

<li>Buka browser

![alt text](image-14.png)

<b>c. Uji di Browser</b>

<li> /produk/sepatu-baru

![alt text](image-15.png)

<li> /produk/baju

![alt text](image-16.png)
