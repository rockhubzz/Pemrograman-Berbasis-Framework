# Deployment Aplikasi Next.js ke Vercel

## PRAKTIKUM 1 – Membuat Repository GitHub

1. Buat Repository Baru

1. Login ke GitHub
1. Klik New Repository
1. Beri nama repository
1. Pilih Private/Public
1. Klik Create Repository

![alt text](image.png)

![alt text](image-1.png)

2. Hubungkan Project Lokal ke GitHub

- Cek konfigurasi Git:
  - git config --global user.name
  - git config --global user.email

- Jika belum ada:
  - git config --global user.name "username_github"
  - git config --global user.email "email_github"

    ```ps
    PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git config --global user.email "compatiblewindows8@gmail.com"
    PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git config --global user.name "raki"
    ```

3. Tambahkan Remote Repository
   - git remote add origin https://github.com/username/repository.git
   - git add .
   - git commit -m "Initial deployment"
   - git push origin main

     ```ps
     PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git init
     Initialized empty Git repository in C:/Users/raki/Documents/raki6/Pemrograman Berbasis Framework/Code/Deploy/.git/
     PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git remote add origin https://github.com/wingit88/my-next-app.git
     PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git add .
     warning: in the working copy of '.eslintrc.json', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'next.config.js', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'package-lock.json', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'postcss.config.js', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'src/__test__/components/__snapshots__/footer.spec.tsx.snap', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'src/__test__/pages/__snapshots__/about.spec.tsx.snap', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'src/__test__/pages/__snapshots__/produk.spec.tsx.snap', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'src/pages/_app.tsx', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'src/pages/_document.tsx', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'src/pages/api/hello.ts', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'src/pages/index.tsx', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'src/styles/Home.module.css', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'src/styles/globals.css', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'tailwind.config.js', LF will be replaced by CRLF the next time Git touches it
     warning: in the working copy of 'tsconfig.json', LF will be replaced by CRLF the next time Git touches it
     PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git commit -m "Initial Deployment"
     [master (root-commit) 9c40321] Initial Deployment
     83 files changed, 16200 insertions(+)
     create mode 100644 .eslintrc.json
     create mode 100644 .gitignore
     create mode 100644 README.md
     create mode 100644 jest.config.mjs
     create mode 100644 next.config.js
     create mode 100644 package-lock.json
     create mode 100644 package.json
     create mode 100644 postcss.config.js
     create mode 100644 public/favicon.ico
     create mode 100644 public/next.svg
     create mode 100644 public/page-eaten.png
     create mode 100644 public/produk/headphone.png
     create mode 100644 public/produk/sepatu-olahraga.png
     create mode 100644 public/produk/tas-kulit.png
     create mode 100644 public/vercel.svg
     create mode 100644 src/Middleware/withAuth.ts
     create mode 100644 src/__test__/components/__snapshots__/footer.spec.tsx.snap
     create mode 100644 src/__test__/components/footer.spec.tsx
     create mode 100644 src/__test__/pages/__snapshots__/about.spec.tsx.snap
     create mode 100644 src/__test__/pages/__snapshots__/produk.spec.tsx.snap
     create mode 100644 src/__test__/pages/about.spec.tsx
     create mode 100644 src/__test__/pages/produk.spec.tsx
     create mode 100644 src/components/layouts/AppShell/index.tsx
     create mode 100644 src/components/layouts/footer/index.tsx
     create mode 100644 src/components/layouts/navbar/index.tsx
     create mode 100644 src/components/layouts/navbar/navbar.module.css
     create mode 100644 src/lib/auth.ts
     create mode 100644 src/middleware.ts
     create mode 100644 src/pages/404.tsx
     create mode 100644 src/pages/_app.tsx
     create mode 100644 src/pages/_document.tsx
     create mode 100644 src/pages/about/index.tsx
     create mode 100644 src/pages/admin/index.tsx
     create mode 100644 src/pages/api/[[...produk]].ts
     create mode 100644 src/pages/api/auth/[...nextauth].ts
     create mode 100644 src/pages/api/hello.ts
     create mode 100644 src/pages/api/register.ts
     create mode 100644 src/pages/api/revalidate.ts
     create mode 100644 src/pages/api/stores.ts
     create mode 100644 src/pages/auth/login.tsx
     create mode 100644 src/pages/auth/register.tsx
     create mode 100644 src/pages/blog/[slug].tsx
     create mode 100644 src/pages/category/[...slug].tsx
     create mode 100644 src/pages/editor/index.tsx
     create mode 100644 src/pages/index.tsx
     create mode 100644 src/pages/produk/[produk].tsx
     create mode 100644 src/pages/produk/csr/[produk].tsx
     create mode 100644 src/pages/produk/index.tsx
     create mode 100644 src/pages/produk/produk.module.scss
     create mode 100644 src/pages/produk/server.tsx
     create mode 100644 src/pages/produk/ssg/[produk].tsx
     create mode 100644 src/pages/produk/ssr/[produk].tsx
     create mode 100644 src/pages/produk/static.tsx
     create mode 100644 src/pages/profile/edit.tsx
     create mode 100644 src/pages/profile/index.tsx
     create mode 100644 src/pages/setting/app.tsx
     create mode 100644 src/pages/shop/[[...slug]].tsx
     create mode 100644 src/pages/stores/csr.tsx
     create mode 100644 src/pages/stores/ssg.tsx
     create mode 100644 src/pages/stores/ssr.tsx
     create mode 100644 src/pages/user/index.tsx
     create mode 100644 src/pages/user/password/index.tsx
     create mode 100644 src/styles/404.module.scss
     create mode 100644 src/styles/Home.module.css
     create mode 100644 src/styles/colors.scss
     create mode 100644 src/styles/globals.css
     create mode 100644 src/types/Produk.type.ts
     create mode 100644 src/types/Store.type.ts
     create mode 100644 src/utils/db/firebase.ts
     create mode 100644 src/utils/db/servicefirebase.ts
     create mode 100644 src/utils/swr/fetcher.ts
     create mode 100644 src/views/DetailProduct/detailProduct.module.scss
     create mode 100644 src/views/DetailProduct/index.tsx
     create mode 100644 src/views/auth/login/index.tsx
     create mode 100644 src/views/auth/login/login.module.css
     create mode 100644 src/views/auth/login/login.module.scss
     create mode 100644 src/views/auth/register/index.tsx
     create mode 100644 src/views/auth/register/register.module.css
     create mode 100644 src/views/auth/register/register.module.scss
     create mode 100644 src/views/produk/index.tsx
     create mode 100644 src/views/stores/index.tsx
     create mode 100644 tailwind.config.js
     create mode 100644 tsconfig.json
     PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git push origin main
     Everything up-to-date
     ```

- Pastikan repository di GitHub sudah terisi file project.

  ![alt text](image-2.png)

---

## PRAKTIKUM 2 – Deployment ke Vercel

1. Login ke Vercel

- Buka: https://vercel.com
- Login menggunakan GitHub (kalau blm punya akun buat terlebih dahulu)

  ![alt text](image-3.png)

2. Import Project
   - Klik Add New Project

     ![alt text](image-4.png)

   - Install terlebih dahulu githubnya

     ![alt text](image-5.png)

   - Klik Import

     ![alt text](image-6.png)

     ![alt text](image-7.png)

   - Fix error saat deploy
     - Hilangkan kode static-site generation

       ```tsx
       {
         /*digunakan static-site generation*/
       }
       // export async function getStaticPaths() {
       //     const res = await fetch('http://localhost:3000/api/products')
       //     const response = await res.json()

       //     const paths = response.data.map((product: ProductType) => ({
       //         params: { produk: product.id }
       //     }))
       //     // console.log("Paths yang dihasilkan untuk produk:", paths); // Debugging: Tampilkan paths yang dihasilkan
       //     return {
       //         paths,
       //         fallback: false
       //     }
       // }
       ```

     - Ganti dengan server-side rendering

       ```tsx
       {
         /*digunakan server-side rendering*/
       }
       export async function getServerSideProps({
         params,
       }: {
         params: { produk: string };
       }) {
         const res = await fetch(
           `http://localhost:3000/api/produk/${params?.produk}`,
         );
         const respone = await res.json();
         // console.log("Data produk yang diambil dari API:", respone);
         return {
           props: {
             product: respone.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
           },
         };
       }
       ```

   - Berhasil deploy

     ![alt text](image-8.png)

3. Gunakan Environment Variable
   - Buat di .env.local:

     `NEXT_PUBLIC_API_URL=http://localhost:3000`

   - Ganti semua hardcoded URL menjadi:
     `process.env.NEXT_PUBLIC_API_URL`
     - Pada [produk].tsx

       ```tsx
       const res = await fetch(
         `http://localhost:3000/api/produk/${params?.produk}`,
       );
       ```

       menjadi:

       ```tsx
       const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/api/produk/${params?.produk}`,
       );
       ```

     - Pada server.tsx

       ```tsx
       const res = await fetch("http://localhost:3000/api/produk");
       ```

       menjadi:

       ```tsx
       const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/produk");
       ```

   - Commit dan push kembali

     ```ps
     PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git add .
     PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git commit -m "replace localhost api with vercel api url"
     [main 3375196] replace localhost api with vercel api url
     2 files changed, 2 insertions(+), 2 deletions(-)
     PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Deploy> git push origin main
     Enumerating objects: 13, done.
     Counting objects: 100% (13/13), done.
     Delta compression using up to 8 threads
     Compressing objects: 100% (7/7), done.
     Writing objects: 100% (7/7), 638 bytes | 159.00 KiB/s, done.
     Total 7 (delta 6), reused 0 (delta 0), pack-reused 0 (from 0)
     remote: Resolving deltas: 100% (6/6), completed with 6 local objects.
     To https://github.com/wingit88/my-next-app.git
     18528d7..3375196  main -> main
     ```

   - Selanjutnya import lakukan pengaturannya sbb

     Project sudah berhasil di-import dan otomatis memperbarui dengan commit terakhir

     ![alt text](image-9.png)

     Ubah setting Install command

     ![alt text](image-10.png)

     Lakukan Redeploy

     ![alt text](image-11.png)

   - Visit web yang sudah dideploy

     ![alt text](image-12.png)

   - Tambahan: Tambahkan URL vercel ke Authorized origins pada OAuth Google dan Github untuk memastikan login bekerja
     - Google

       ![alt text](image-13.png)

     - GitHub

       ![alt text](image-14.png)

---

## PRAKTIKUM 3 – Menambahkan Environment Variable di Vercel

1. Buka Project di Vercel
   - Settings → Environment Variables

     ![alt text](image-15.png)

2. Import dari .env.local
   - Klik Import .env dan setting next_public_api_url sesuai dengan url vercel project atau isi manual:
     `NEXT_PUBLIC_API_URL=https://namaproject.vercel.app`

     ![alt text](image-16.png)

3. Redeploy
   - Deployment → Redeploy

     ![alt text](image-17.png)

---

## PRAKTIKUM 4 – Konfigurasi Google OAuth Production

Origin dan Redirect URL vercel.app telah ditambahkan pada OAuth Google dan GitHub pada tambahan Praktikum 2

- Google
  ![alt text](image-13.png)
- GitHub
  ![alt text](image-14.png)

**Note : ada kesalahan pada code index.tsx pada folder views/auth/login**

Code sebelumnya

```tsx
<button
  onClick={() => signIn("google", { callbackUrl, redirect: false })}
  className={style.login_form_item__button}
  disabled={isLoading}
>
  {isLoading ? "Loading..." : "Sign in with Google"}
</button>
```

Code dimodifikasi

```tsx
<button
  type="button"
  onClick={() => signIn("google", { callbackUrl, redirect: false })}
  className={style.login_form_item__button}
>
  Sign in with Google
</button>
```

## PRAKTIKUM 5 – Pengujian Setelah Deployment

Coba akses:

- /

  ![alt text](image-18.png)

- /about

  ![alt text](image-19.png)

- /product

  ![alt text](image-20.png)

- /profile

  ![alt text](image-21.png)

- Login Google

  ![alt text](image-22.png)

  ![alt text](image-23.png)

- Login credential biasa

  ![alt text](image-24.png)

  ![alt text](image-25.png)

- Login GitHub

  ![alt text](image-26.png)

  ![alt text](image-27.png)
