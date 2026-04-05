# Optimasi Performa Aplikasi Menggunakan Fitur Next.js

## PRAKTIKUM 1 – Image Optimization

### A. Optimasi Gambar Lokal (Public Folder)

- Studi Kasus:

  Mengganti tag <img> pada halaman 404 dengan next/image.

  Langkah:
  - Buka file src/pages/404.tsx
  - Modifikasi line 7 menjadi line 8-11

    ```tsx
    {
      /* <img
            src="/page-eaten.png"
            alt="404"
            className={styles.image}
            /> */
    }

    <Image
      src="/page-eaten.png"
      alt="404"
      className={styles.error_image}
      width={400}
      height={200}
    />;
    ```

  Hasil:

  ![alt text](image.png)
  - Warning hilang
  - Image dioptimasi otomatis
  - Mengurangi bandwidth
  - Mendukung lazy loading otomatis

### B. Optimasi Gambar Remote (External URL)

- Buka file views/product/index.tsx
- Modifikasi file index.tsx

  ```tsx
  <div className={styles.produk__content__item__image}>
    <Image src={products.image} alt={products.name} width={200} height={200} />
  </div>
  ```

- Buka file next.config.js

  ```tsx
      remotePatterns: [
        {
            protocol: 'https',
            hostname: 'assets.adidas.com',
            port: '',
            pathname: '/**',
        },
      ],
  ```

Hasil:

![alt text](image-1.png)

- Gambar di-proxy melalui /\_next/image
- Performa lebih optimal
- Kompresi otomatis

---

## PRAKTIKUM 2 – Font Optimization

### A. Menggunakan next/font

- Buka file index.tsx pada folder Appshell/index.tsx dan modifkasi

  ```tsx
  import { Roboto } from "next/font/google";

  const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
  });

  // ...

  <main className={roboto.className}>
    {!disableNavbar.includes(pathname) && <Navbar />}
    {children}
  </main>;
  ```

- Jalankan browser localhost:3000/produk maka font akan berubah menjadi roboto untuk mengecek fontnya bisa menggunakan extension FontFinder

  ![alt text](image-2.png)

Hasil:

- Tidak perlu load dari CDN manual
- Tidak blocking render
- Performance meningkat
- Tidak terjadi FOUT (Flash of Unstyled Text)

## PRAKTIKUM 3 – Script Optimization

### A. Menggunakan next/script

- Buka file index.tsx pada folder layouts/Navbar dan modifikasi

  ```tsx
  import Script from "next/script";

  // ...

      <div className={styles.navbar}>
      {/* <div className={styles.navbar__brand}>
          MyApp
      </div> */}

      <div className={styles.navbar__brand} id='title'></div>
      <Script id='title-script' strategy='lazyOnload'>
          {`document.getElementById('title').innerHTML = 'MyApp';`}
      </Script>


  ```

Hasil:

![alt text](image-3.png)

- Script tidak blocking
- Cocok untuk Google Analytics
- Performa lebih ringan

## PRAKTIKUM 4 – Optimasi Avatar dengan next/image

- Buka file index.tsx pada folder layouts/navbar dan modifikasi :

  ```tsx
  import Script from "next/dist/client/script";

  <Image
    width={50}
    height={50}
    src={data.user.image}
    alt="User Image"
    priority={false}
    className={styles.navbar__user__image}
  />;
  ```

- Tambahkan hostname Google:

  ```js
      {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
      },
  ```

## Tugas Praktikum

1. Optimasi semua image di project menggunakan next/image
   Pada page /stores kini menggunakan next/image untuk foto stores

   ```tsx
   // src/views/stores/index.tsx

   <Image
     src={store.image}
     alt={store.name}
     fill
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     style={{ objectFit: "cover" }}
     priority={false}
   />
   ```

2. Gunakan minimal 1 font dari next/font

   Halaman /stores kini menggunakan font Poppins dari next/font/google

   ```tsx
   import { Poppins } from "next/font/google";

   const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
   variable: "--font-poppins",
   });

       <div className={`${styles.produk} ${poppins.className}`}>

   ```

   ![alt text](image-4.png)

3. Tambahkan script Google Analytics menggunakan next/script

   Tambahan script pada `src/views/stores/index.tsx`:

   ```tsx
       <Script
           src="https://www.googletagmanager.com/gtag/js?id=G-8RYP9TYTNN"
           strategy="afterInteractive"
       />
       <Script
           id="google-analytics"
           strategy="afterInteractive"
           dangerouslySetInnerHTML={{
           __html: `
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', 'G-8RYP9TYTNN', {
               'debug_mode': true,
               'allow_google_signals': false,
               'anonymize_ip': true
               });
           `,
           }}
       />
   ```

4. Terapkan dynamic import pada minimal 1 komponen
   - Modifikasi kode pada `src/components/layouts/AppShell/index.tsx`

     ```tsx
     import dynamic from "next/dynamic";

     const Navbar = dynamic(() => import("../navbar"), {
       ssr: true,
       loading: () => <div style={{ height: "70px", background: "#f0f0f0" }} />,
     });

     const Footer = dynamic(() => import("../footer"), {
       ssr: false,
       loading: () => (
         <div style={{ height: "200px", background: "#f0f0f0" }} />
       ),
     });
     ```

     - Perubahan ini meningkatkan performa aplikasi melalui penggunaan dynamic import untuk code splitting serta penambahan loading state berupa skeleton agar tampilan tetap responsif saat komponen dimuat. Selain itu, optimasi SSR pada Navbar dan client-side rendering pada Footer membantu menyeimbangkan kebutuhan SEO dan efisiensi rendering.

5. Dokumentasikan perubahan performa (screenshot Lighthouse)
   - Hasil Lighthouse Praktikum 16

     ![alt text](image-6.png)

   - Hasil Lighthouse Praktikum 17

     ![alt text](image-5.png)

---

## Refleksi & Diskusi

1. **Mengapa `<img>` biasa tidak optimal?**  
   Tag `<img>` tidak memiliki optimasi bawaan seperti lazy loading, resizing otomatis, atau format gambar modern. Hal ini bisa menyebabkan loading lebih lambat dan penggunaan bandwidth lebih besar dibanding solusi seperti next/image.

2. **Apa perbedaan font CDN dan next/font?**  
   Font CDN di-load dari server eksternal sehingga bergantung pada jaringan dan bisa menambah request. Sedangkan next/font mengoptimalkan font secara lokal (self-hosted), mengurangi request eksternal dan meningkatkan performa serta konsistensi tampilan.

3. **Mengapa script bisa membuat website lambat?**  
   Script, terutama yang besar atau blocking, dapat menghambat proses rendering halaman. Browser harus menunggu script selesai di-load dan dieksekusi sebelum menampilkan konten, sehingga memperlambat waktu loading.

4. **Kapan harus menggunakan dynamic import?**  
   Dynamic import digunakan ketika ingin memuat komponen atau library hanya saat dibutuhkan. Ini cocok untuk fitur berat atau yang jarang digunakan, sehingga dapat mengurangi ukuran bundle awal dan mempercepat loading.

5. **Apa dampak bundle size terhadap UX?**  
   Semakin besar bundle size, semakin lama waktu download dan eksekusi JavaScript. Hal ini dapat menyebabkan loading lambat, interaksi tertunda, dan pengalaman pengguna menjadi kurang nyaman.
