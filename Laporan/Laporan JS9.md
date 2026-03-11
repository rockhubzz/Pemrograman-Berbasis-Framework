# Server Side Rendering (SSR)

**Bagian 1 – Setup Halaman SSR**

1. Buat file baru pada pages/products/server.tsx

![alt text](image.png)

2. Modifikasi file server.tsx :

```tsx
import TampilanProduk from "@/views/produk";

const halamanProdukServer = () => {
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={[]} />
    </div>
  );
};

export default halamanProdukServer;
```

3. Jalankan browser : http://localhost:3000/produk/server

![alt text](image-1.png)

**Bagian 2 – Implementasi getServerSideProps pada server.tsx**

```tsx
import TampilanProduk from "@/views/produk";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const halamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={products} />
    </div>
  );
};

export default halamanProdukServer;

// Fungsi getServerSideProps akan dipanggil setiap kali halaman ini diakses,
// dan akan mengambil data produk dari API sebelum merender halaman.
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const respone = await res.json();
  // console.log("Data produk yang diambil dari API:", respone);
  return {
    props: {
      products: respone.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
    },
  };
}
```

Jalankan browser http://localhost:3000/produk/server

![alt text](image-2.png)

**Bagian 3 – Refactor Type ( produk type )**

1. Buat folder types pada folder pages dan buat file Product.type.ts

![alt text](image-3.png)

2. Modifikasi Product.type.ts

```ts
export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};
```

3. Setelah membuat file Product.type.ts maka modifikasi pada file server.tsx menjadi

```tsx
const halamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={products} />
    </div>
  );
};
```

![alt text](image-4.png)

**Bagian 4 – Uji Perbedaan SSR vs CSR**

Uji 1 – Skeleton

/produk

![alt text](image-5.png)

/produk/server

![alt text](image-6.png)

Catatan: Jika menggunakan SSR, skeleton tidak muncul saat loading data, namun hanya melakukan loading page

Uji 2 – Network Tab

1. Buka DevTools → Network → XHR
2. Refresh halaman CSR → Request API terlihat

![alt text](image-7.png)

3. Refresh halaman SSR → Request API tidak terlihat

![alt text](image-8.png)

Uji 3 – Response HTML

1. CSR: HTML awal kosong (berisi skeleton)

![alt text](image-9.png)

2. SSR: HTML sudah berisi data produk lengkap

![alt text](image-10.png)

Catatan: Kedua pengujian dilakukan tanpa koneksi internet
