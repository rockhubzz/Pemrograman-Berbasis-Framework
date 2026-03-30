# Middleware & Route Protection

## Bagian 1 – Membuat Middleware

- Modifikasi file index.tsx pada folder src/pages/produk

  ```tsx
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import TampilanProduk from "../../views/product";
  import useSWR from "swr";
  import fetcher from "../../utils/swr/fetcher";

  // const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const kategori = () => {
    // const [isLogin, setIsLogin] = useState(true);
    const { push } = useRouter();
    const [products, setProducts] = useState([]);
    // console.log("products:", products);

    const { data, error, isLoading } = useSWR("/api/produk", fetcher);
    //cek apakah data, error, dan isLoading sudah benar...

    return (
      <div>
        <TampilanProduk products={isLoading ? [] : data.data} />
      </div>
    );
  };

  export default kategori;
  ```

- Buat file: src/middleware.ts Sejajar dengan folder pages.

  ![alt text](imgs/JS13/image.png)

---

## Bagian 2 – Struktur Dasar Middleware

/src/middleware.ts:

    ```ts
    import { NextResponse } from "next/server";
    import type { NextRequest } from "next/server";

    export function middleware(request: NextRequest) {
    return NextResponse.next();
    }
    ```

- Jika menggunakan NextResponse.next() → tidak ada redirect.
- Jadi masih bisa mengakses ke http://localhost:3000/produk:

  ![alt text](imgs/JS13/image-1.png)

---

## Bagian 3 – Redirect Sederhana

```tsx
return NextResponse.redirect(new URL("/produk", request.url));
```

- Semua halaman akan redirect ke home dan error dikarenakan terus menerus loading

  ![alt text](imgs/JS13/image-2.png)

---

## Bagian 4 – Batasi Route Tertentu

- Untuk mengatasi pada bagian 3 maka perlu pembatasan route

  ```tsx
  export const config = {
    matcher: ["/about", "/produk"],
  };
  ```

- Artinya:
  - Middleware hanya berlaku untuk /products dan /about
  - Halaman lain tetap normal
  - Ketika user mengakses halaman produk dan about maka akan langsung redirect ke halaman home

- Akses halaman produk:

  ![alt text](imgs/JS13/image-3.png)

- Akses halaman lain (stores):

  ![alt text](imgs/JS13/image-4.png)

---

## Bagian 5 – Simulasi Sistem Login

- Modifikasi file middleware.ts

```ts
if (!auth.isLogin) {
  return NextResponse.redirect(new URL("/auth/login", request.url));
} else {
  return NextResponse.next();
}
```

- Jika user langsung mengakses ke alamat http://localhost:3000/produk tidak akan bisa user akan diarahkan ke halaman login

![alt text](<imgs/JS13/2026-03-30 19-11-19.gif>)

---

## Pengujian

### Uji 1 – isLogin = false

Akses /produk

![alt text](<imgs/JS13/2026-03-30 19-11-19.gif>)

Hasil: Redirect ke /login

### Uji 2 – isLogin = true

Akses /produk setelah login

![alt text](<imgs/JS13/2026-03-30 19-55-33.gif>)

Hasil: Bisa mengakses /produk

### Uji 3 – Tambahkan Multiple Route

![alt text](imgs/JS13/ezgif-703dda3b71d815ab.gif)

Sekarang:

- /products dan /about butuh login
- Halaman lain bebas

---

## Tugas Individu

1. Buat halaman:

- /products

  ![alt text](imgs/JS13/image-7.png)

- /about

  ![alt text](imgs/JS13/image-6.png)

- /login

  ![alt text](imgs/JS13/image-5.png)

2. Implementasikan Middleware:

- Redirect ke /login jika belum login.
- Izinkan akses jika login true.

  ![alt text](imgs/JS13/ezgif-71974fc29e69ed0c.gif)

3. Tambahkan proteksi hanya untuk route tertentu.

   ```ts
   export const config = {
     matcher: ["/about", "/produk"],
   };
   ```

4. Dokumentasikan:

- Screenshot sebelum dan sesudah redirect.

  ![alt text](<imgs/JS13/2026-03-30 19-11-19.gif>)

- Perbandingan dengan useEffect.

  ![alt text](<imgs/JS13/2026-03-30 19-03-42.gif>)

---
