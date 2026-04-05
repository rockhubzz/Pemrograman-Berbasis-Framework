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
