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

  ![alt text](image.png)

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

  ![alt text](image-1.png)

---

## Bagian 3 – Redirect Sederhana

```tsx
return NextResponse.redirect(new URL("/produk", request.url));
```

- Semua halaman akan redirect ke home dan error dikarenakan terus menerus loading

  ![alt text](image-2.png)

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

  ![alt text](image-3.png)

- Akses halaman lain (stores):

  ![alt text](image-4.png)
