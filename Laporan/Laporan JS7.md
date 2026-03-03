# API Routes pada Next.js dan Integrasi Firebase (Fullstack Next.js)

<b>Langkah 1 – Menjalankan Project</b>

<li> npm run dev
<li> Akses: http://localhost:3000

![alt text](image.png)

<b>Langkah 2 – Membuat API Produk</b>

1. Buat file pada pages/api/produk.js

![alt text](image-1.png)

2. Tambahkan data statis:

```ts
const data = [
  {
    id: "1",
    nama: "Kaos Polos",
    harga: 10000,
    ukuran: "L",
    warna: "merah",
  },
  {
    id: "2",
    nama: "Kaos Berlengan Panjang",
    harga: 15000,
    ukuran: "M",
    warna: "biru",
  },
];
```

3. Akses: http://localhost:3000/api/produk

![alt text](image-2.png)

<b>Langkah 3 – Fetch Data API di Frontend</b>

1. Modifikasi pages/product/index.tsx

```tsx
useEffect(() => {
  fetch("/api/produk")
    .then((response) => response.json())
    .then((responsedata) => {
      setProducts(responsedata.data);
    })
    .catch((error) => {
      console.error("Error fetching produk:", error);
    });
}, []);
```

2. Jalankan browser http://localhost:3000/produk

![alt text](image-3.png)

<b>Langkah 5 – Setup Firebase</b>

1.  Buka Firebase Go To Console ( login dengan login google)
2.  Buat project baru

![alt text](image-4.png)

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)

3. Aktifkan Firestore Database

![alt text](image-9.png)

![alt text](image-10.png)

4. Buat collection:

![alt text](image-11.png)

5. products

![alt text](image-12.png)

Gunakan auto-id

![alt text](image-13.png)

6. Tambahkan field:

![alt text](image-14.png)

![alt text](image-15.png)
