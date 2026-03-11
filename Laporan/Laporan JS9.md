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
