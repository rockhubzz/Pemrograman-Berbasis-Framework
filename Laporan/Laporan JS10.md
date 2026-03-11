# Static Site Generation (SSG)

**Bagian 1 – Setup Halaman Static**

1. Buat file baru pada pages/products/static.tsx

![alt text](image.png)

2. Modifikasi file static.tsx

```tsx
import TampilanProduk from "../../views/produk";
import { ProductType } from "../types/Produk.type";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <h1>Halaman Produk Static</h1>
      <TampilanProduk products={products} />
    </div>
  );
};

export default halamanProdukStatic;

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:3000/api/produk");
  // const response: ProductType[] = await res.json();
  const response: { data: ProductType[] } = await res.json();

  // console.log("Data produk yang diambil dari API:", response);
  return {
    props: {
      products: response.data,
    },
  };
}
```

![alt text](image-1.png)

**Bagian 3 – Build Production Mode**

1. Pindah beberapa folder diluar pages antara lain views, utils, styles, types

![alt text](image-2.png)

2. Jalankan: npm run build

- Jalankan npm run dev dan pastikan ini jalan ( jangan distop saat ngebuild ), jadi buka dua terminal
  - Terminal 1 : jalankan aplikasi npm run dev

  ![alt text](image-3.png)
  - Terminal 2 : build aplikasi

  ![alt text](image-4.png)

2. Jika berhasil: npm run start

![alt text](image-5.png)

3. Akses: http://localhost:3000/products/static

![alt text](image-6.png)

**Bagian 4 – Pengujian Perubahan Data**

Uji 1 – Tambah Data di Database

1. Buka database firebasenya

- Tambahkan produk baru di database.

![alt text](image-7.png)

![alt text](image-8.png)

2. Buka halaman:

- /products (CSR) → Data bertambah

![alt text](image-9.png)

- /products/server (SSR) → Data bertambah

![alt text](image-10.png)

- /products/static (SSG) → Data tidak berubah

![alt text](image-11.png)

Uji 2 – Build Ulang

1. Jalankan kembali:

- npm run build
  - lakukan secara bersamaan dengan npm run dev saat melakukan npm run build

    ![alt text](image-12.png)

- npm run start
  - npm run dev stop terlebih dahulu setelah itu npm run start

    ![alt text](image-13.png)

2. Refresh halaman static → Data baru muncul

![alt text](image-14.png)
