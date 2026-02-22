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

<b>5. Membuat Komponen Navbar <br>
a. Struktur Komponen</b>

![alt text](image-17.png)

Modifikasi index.tsx

```tsx
const Navbar = () => {
  return (
    <div className="">
      <div>navbar Component </div>
    </div>
  );
};

export default Navbar;
```

Buka globals.css untuk nantinya digunakan pada style navbar

Modifikasi global.css

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}
```

Modifikasi index.tsx dengan menambahkan classname untuk style navbar

```tsx
const Navbar = () => {
  return (
    <div className="navbar">
      <div>navbar Component </div>
    </div>
  );
};

export default Navbar;
```

Modifikasi globals.css

```css
.navbar {
  width: 100%;
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
```

Modifikasi index.tsx pada folder pages

```tsx
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/layouts/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Praktikum Next.js Pages Router</h1> <br />
      <p>Mahasiswa D4 Pengembangan Web</p>
    </div>
  );
}
```

Modifikasi \_app.tsx ( pastikan import styles dalam keadaan aktif)

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

Jalankan di browser ( Navbar akan tampil )

![alt text](image-18.png)

<b>Modifikasi navbar agar tampil di semua page</b><br>
Modifikasi index.tsx pada folder page ( hapus navbar )

```tsx
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/layouts/navbar";

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

Modifikasi \_app.tsx ( Menambahkan navbar )

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/layouts/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
```

Jalankan browser

![alt text](image-19.png)

![alt text](image-20.png)

![alt text](image-21.png)

![alt text](image-22.png)

<b>6. Membuat Layout Global (App Shell)<br>
a. Buat AppShell</b>

![alt text](image-23.png)

Modifikasi index.tsx pada AppShell

```tsx
import Navbar from "../navbar";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;

  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default AppShell;
```

<b>7. Implementasi Layout di \_app.tsx</b>

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/Appshell";
import Navbar from "@/components/layouts/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}
```

Modifikasi pada \_app.tsx tambahkan footer seperti pada gambar dan amati hasilnya

```tsx
const { children } = props;

return (
  <main>
    <Navbar />
    {children}
    <div>footer</div>
  </main>
);
```

/about

![alt text](image-24.png)

/ (index pages)

![alt text](image-25.png)

<b>Tugas 1 - Routing</b>

1.  Buat halaman:
<li>/profile

![alt text](image-26.png)

<li>/profile/edit

![alt text](image-27.png)

<b>Tugas 2 – Dynamic Routing</b>

1. Buat routing:
2. /blog/[slug]
3. Tampilkan nilai slug di halaman

![alt text](image-28.png)
