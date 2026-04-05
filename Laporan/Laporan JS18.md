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
