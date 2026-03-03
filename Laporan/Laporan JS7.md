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

<b>Langkah 6 – Install Firebase</b>

1. npm install firebase

```shell
PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 6\api-routes> npm install firebase

added 79 packages, and audited 486 packages in 3m

158 packages are looking for funding
  run `npm fund` for details

1 high severity vulnerability

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
```

2. Buat folder dan file ts pada pages utlis/db/firebase.ts

![alt text](image-16.png)

3. Copy paste yang ada pada kotak merah ke file firebase.ts

```tsx
const firebaseConfig = {
  apiKey: "***************",
  authDomain: "***************",
  projectId: "***************",
  storageBucket: "***************",
  messagingSenderId: "***************",
  appId: "***************",
};
```

<b>Langkah 7 – Konfigurasi Environment Variable agar credensial firebase tidak dapat dilihat saat dipush di repository</b>

1. Buat file: .env.local
2. Modifikasi file env

```env
FIREBASE_API_KEY: ***************
FIREBASE_AUTH_DOMAIN:***************
FIREBASE_PROJECT_ID:***************
FIREBASE_STORAGE_BUCKET:***************
FIREBASE_MESSAGING_SENDER_ID:***************
FIREBASE_APP_ID: ***************
```

<b>Langkah 8 – Konfigurasi Firebase</b>

1. Modifikasi firebase.ts

```ts
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
```

<b>Langkah 9 – Ambil Data dari Firestore</b>

1. Buat file utils/db/servicefirebase.ts

![alt text](image-17.png)

2. modifikasi file servicefirebase.ts

```ts
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}
```

<b>Langkah 10 – API Mengambil Data Firebase</b>

1. Edit pages/api/product.ts:

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts } from "../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = await retrieveProducts("products");
  res.status(200).json({ status: true, status_code: 200, data });
}
```

2. Jalankan browser http://localhost:3000/api/produk

![alt text](image-18.png)

3. Modifikasi index.ts pada produk sesuaikan nama typenya dan db nya

```tsx
type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
};
```

Jalankan browser

![alt text](image-19.png)

<b>Tugas 1 (Wajib)</b>

<li> Tambahkan minimal 3 data produk di Firestore

![alt text](image-20.png)

<li> Pastikan data tampil di halaman produk

![alt text](image-21.png)

<b>Tugas 2 (Wajib)</b>

<li> Tambahkan field baru: category

![alt text](image-22.png)

<li> Tampilkan category di frontend

![alt text](image-23.png)

<b>Tugas 3 (Pengayaan)</b>

<li> Tambahkan tombol Refresh Data
<li> Gunakan fetch ulang tanpa reload halaman

![alt text](image-24.png)
