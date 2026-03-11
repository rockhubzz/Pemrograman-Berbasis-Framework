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

**Tugas Individu**

1. Buat 2 halaman:

- /products (CSR)

- /products/server (SSR)

2. Dokumentasikan:

- Screenshot CSR

![alt text](image-11.png)

- Screenshot SSR

![alt text](image-12.png)

- Perbedaan Network tab
  - CSR:

![alt text](image-13.png)

- SSR:

![alt text](image-14.png)

- Perbedaan View Source

CSR:

![alt text](image-16.png)

SSR:

![alt text](image-15.png)

3. Buat laporan analisis minimal 2 halaman.

---

## LAPORAN ANALISIS SERVER SIDE RENDERING (SSR) vs CLIENT SIDE RENDERING (CSR)

### Halaman 1

#### 1. Pendahuluan

Server Side Rendering (SSR) dan Client Side Rendering (CSR) merupakan dua pendekatan fundamental dalam mengembangkan aplikasi web modern. Setiap pendekatan memiliki karakteristik, kelebihan, dan kekurangan yang berbeda. Melalui praktikum ini, kami telah mengimplementasikan dan menguji kedua metodologi rendering pada halaman produk dengan Next.js untuk memahami perbedaan dan implikasinya terhadap performa serta user experience.

#### 2. Definisi dan Konsep Dasar

**Client Side Rendering (CSR)** adalah pendekatan dimana proses rendering konten HTML dilakukan sepenuhnya di sisi client (browser). Server hanya mengirimkan file HTML kosong yang kemudian diisi dengan konten melalui JavaScript. Aplikasi React yang berjalan di browser akan mengambil data dari API, memproses, dan merender konten secara real-time.

**Server Side Rendering (SSR)** adalah pendekatan dimana proses rendering konten HTML dilakukan di sisi server sebelum dikirimkan ke browser. Server memproses data, merender komponen React menjadi HTML string, dan mengirimkan halaman yang sudah lengkap dengan konten ke client. Browser hanya perlu menampilkan halaman yang sudah siap tanpa perlu melakukan rendering ulang.

#### 3. Hasil Pengujian dan Pengamatan

Berdasarkan pengujian praktikum yang telah dilakukan, berikut adalah temuan-temuan penting:

**A. Uji 1 – Skeleton Loading**

- **CSR (/produk):** Skeleton loading muncul ketika halaman pertama kali diakses sebelum data dari API berhasil dimuat. Hal ini terjadi karena halaman dipopulasi melalui JavaScript di browser.
- **SSR (/produk/server):** Skeleton loading tidak muncul langsung. Halaman sudah menampilkan data produk lengkap sejak awal karena rendering sudah dilakukan di server.

Pengamatan ini menunjukkan bahwa SSR memberikan pengalaman yang lebih baik dari perspektif flashing content, namun server harus menunggu data selesai diambil sebelum mengirim response.

**B. Uji 2 – Network Tab XHR**

- **CSR:** Request API terlihat di Network → XHR. Browser mengirimkan request ke `/api/produk` setelah halaman dimuat, kemudian data dikembalikan dan dirender oleh JavaScript.
- **SSR:** Request API tidak terlihat di XHR dari perspektif client. Hal ini karena API call dilakukan di server melalui `getServerSideProps()`, bukan di browser.

Implikasi: CSR menghasilkan performance metrics yang berbeda dimana First Contentful Paint (FCP) lebih lambat dibandingkan SSR karena harus menunggu proses rendering di client selesai.

**C. Uji 3 – Response HTML**

- **CSR:** HTML awal yang dikirim ke browser berupa skeleton/template kosong. Contohnya:

  ```html
  <div class="produk__content__skeleton">
    <div class="produk__content__skeleton__image"></div>
    <div class="produk__content__skeleton__name"></div>
    ...
  </div>
  ```

  Data sebenarnya ditambahkan melalui proses JavaScript di browser.

- **SSR:** HTML yang dikirim ke browser sudah berisi data produk lengkap dengan informasi nama, harga, kategori, dan gambar produk. Contohnya:
  ```html
  <h4 class="produk__content__item__name">Produk ABC</h4>
  <p class="produk__content__item__category">Elektronik</p>
  <p class="produk__content__item__price">Rp 299.000</p>
  ```

Pengamatan ini menunjukkan perbedaan signifikan dalam hal hal SEO dan initial page load experience.

#### 4. Analisis Kelebihan CSR

1. **Interaktivitas Tinggi:** Setelah initial load, CSR memberikan user experience yang sangat responsif dengan transisi antar halaman yang smooth tanpa page reload.

2. **Traffic Server Rendah:** Server tidak perlu melakukan rendering, fokus hanya pada menyediakan API endpoints. Ini mengurangi beban server dan memungkinkan scalability lebih baik.

3. **Caching yang Efisien:** Browser dapat cache JavaScript bundles dan hanya memuat data API yang berubah, menghasilkan bandwidth lebih efisien untuk subsequent visits.

4. **Development Simplicity:** Separation of concerns menjadi jelas antara API backend dan frontend application.

#### 5. Analisis Kekurangan CSR

1. **SEO Challenges:** Search engine crawler akan menerima HTML kosong (skeleton) tanpa konten sebenarnya. Meskipun Google sekarang support JavaScript rendering, banyak search engine lain belum. Ini mengakibatkan konten produk tidak terindex dengan baik.

2. **Slow First Contentful Paint (FCP):** Pengguna akan melihat skeleton loading terlebih dahulu, meningkatkan perceived loading time.

3. **JavaScript Dependency:** Seluruh aplikasi bergantung pada JavaScript. Jika JavaScript gagal load atau browser mengalami JS error, konten tidak akan ditampilkan.

---

### Halaman 2

#### 6. Analisis Kelebihan SSR

1. **SEO Excellence:** HTML yang dikirim ke client sudah berisi konten lengkap. Search engine crawler dapat langsung mengindex semua informasi produk tanpa perlu render JavaScript.

2. **Fast First Contentful Paint (FCP):** Konten sudah siap di HTML response, sehingga browser dapat menampilkan konten lebih cepat tanpa menunggu JavaScript execution.

3. **Graceful Degradation:** Bahkan jika JavaScript gagal atau dinonaktifkan, konten masih tetap terlihat di halaman.

4. **Better Meta Tags:** Server dapat menghasilkan meta tags yang dinamis berdasarkan data yang diambil, meningkatkan social media sharing experience.

5. **Network Efficient:** Tidak ada multiple round-trips untuk mengambil data setelah halaman dimuat.

#### 7. Analisis Kekurangan SSR

1. **Server Load Tinggi:** Setiap request memerlukan server untuk melakukan rendering, yang membutuhkan resources CPU dan memory lebih banyak.

2. **Scalability Challenge:** Dengan banyak pengguna concurrent, server mungkin perlu auto-scaling untuk handle semua rendering requests.

3. **Latency Tergantung Server Response:** FCP bergantung pada kecepatan server mengambil dan render data. Jika API lambat, keseluruhan response time akan tertunda.

4. **Stateless Complexity:** Setiap request diperlakukan independen, membuat mengelola user sessions dan authentication lebih kompleks.

#### 8. Analisis Komparatif SSR vs CSR

| Aspek                         | CSR                           | SSR                             |
| ----------------------------- | ----------------------------- | ------------------------------- |
| **SEO**                       | Buruk (tanpa effort tambahan) | Excellent                       |
| **Initial Load Time**         | Lambat (tergantung JS size)   | Cepat                           |
| **Server Load**               | Rendah                        | Tinggi                          |
| **Interaktivity**             | Tinggi setelah load           | Rendah sampai hydration selesai |
| **Scalability**               | Mudah                         | Perlu consideration lebih       |
| **Development**               | Sederhana                     | Lebih kompleks                  |
| **Time to Interactive (TTI)** | Lambat                        | Bervariasi tergantung JS        |
| **Offline Support**           | Mudah dengan service workers  | Sulit                           |

#### 9. Use Cases dan Rekomendasi

**CSR Cocok Untuk:**

- Aplikasi yang membutuhkan interaktivitas tinggi (dashboard, web apps)
- Konten yang frequently updated atau personalized
- Aplikasi yang tidak memerlukan SEO sempurna
- Single Page Applications (SPAs)

**SSR Cocok Untuk:**

- E-commerce dan catalog products (seperti praktikum ini)
- Konten-driven websites yang butuh SEO
- Landing pages dan marketing websites
- Content yang statis atau jarang berubah

**Hybrid Approach (Recommended):**
Banyak aplikasi modern menggunakan hybrid approach dengan Next.js:

- SSR untuk initial page load dan SEO
- CSR untuk interactive features dan client-side navigation
- Static Generation untuk konten yang jarang berubah
- ISR (Incremental Static Regeneration) untuk update konten secara berkala

#### 10. Implementasi di Praktikum dan Results

Praktikum ini telah membuktikan:

1. **getServerSideProps() Effectiveness:** Fungsi `getServerSideProps()` di Next.js berhasil mengambil data dari API server-side sebelum rendering, menghasilkan HTML complete yang dikirim ke client.

2. **Data Availability:** Dengan SSR, props `products` tersedia langsung di component, tidak perlu state management untuk handle loading states.

3. **Network Optimization:** SSR mengeliminasi XHR call dari client, mengurangi round-trips dan improving overall page load performance.

#### 11. Kesimpulan

Server Side Rendering (SSR) dan Client Side Rendering (CSR) adalah dua paradigma yang valid dengan trade-offs yang berbeda:

- **SSR lebih baik untuk:** Halaman yang memerlukan SEO excellent, fast initial page load, dan konten yang dapat di-prerender di server.
- **CSR lebih baik untuk:** Aplikasi dengan interaktivitas tinggi, offline capability, dan server resources yang terbatas.

Implementasi Next.js memberikan kemudahan untuk menggunakan keduanya secara bersamaan dalam satu aplikasi. Untuk kasus praktikum halaman produk, **SSR adalah pilihan yang lebih optimal** karena:

- Konten produk perlu terindex oleh search engine
- Halaman dapat di-pre-render dengan cepat
- Mengeliminasi skeleton loading experience
- Mendukung social media rich previews

Pemahaman mendalam tentang kapan dan bagaimana menggunakan SSR vs CSR adalah crucial skill dalam modern web development.

#### 12. Rekomendasi Implementasi Lanjutan

Untuk optimasi lebih lanjut, disarankan:

1. Implementasi caching di server-side (Redis/Memcached) untuk store data produk
2. Menggunakan ISR (Incremental Static Regeneration) untuk products yang jarang berubah
3. Implementasi CDN untuk distribute static assets
4. Monitoring dan optimization server-side rendering performance
5. Implementasi error boundaries untuk SSR untuk handle edge cases

---

**Studi Analisis**

**1. Mengapa SSR lebih baik untuk SEO?**

SSR lebih baik untuk SEO karena beberapa alasan fundamental:

1. **Complete HTML Response:** Ketika server merender halaman, HTML yang dikirim ke browser sudah berisi seluruh konten produk (nama, deskripsi, harga, kategori). Search engine crawler seperti Googlebot, Bingbot, dan crawler lainnya langsung mendapatkan konten lengkap tanpa perlu menjalankan JavaScript.

2. **Meta Tags Dinamis:** Dengan SSR, server dapat menginject meta tags secara dinamis berdasarkan produk yang ditampilkan. Contohnya:

   ```html
   <meta name="description" content="Produk ABC - Rp 299.000" />
   <meta property="og:title" content="Produk ABC" />
   <meta property="og:image" content="image-url" />
   ```

   Meta tags yang akurat ini membantu search engine memahami konten halaman dan meningkatkan click-through rate dari search results.

3. **Eliminate JavaScript Dependency:** CSR bergantung pada JavaScript execution. Meskipun Google sekarang support JavaScript rendering, banyak search engine lain (Bing, Yahoo) dan social media crawlers belum fully support JS rendering. Ini berarti konten produk mungkin tidak terindex dengan baik di platform lain.

4. **Faster Indexing:** Konten tersedia langsung di HTML berarti crawlers dapat lebih cepat menemukan dan mengindex konten tanpa menunggu JavaScript dievaluasi.

5. **Structured Data Support:** Dengan SSR, kita dapat dengan mudah menambahkan Schema.org structured data (JSON-LD format) yang membantu search engine memahami informasi produk seperti price, availability, reviews, dll.

**Contoh dampak SEO:**

- **CSR:** Halaman muncul dengan judul dan snippet kosong di search results
- **SSR:** Halaman muncul dengan judul lengkap, snippet berisi deskripsi produk, dan potentially rich snippets

---

**2. Kapan sebaiknya menggunakan SSR?**

SSR sebaiknya digunakan dalam skenario berikut:

1. **E-Commerce & Product Catalog:** Seperti kasus praktikum ini. Platform e-commerce membutuhkan setiap product page ter-optimize untuk SEO karena pelanggan mencari produk melalui search engine.

2. **Content-Heavy Websites:** Blog, news sites, documentation yang membutuhkan SEO excellent agar konten mudah ditemukan melalui organic search.

3. **Landing Pages & Marketing Sites:** Halaman yang dirancang untuk konversi dan perlu maximum visibility di search engines.

4. **Public-Facing Applications:** Aplikasi yang kontennya di-share di social media dan memerlukan rich preview cards (Open Graph meta tags).

5. **Performance-Critical Applications:** Ketika First Contentful Paint (FCP) sangat penting untuk user experience dan conversion rate.

6. **Limited JavaScript Bundle Size:** Jika memiliki strict requirements untuk bundle size (misalnya untuk user dengan koneksi lambat atau device low-end).

7. **Offline Content Display:** Ketika perlu menampilkan konten meskipun JavaScript gagal load atau dinonaktifkan.

8. **Real-time Data yang Statis di View:** Data yang berubah jarang, cocok untuk di-render di server dan di-cache.

**Yang HARUS DIHINDARI untuk SSR:**

- Highly interactive applications yang memerlukan frequent updates
- Real-time collaborative tools (mirip Google Docs)
- Client-heavy interactive dashboards
- Aplikasi dengan extremely high traffic yang akan overload server

---

**3. Apa kekurangan SSR dibanding CSR?**

Server Side Rendering memiliki beberapa kekurangan signifikan dibanding CSR:

1. **Server Load Tinggi:**
   - Setiap request memerlukan server melakukan rendering React component menjadi HTML string
   - Ini memerlukan CPU resources yang substantial
   - Dengan banyak concurrent users, server dapat menjadi bottleneck

2. **Scalability Complexity:**
   - Harus menggunakan horizontal scaling (multiple servers) untuk handle traffic tinggi
   - Memerlukan load balancing dan session management yang lebih kompleks
   - Cost untuk infrastructure meningkat

3. **Latency Tergantung pada Server:**
   - User experience bergantung pada seberapa cepat server merespond
   - Jika database atau API call lambat, seluruh page load tertunda
   - Tidak bisa di-optimize di client-side untuk network latency

4. **Cache Invalidation Complexity:**
   - Ketika data berubah, harus invalidate cache dan re-render
   - Static generation (ISR) tidak cocok untuk data yang frequently updated

5. **Development Complexity:**
   - Developer harus memahami kedua world (server dan client)
   - Debugging lebih kompleks karena rendering happens di server
   - Error handling harus cover both server dan client scenarios

6. **Hydration Issues:**
   - Mismatch antara server-rendered HTML dan client-rendered content dapat menyebabkan flickering
   - JavaScript masih perlu di-execute di client untuk membuat konten interactive

7. **Limited Package Support:**
   - Tidak semua npm packages berfungsi di server-side environment
   - Browser APIs (window, localStorage, etc) tidak tersedia saat server rendering

8. **Harder to Test:**
   - Testing SSR lebih kompleks dibanding CSR karena melibatkan server environment
   - Memerlukan jsdom atau headless browser untuk testing

9. **Worse Time to Interactive (TTI):**
   - Meskipun FCP cepat (konten terlihat), JavaScript masih perlu di-execute untuk membuat halaman fully interactive
   - User tidak bisa berinteraksi dengan halaman sampai hydration selesai

---

**4. Mengapa skeleton tidak muncul pada SSR?**

Skeleton loading tidak muncul pada SSR karena karakteristik fundamental dari server-side rendering:

1. **Data Available at Render Time:**

   ```tsx
   // SSR dengan getServerSideProps
   export async function getServerSideProps() {
     const res = await fetch("http://localhost:3000/api/produk");
     const response = await res.json();

     return {
       props: {
         products: response.data, // Data sudah tersedia
       },
     };
   }
   ```

   Server SUDAH MEMILIKI data sebelum merender component. Tidak ada state "loading" karena data sudah siap.

2. **Rendering Terjadi di Server:**
   - Server tidak perlu menampilkan skeleton
   - Server langsung merender component dengan data lengkap:
     ```tsx
     <div className="produk__content__item">
       <h4>Produk ABC</h4>
       <p>Rp 299.000</p>
     </div>
     ```

3. **Kontras dengan CSR:**

   ```tsx
   // CSR dengan useEffect
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     setIsLoading(true); // Skeleton ditampilkan
     fetch("/api/produk").then((res) => setProducts(res.data));
     setIsLoading(false); // Skeleton hilang, data ditampilkan
   }, []);
   ```

   CSR pertama kali render dengan `isLoading=true`, menampilkan skeleton. Setelah data datang, state berubah ke `isLoading=false`.

4. **Page Load Blocking:**
   - Dengan SSR, browser tidak akan render halaman sampai server selesai fetch data
   - Browser hanya receives halaman yang sudah complete dengan konten
   - User tidak melihat proses loading skeleton, hanya melihat halaman yang fully loaded

5. **User Perception:**
   - **CSR:** User melihat skeleton → tunggu → data muncul (perceivable loading experience)
   - **SSR:** User hanya melihat loading browser indicator (atau nothing) → halaman muncul langsung (seamless experience)

6. **Network Flow Perbedaan:**

   **CSR Flow:**

   ```
   Browser request HTML
   ↓
   Server return HTML (skeleton)
   ↓
   Browser render skeleton
   ↓
   JavaScript fetch API
   ↓
   API return data
   ↓
   JavaScript render actual content
   ```

   **SSR Flow:**

   ```
   Browser request HTML
   ↓
   Server fetch data
   ↓
   Server render component dengan data
   ↓
   Server return HTML (with data)
   ↓
   Browser render complete page immediately
   ```

7. **Trade-off Consideration:**
   - Meskipun tidak ada "loading appearance", user masih menunggu server processing time
   - Jika API lambat, user menunggu lebih lama sebelum response dikirim
   - Skeleton di CSR memberikan feedback visual bahwa sesuatu sedang terjadi
   - SSR lebih "silent" - user hanya melihat loading browser indicator
