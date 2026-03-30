# Incremental Static Regeneration (ISR)

## Implementasi ISR Otomatis

### Bagian 1 – Tambahkan revalidate

- Buka halaman static.tsx pada folder src/pages/produk

```tsx
    revalidate: 10,
```

### Bagian 2 – Pengujian ISR

1. Jalankan: ( lakukan hal sama seperti JS sebelumnya untuk ngebuild SSG)
   - npm run build ( jika berhasil )

     ```shell
     Route (pages)                                   Revalidate  Expire
     ┌ ○ /
     ├   /_app
     ├ ○ /404
     ├ ○ /about
     ├ ƒ /api/[[...produk]]
     ├ ƒ /api/hello
     ├ ƒ /api/stores
     ├ ○ /auth/login
     ├ ○ /auth/register
     ├ ○ /blog/[slug]
     ├ ○ /category/[...slug]
     ├ ○ /produk
     ├ ● /produk/[produk] (1480 ms)
     │ ├ /produk/HjnApBuIHCqGRs4tohUE
     │ ├ /produk/SISCyghWQD6r59SKGq13
     │ ├ /produk/YmLit7NxajgMUcG4aEcW
     │ └ [+3 more paths]
     ├ ○ /produk/csr/[produk]
     ├ ƒ /produk/server
     ├ ● /produk/ssg/[produk] (6082 ms)                      1m      1y
     │ ├ /produk/ssg/HjnApBuIHCqGRs4tohUE (1016 ms)
     │ ├ /produk/ssg/SISCyghWQD6r59SKGq13 (1015 ms)
     │ ├ /produk/ssg/YmLit7NxajgMUcG4aEcW (1013 ms)
     │ ├ /produk/ssg/YzzoRPqOmnShGhuhNa8v (1013 ms)
     │ ├ /produk/ssg/pmfhHbqHj8e5BAmBFQdb (1013 ms)
     │ └ /produk/ssg/uI2Dij8284Xq5ECSahAw (1012 ms)
     ├ ƒ /produk/ssr/[produk]
     ├ ● /produk/static (1026 ms)                           10s      1y
     ├ ○ /profile
     ├ ○ /profile/edit
     ├ ○ /setting/app
     ├ ○ /shop/[[...slug]]
     ├ ○ /stores/csr
     ├ ● /stores/ssg (1017 ms)                               1h      1y
     ├ ƒ /stores/ssr
     ├ ○ /user
     └ ○ /user/password

     ○  (Static)   prerendered as static content
     ●  (SSG)      prerendered as static HTML (uses getStaticProps)
     ƒ  (Dynamic)  server-rendered on demand
     ```

   - npm run start

   ```shell
   PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 11\incremental-staticregeneration> npm run start

   > link-navigation@0.1.0 start
   > next start

   ▲ Next.js 16.1.6
   - Local:         http://localhost:3000
   - Network:       http://192.168.23.1:3000

   ✓ Starting...
   ✓ Ready in 2.3s
   ```

2. Tambahkan data baru di database pada firebase

   ![alt text](image.png)

3. Refresh halaman sebelum 10 detik → Data lama.
   - Sebelum 10 detik data yang akan ditampilkan masih data lama

   ![alt text](image-1.png)

4. Refresh setelah 10 detik → Data baru muncul.

   ![alt text](image-2.png)

---
