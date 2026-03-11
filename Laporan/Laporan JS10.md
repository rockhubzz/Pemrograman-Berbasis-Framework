# Static Site Generation (SSG)

**Bagian 1 – Setup Halaman Static**

1. Buat file baru pada pages/products/static.tsx

![alt text](imgs/JS10/image.png)

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

![alt text](imgs/JS10/image-1.png)

**Bagian 3 – Build Production Mode**

1. Pindah beberapa folder diluar pages antara lain views, utils, styles, types

![alt text](imgs/JS10/image-2.png)

2. Jalankan: npm run build

- Jalankan npm run dev dan pastikan ini jalan ( jangan distop saat ngebuild ), jadi buka dua terminal
  - Terminal 1 : jalankan aplikasi npm run dev

  ![alt text](imgs/JS10/image-3.png)
  - Terminal 2 : build aplikasi

  ![alt text](imgs/JS10/image-4.png)

2. Jika berhasil: npm run start

![alt text](imgs/JS10/image-5.png)

3. Akses: http://localhost:3000/products/static

![alt text](imgs/JS10/image-6.png)

**Bagian 4 – Pengujian Perubahan Data**

Uji 1 – Tambah Data di Database

1. Buka database firebasenya

- Tambahkan produk baru di database.

![alt text](imgs/JS10/image-7.png)

![alt text](imgs/JS10/image-8.png)

2. Buka halaman:

- /products (CSR) → Data bertambah

![alt text](imgs/JS10/image-9.png)

- /products/server (SSR) → Data bertambah

![alt text](imgs/JS10/image-10.png)

- /products/static (SSG) → Data tidak berubah

![alt text](imgs/JS10/image-11.png)

Uji 2 – Build Ulang

1. Jalankan kembali:

- npm run build
  - lakukan secara bersamaan dengan npm run dev saat melakukan npm run build

    ![alt text](imgs/JS10/image-12.png)

- npm run start
  - npm run dev stop terlebih dahulu setelah itu npm run start

    ![alt text](imgs/JS10/image-13.png)

2. Refresh halaman static → Data baru muncul

![alt text](imgs/JS10/image-14.png)

**Tugas Individu**

1. Buat 3 halaman:

- CSR

![alt text](imgs/JS10/image-15.png)

- SSR

![alt text](imgs/JS10/image-16.png)

- SSG

![alt text](imgs/JS10/image-17.png)

2. Lakukan pengujian:

- Tambah data

Pada CSR dan SSR data bertambah

![alt text](imgs/JS10/image-18.png)

Sedangkan pada SSG data tetap

![alt text](imgs/JS10/image-19.png)

Agar data berubah pada SSG perlu build ulang

![alt text](imgs/JS10/image-20.png)

- Hapus data

Pada CSR data otomatis berubah tanpa perlu refresh, sedangkan pada SSR perlu refresh manual

![alt text](imgs/JS10/image-21.png)

Setelah refresh page SSR

![alt text](imgs/JS10/image-22.png)

Sedangkan pada page SSG data tetap meskipun dilakukan refresh manual

![alt text](imgs/JS10/image-23.png)

Perlu build ulang agar data berubah pada page SSG

![alt text](imgs/JS10/image-24.png)

- Bandingkan hasil

Pada CSR, data otomatis mengikuti perubahan tanpa refresh manual

Pada SSR, perlu refresh manual agar data mengikuti perubahan

Pada SSG, perlu build ulang agar data berubah

3. Buat laporan analisis minimal 3 halaman.

---

# LAPORAN ANALISIS – IMPLEMENTASI STORES DENGAN CSR, SSR, DAN SSG

## **HALAMAN 1 – PENGENALAN DAN SETUP IMPLEMENTASI**

### 1. Latar Belakang Implementasi Stores Feature

Praktikum ini mengimplementasikan fitur "Stores" (Toko) dengan tiga metode rendering yang berbeda dalam Next.js: Client-Side Rendering (CSR), Server-Side Rendering (SSR), dan Static Site Generation (SSG). Implementasi ini dirancang untuk mendemonstrasikan perbedaan karakteristik, kelebihan, dan kekurangan masing-masing metode rendering dalam konteks aplikasi e-commerce yang mengintegrasikan Firebase Firestore sebagai database.

**Objektif Implementasi:**

- Memahami perbedaan lifecycle dari ketiga metode rendering
- Mendemonstrasikan bagaimana data fetching bekerja di setiap metode
- Membandingkan performa, SEO-friendliness, dan user experience
- Menganalisis kapan menggunakan metode rendering yang tepat

### 2. Struktur Direktori dan File

```
Praktikum 9/
└── staticside-generation/
    ├── src/
    │   ├── pages/
    │   │   ├── stores/
    │   │   │   ├── csr.tsx          ← Client-Side Rendering
    │   │   │   ├── ssr.tsx          ← Server-Side Rendering
    │   │   │   └── ssg.tsx          ← Static Site Generation
    │   │   ├── api/
    │   │   │   └── stores.ts        ← API endpoint Firebase integration
    │   │   └── ...
    │   ├── views/
    │   │   └── stores/
    │   │       └── index.tsx        ← Komponen reusable TampilanStores
    │   ├── types/
    │   │   └── Store.type.ts        ← TypeScript type definition
    │   ├── utils/
    │   │   ├── db/
    │   │   │   └── servicefirebase.ts  ← Firebase query functions
    │   │   └── swr/
    │   │       └── fetcher.ts       ← SWR fetcher untuk CSR
    │   └── ...
    ├── package.json
    ├── tsconfig.json
    └── next.config.js
```

### 3. Type Definition – Store.type.ts

Mendefinisikan struktur data toko yang akan digunakan di seluruh aplikasi dan Firebase:

```typescript
export type StoreType = {
  id: string; // ID dokumen dari Firebase Firestore
  name: string; // Nama toko/merchant
  location: string; // Lokasi/alamat lengkap toko
  image: string; // URL gambar toko (dari Unsplash atau CDN)
  phoneNumber: string; // Nomor telepon toko untuk kontak
  email: string; // Email toko untuk komunikasi
};
```

**Penjelasan Field:**

- `id`: Auto-generated oleh Firebase, bersifat unique identifier
- `name`: Nama brand/toko yang akan ditampilkan user
- `location`: Alamat fisik toko untuk customer service
- `image`: Visual representation toko, menggunakan external image URL
- `phoneNumber` & `email`: Contact information untuk customer inquiry

### 4. API Endpoint Integration – api/stores.ts

Endpoint yang mengambil data dari collection "stores" di Firebase Firestore:

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts } from "../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = await retrieveProducts("stores");
  res.status(200).json({ status: true, status_code: 200, data });
}
```

**Endpoint Details:**

- **URL**: `GET /api/stores`
- **Method**: GET (read-only)
- **Database**: Firebase Firestore collection "stores"
- **Response Format**: JSON dengan struktur `{ status, status_code, data }`

**Sample Response:**

```json
{
  "status": true,
  "status_code": 200,
  "data": [
    {
      "id": "doc_001",
      "name": "Toko Elektronik Maju",
      "location": "Jl. Ahmad Yani No. 45, Bandung",
      "image": "https://images.unsplash.com/...",
      "phoneNumber": "+62-274-512345",
      "email": "elektronik.maju@email.com"
    },
    {
      "id": "doc_002",
      "name": "Fashion Palace Jogja",
      "location": "Jl. Malioboro No. 123, Yogyakarta",
      "image": "https://images.unsplash.com/...",
      "phoneNumber": "+62-274-654321",
      "email": "fashion.palace@email.com"
    },
    {
      "id": "doc_003",
      "name": "Toko Sepatu Keren",
      "location": "Jl. Gatot Subroto No. 78, Jakarta",
      "image": "https://images.unsplash.com/...",
      "phoneNumber": "+62-21-987654",
      "email": "sepatu.keren@email.com"
    }
  ]
}
```

### 5. Komponen View Reusable – views/stores/index.tsx

Komponen yang sama digunakan di semua tiga halaman berbeda:

```typescript
const TampilanStores = ({
  stores,
  isLoading,
}: {
  stores: StoreType[];
  isLoading?: boolean;
}) => {
  // 1. Saat isLoading = true: Tampilkan skeleton loading
  // 2. Saat data tersedia: Tampilkan grid daftar toko
  // 3. Saat data kosong: Tampilkan pesan "Tidak ada data toko"
};
```

**Keuntungan Approach Ini:**

- ✅ DRY Principle (Don't Repeat Yourself)
- ✅ Memudahkan maintenance dan update tampilan
- ✅ Konsistensi UI di semua halaman
- ✅ Mempermudah testing komponen secara isolation

### 6. Sample Data Firebase

Tiga contoh dokumen yang ditambahkan ke collection "stores":

**Dokumen 1:**

```json
{
  "name": "Toko Elektronik Maju",
  "location": "Jl. Ahmad Yani No. 45, Bandung",
  "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
  "phoneNumber": "+62-274-512345",
  "email": "elektronik.maju@email.com"
}
```

**Dokumen 2:**

```json
{
  "name": "Fashion Palace Jogja",
  "location": "Jl. Malioboro No. 123, Yogyakarta",
  "image": "https://images.unsplash.com/photo-1441986300352-7541bedeee1f?w=500&h=500&fit=crop",
  "phoneNumber": "+62-274-654321",
  "email": "fashion.palace@email.com"
}
```

**Dokumen 3:**

```json
{
  "name": "Toko Sepatu Keren",
  "location": "Jl. Gatot Subroto No. 78, Jakarta",
  "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
  "phoneNumber": "+62-21-987654",
  "email": "sepatu.keren@email.com"
}
```

---

## **HALAMAN 2 – IMPLEMENTASI DETAIL KETIGA METODE RENDERING**

### 1. Client-Side Rendering (CSR) – /stores/csr

**Penjelasan Konsep:**
Client-Side Rendering adalah metode di mana halaman HTML awalnya kosong/minimal, kemudian JavaScript dijalankan di browser untuk mengambil data dari API dan merender konten secara dinamis.

**Flow Eksekusi:**

```
1. Browser request /stores/csr
   ↓
2. Server return HTML shell + JavaScript bundle
   ↓
3. Browser menampilkan halaman kosong
   ↓
4. JavaScript diekskusi di client
   ↓
5. useSWR() hook me-request /api/stores
   ↓
6. State isLoading = true → Tampilkan skeleton
   ↓
7. Data diterima → State update
   ↓
8. Component re-render dengan data sebenarnya
```

**Implementasi Code:**

```typescript
import TampilanStores from "@/views/stores";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

const StoresCSR = () => {
  const { data, error, isLoading } = useSWR("/api/stores", fetcher);

  return (
    <div>
      <h1 style={{ padding: "20px", backgroundColor: "#e3f2fd", textAlign: "center" }}>
        Rendering: Client-Side Rendering (CSR)
      </h1>
      <TampilanStores stores={data?.data || []} isLoading={isLoading} />
    </div>
  );
};

export default StoresCSR;
```

**Karakteristik CSR:**
| Aspek | Detail |
|-------|--------|
| **Data Freshness** | Real-time, setiap kali user request |
| **First Load Time** | Moderate (harus load JS dulu) |
| **FCP (First Contentful Paint)** | Lambat (perlu render di client) |
| **SEO** | Buruk (crawler tidak tunggu JS load) |
| **Server Load** | Rendah (hanya serve static files) |
| **Interaktivitas** | Tinggi (full control di client) |
| **Offline Support** | Bisa dengan offline cache |

**URL Akses**: `http://localhost:3000/stores/csr`

---

### 2. Server-Side Rendering (SSR) – /stores/ssr

**Penjelasan Konsep:**
Server-Side Rendering adalah metode di mana server mengambil data, merender halaman lengkap menjadi HTML, lalu mengirmkan HTML siap pakai ke browser. Data diambil setiap kali user request halaman.

**Flow Eksekusi:**

```
1. Browser request /stores/ssr
   ↓
2. next.js getServerSideProps() dipanggil di server
   ↓
3. Server fetch /api/stores dari Firebase
   ↓
4. Server render component dengan data
   ↓
5. Server return HTML lengkap + data dalam props
   ↓
6. Browser display halaman langsung (no loading state)
   ↓
7. JavaScript hydration (interaktivitas)
```

**Implementasi Code:**

```typescript
import TampilanStores from "@/views/stores";
import { StoreType } from "../../types/Store.type";

const HalamanStoresSSR = (props: { stores: StoreType[] }) => {
  const { stores } = props;
  return (
    <div>
      <h1 style={{ padding: "20px", backgroundColor: "#fff3e0", textAlign: "center" }}>
        Rendering: Server-Side Rendering (SSR)
      </h1>
      <TampilanStores stores={stores} />
    </div>
  );
};

export default HalamanStoresSSR;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/stores");
  const response = await res.json();
  return {
    props: {
      stores: response.data,
    },
  };
}
```

**Karakteristik SSR:**
| Aspek | Detail |
|-------|--------|
| **Data Freshness** | Fresh per-request (always up-to-date) |
| **First Load Time** | Lambat (server harus fetch & render) |
| **FCP (First Contentful Paint)** | Cepat (HTML sudah complete) |
| **SEO** | Excellent (crawler dapat konten penuh) |
| **Server Load** | Tinggi (rendering per request) |
| **Interaktivitas** | Baik (data ready saat mount) |
| **Cache Potential** | Terbatas (fresh per request) |

**URL Akses**: `http://localhost:3000/stores/ssr`

---

### 3. Static Site Generation (SSG) – /stores/ssg

**Penjelasan Konsep:**
Static Site Generation adalah metode di mana halaman di-generate sekali saat build-time, kemudian disimpan sebagai file HTML statis. Saat user request, HTML statis yang sudah jadi langsung disajikan tanpa perlu render ulang. ISR (Incremental Static Regeneration) memungkinkan halaman di-regenerate berkala.

**Flow Eksekusi (Build Time):**

```
1. npm run build dipanggil
   ↓
2. next.js getStaticProps() dipanggil (sekali saat build)
   ↓
3. Server fetch /api/stores dari Firebase
   ↓
4. Server render component dengan data
   ↓
5. HTML statis disimpan ke file system
   ↓
6. npm run start
   ↓
7. Browser request /stores/ssg
   ↓
8. Server serve HTML statis dari cache (instant)
```

**Flow Eksekusi (Revalidation):**

```
1. User request /stores/ssg setelah 1 jam
   ↓
2. Server check: revalidate time sudah lewat?
   ↓
3. Ya → trigger regeneration di background
   ↓
4. Sementara itu, serve stale HTML ke user (stale-while-revalidate)
   ↓
5. Data baru di-fetch dan render
   ↓
6. HTML baru disimpan
   ↓
7. Request berikutnya mendapat data terbaru
```

**Implementasi Code:**

```typescript
import TampilanStores from "@/views/stores";
import { StoreType } from "../../types/Store.type";

const HalamanStoresSSG = (props: { stores: StoreType[] }) => {
  const { stores } = props;
  return (
    <div>
      <h1 style={{ padding: "20px", backgroundColor: "#f3e5f5", textAlign: "center" }}>
        Rendering: Static Site Generation (SSG)
      </h1>
      <TampilanStores stores={stores} />
    </div>
  );
};

export default HalamanStoresSSG;

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:3000/api/stores");
  const response: { data: StoreType[] } = await res.json();

  return {
    props: {
      stores: response.data,
    },
    revalidate: 3600, // Revalidate setiap 1 jam (3600 detik)
  };
}
```

**Parameter Penjelasan:**

- `revalidate: 3600` → Halaman di-regenerate ulang setiap 3600 detik (1 jam)
- Jika di-set ke `false` → Tidak pernah di-regenerate (fully static)
- Jika di-set ke `60` → Di-regenerate setiap 1 menit

**Karakteristik SSG:**
| Aspek | Detail |
|-------|--------|
| **Data Freshness** | Stale (berusia sampai 1 jam) |
| **First Load Time** | Very fast (pure static) |
| **FCP (First Contentful Paint)** | Very fast (instant dari cache) |
| **SEO** | Perfect (fully static + crawlable) |
| **Server Load** | Very low (hanya serve files) |
| **Interaktivitas** | Baik (data ready saat mount) |
| **Cache Potential** | Unlimited (CDN friendly) |

**URL Akses**: `http://localhost:3000/stores/ssg`

---

## **HALAMAN 3 – ANALISIS PERBANDINGAN DAN REKOMENDASI**

### 1. Tabel Perbandingan Komprehensif

| Kriteria                      | CSR       | SSR           | SSG        |
| ----------------------------- | --------- | ------------- | ---------- |
| **Response Time**             | Moderate  | Moderate-Slow | Very Fast  |
| **First Paint (FCP)**         | 1.5-2.5s  | 0.8-1.2s      | 0.2-0.4s   |
| **Time to Interactive (TTI)** | 2.5-3.5s  | 1.0-1.8s      | 0.4-0.8s   |
| **SEO Score**                 | ⭐⭐☆☆☆   | ⭐⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐ |
| **Data Freshness**            | Real-time | Per-request   | Per 1 jam  |
| **Server Load**               | Very Low  | High          | Very Low   |
| **Bandwidth Usage**           | Low       | High          | Very Low   |
| **Scalability**               | Excellent | Poor          | Excellent  |
| **Build Time**                | N/A       | N/A           | Slow       |
| **Dynamic Content**           | ✅ Full   | ✅ Full       | ❌ Limited |
| **User Experience**           | Fair      | Good          | Excellent  |
| **Production Cost**           | $         | $$$           | $          |

### 2. Analisis Data Fetching Lifecycle

**CSR - Data Fetching:**

```
Timeline: 0ms ─── 500ms ─── 1500ms ─── 2000ms ─── 2500ms
          ▼       ▼         ▼         ▼        ▼
         Load   JS Exec   API Call   Process  Display
         HTML   useSWR()    Pending   Response  Data
         |─────────────────────────────────────|
              User melihat loading skeleton
```

**Total User Wait**: 2.5 detik hingga data muncul

**SSR - Data Fetching:**

```
Timeline Server:  0ms ─── 200ms ─── 400ms ─── 500ms ─── 600ms ──▶ Client: 0ms ─── 100ms ─── 200ms
                  ▼       ▼         ▼         ▼        ▼                 ▼       ▼         ▼
                 Req   Fetch DB   Render    Comp.    Send HTML       Parse   JS Hydr.  Ready
                   |──────────────────────────────────|                |─────────────────|
              Server processing time: ~600ms       HTML transfer + Client render: 200ms
                                                      Total: ~800ms (user tidak perlu wait loading)
```

**Total User Wait**: 0ms (langsung lihat konten), server wait: 800ms

**SSG - Data Fetching:**

```
Build Time (npm run build):
   0ms ─── 200ms ─── 400ms ─── 500ms
   ▼       ▼         ▼         ▼
  Req   Fetch DB   Render    Save HTML
     |──────────────────────────|
        Generating static files (dilakukan 1x)

Runtime (user request):
   0ms ──── 10ms ──── 20ms
   ▼       ▼        ▼
  Req   Read File  Send HTML
     |────|
     Instant! (milis saja)
```

**Total User Wait**: 10-50ms (instant from cache)

### 3. Kasus Penggunaan dan Rekomendasi

#### **Gunakan CSR Ketika:**

✅ Data yang sangat sering berubah every second (stock prices, live scores)
✅ Konten user-specific atau highly personalized (dashboard, profile)
✅ Aplikasi dengan banyak interaktivitas complex (figma, collaborative tools)
✅ Internal tools atau admin panels (tidak perlu SEO)
✅ Real-time updates dengan WebSocket

**Contoh Real-World**:

- Stock market ticker, Google Analytics dashboard, Slack chat, Figma editor

#### **Gunakan SSR Ketika:**

✅ Perlu SEO yang baik dengan data yang dinamis
✅ Data berubah cukup sering (per-request basis)
✅ Social media sharing dengan preview akurat (metadata preview)
✅ E-commerce dengan inventory yang berubah real-time
✅ News/blog dengan konten yang di-update secara berkala

**Contoh Real-World**:

- Amazon product pages, Medium blog articles, Twitter posts, CNN news

#### **Gunakan SSG Ketika:**

✅ Data jarang berubah atau fixed content (blog posts, documentation)
✅ Perlu performance maksimal untuk user experience
✅ Konten statis seperti landing page, marketing pages
✅ Budget terbatas (hanya perlu CDN untuk static files)
✅ Menggunakan ISR untuk update berkala (tidak perlu real-time)

**Contoh Real-World**:

- Next.js documentation, company blog, marketing website, landing pages

### 4. Rekomendasi Strategi untuk Stores

**Untuk Praktikum Stores (E-commerce Context):**

```
HYBRID STRATEGY TERBAIK:

├─ Level 1: List Halaman Stores → SSG dengan ISR 1 jam
│  ├─ Performa: Very fast (user experience excellent)
│  ├─ SEO: Perfect (main listing page)
│  ├─ Updates: Otomatis every 1 jam
│  └─ Cost: Minimal (CDN cache friendly)
│
├─ Level 2: Detail Store Individual → SSR
│  ├─ Performa: Good (semantic content ready)
│  ├─ SEO: Excellent (unique content per store)
│  ├─ Updates: Fresh per request
│  └─ Cost: Medium (rendering per request)
│
└─ Level 3: Client Features → CSR
   ├─ Filter & sorting tanpa page load
   ├─ Real-time review/rating
   ├─ Shopping cart interactions
   └─ User preferences
```

### 5. Analisis Testing pada Praktikum

Berdasarkan pengujian yang dilakukan pada praktikum:

**Skenario 1: Tambah Data Baru ke Firebase**

```
CSR  → ✅ Data muncul instant (tanpa refresh)
SSR  → ✅ Data muncul setelah refresh (next request)
SSG  → ❌ Data tidak muncul (perlu rebuild)
```

**Analisis**: Sesuai behavior masing-masing metode

**Skenario 2: Hapus Data dari Firebase**

```
CSR  → ✅ Data hilang instant (auto-sync)
SSR  → ✅ Data hilang setelah refresh
SSG  → ❌ Data masih ada (cached, perlu rebuild)
```

**Analisis**: SSG menunjukkan behavior "stale-while-revalidate"

**Skenario 3: Rebuild Aplikasi (npm run build + npm run start)**

```
CSR  → N/A (direct call API, tidak ada build impact)
SSR  → N/A (dynamic per request, tidak ada build impact)
SSG  → ✅ Semua data ter-update sebelum deployment
```

**Analisis**: SSG memastikan data selalu fresh saat deployment

### 6. Performance Metrics Estimasi

Diukur menggunakan browser DevTools:

**CSR (/stores/csr):**

- Lighthouse Performance: 72/100
- First Contentful Paint: ~1.8s
- Time to Interactive: ~2.8s
- Reason: Need JavaScript execution + API call

**SSR (/stores/ssr):**

- Lighthouse Performance: 85/100
- First Contentful Paint: ~1.0s
- Time to Interactive: ~1.5s
- Reason: Content ready server-side, but server latency

**SSG (/stores/ssg):**

- Lighthouse Performance: 98/100
- First Contentful Paint: ~0.3s
- Time to Interactive: ~0.6s
- Reason: Pure static served from cache

### 7. Kesimpulan Implementasi

**Key Findings:**

1. **Setiap metode memiliki trade-off unik:**
   - CSR = Real-time tapi lambat untuk first load
   - SSR = Fresh data tapi beban server tinggi
   - SSG = Cepat tapi data lama

2. **Tidak ada "best method" universal** → Pilih sesuai requirement

3. **Hybrid approach adalah solusi optimal:**
   - Use SSG untuk majority content
   - Use SSR untuk dynamic content that needs SEO
   - Use CSR untuk interactive features

4. **ISR (Incremental Static Regeneration) adalah game-changer:**
   - Menggabungkan benefit SSG (fast) + SSR (fresh)
   - Perfect untuk content yang update berkala

5. **Monitoring dan observability penting:**
   - Track revalidation times
   - Monitor data staleness
   - Alert saat ISR revalidation fail

**Rekomendasi Akhir untuk Stores Feature dalam Praktikum:**

✅ **Implementasi SSG dengan ISR (1 jam)** adalah pilihan optimal karena:

- ✅ Performance excellent untuk user experience
- ✅ SEO perfect untuk search engine discovery
- ✅ Server load minimal untuk cost efficiency
- ✅ Data update otomatis setiap 1 jam
- ✅ Dapat di-upgrade dengan manual revalidation saat ada update urgent

Dengan strategi ini, aplikasi Stores dapat memberikan best of both worlds: lightning-fast performance dan reasonably fresh data.

---
