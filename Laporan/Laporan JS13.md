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
- Jadi masih bisa mengakses ke http://localhost:3000/produk
