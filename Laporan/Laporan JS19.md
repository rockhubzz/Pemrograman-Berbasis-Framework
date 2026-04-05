# Implementasi Unit Testing pada Next.js menggunakan Jest

## PRAKTIKUM 1 – Setup Jest di Next.js

1. Install Dependencies
   - Jalankan:

     `npm install jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom --save-dev`

     ```shell
     PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 18\unit-testing> npm install jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom --save-dev
     npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
     npm warn deprecated whatwg-encoding@3.1.1: Use @exodus/bytes instead for a more spec-conformant and faster implementation
     npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
     npm warn deprecated glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me

     added 285 packages, and audited 794 packages in 46s

     200 packages are looking for funding
     run `npm fund` for details

     7 vulnerabilities (3 moderate, 4 high)

     To address issues that do not require attention, run:
     npm audit fix

     To address all issues, run:
     npm audit fix --force

     Run `npm audit` for details.
     ```

2. Buat File Konfigurasi
   - Buat file: `jest.config.mjs`

     ![alt text](image.png)

   - Isi dengan:

     ```mjs
     import nextJest from "next/jest.js";

     const createJestConfig = nextJest({
       dir: "./",
     });

     const config = {
       coverageProvider: "v8",
       testEnvironment: "jsdom",
     };

     export default createJestConfig(config);
     ```

3. Tambahkan Script di package.json

   ```json
   "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint": "next lint",
       "test": "jest --passWithNoTests -u",
       "test:coverage": "npm run test -- --coverage",
       "test:watch": "jest --watch"
   },
   ```

---

## PRAKTIKUM 2 – Struktur Folder Testing

Buat folder:<br>
`src/__test__/`

Struktur contoh:

![alt text](image-1.png)

---

## PRAKTIKUM 3 – Testing Halaman About

1. Buat File Testing

   ![alt text](image-2.png)

2. Contoh Testing Snapshot. Pada about.spec.tsx tambahkan code berikut :

   ```tsx
   import { render } from "@testing-library/react";
   import AboutPage from "../../pages/about";

   describe("AboutPage", () => {
     it("renders the about page correctly", () => {
       const page = render(<AboutPage />);
       expect(page).toMatchSnapshot();
     });
   });
   ```

3. Jalankan Testing

- npm run test

  ```shell
  PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 18\unit-testing> npm run test

  > link-navigation@0.1.0 test
  > jest --passWithNoTests -u

  PASS  src/__test__/pages/about.spec.tsx
  AboutPage
      √ renders the about page correctly (35 ms)

  › 1 snapshot written.
  Snapshot Summary
  › 1 snapshot written from 1 test suite.

  Test Suites: 1 passed, 1 total
  Tests:       1 passed, 1 total
  Snapshots:   1 written, 1 total
  Time:        2.937 s
  Ran all test suites.
  ```

- Jika berhasil:<br>
  `PASS about.spec.tsx`

---

## PRAKTIKUM 4 – Coverage Report

- Jalankan:
  - npm run test:coverage

    ```ps
    PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 18\unit-testing> npm run test:coverage

    > link-navigation@0.1.0 test:coverage
    > npm run test -- --coverage


    > link-navigation@0.1.0 test
    > jest --passWithNoTests -u --coverage

    PASS  src/__test__/pages/about.spec.tsx
    AboutPage
        √ renders the about page correctly (40 ms)

    -----------|---------|----------|---------|---------|-------------------
    File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
    -----------|---------|----------|---------|---------|-------------------
    All files  |     100 |      100 |     100 |     100 |
    index.tsx |     100 |      100 |     100 |     100 |
    -----------|---------|----------|---------|---------|-------------------
    Test Suites: 1 passed, 1 total
    Tests:       1 passed, 1 total
    Snapshots:   1 passed, 1 total
    Time:        3.499 s
    Ran all test suites.
    ```

- Akan muncul folder: coverage/
  - Buka:
    - `coverage/lcov-report/index.html` ( buka di melalui explorer)

      ![alt text](image-3.png)

---

## PRAKTIKUM 5 – Konfigurasi Coverage Lengkap

- Update jest.config.mjs:

  ```mjs
  import nextJest from "next/jest.js";

  const createJestConfig = nextJest({
    dir: "./",
  });

  const config = {
    testEnvironment: "jsdom",
    modulePaths: ["<rootDir>/src/"],
    collectCoverage: true,
    collectCoverageFrom: [
      "**/*.{ts,tsx}",
      "**/*.d.ts",
      "!**/node_modules/**",
      "!**/.next/**",
      "!**/coverage/**",
      "!**/jest.config.mjs",
      "!**/next.config.mjs",
      "!**/types/**",
      "!**/views/**",
      "!**/pages/api/**",
    ],
  };

  export default createJestConfig(config);
  ```

- Jalankan `npm run test:coverage`

  ```ps
  S C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 18\unit-testing> npm run test:coverage

  > link-navigation@0.1.0 test:coverage
  > npm run test -- --coverage


  > link-navigation@0.1.0 test
  > jest --passWithNoTests -u --coverage

  PASS  src/__test__/pages/about.spec.tsx
  AboutPage
      √ renders the about page correctly (34 ms)

  ----------------------------------------------|---------|----------|---------|---------|-------------------
  File                                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
  ----------------------------------------------|---------|----------|---------|---------|-------------------
  All files                                     |    0.32 |        0 |    1.44 |    0.37 |
  unit-testing                                 |       0 |      100 |     100 |       0 |
  next-env.d.ts                               |       0 |      100 |     100 |       0 | 3
  unit-testing/src                             |       0 |        0 |       0 |       0 |
  middleware.ts                               |       0 |        0 |       0 |       0 | 1-29
  unit-testing/src/Middleware                  |       0 |        0 |       0 |       0 |
  withAuth.ts                                 |       0 |        0 |       0 |       0 | 1-40
  unit-testing/src/components/layouts/AppShell |       0 |        0 |       0 |       0 |
  index.tsx                                   |       0 |        0 |       0 |       0 | 1-38
  unit-testing/src/components/layouts/footer   |       0 |      100 |       0 |       0 |
  index.tsx                                   |       0 |      100 |       0 |       0 | 1-9
  unit-testing/src/components/layouts/navbar   |       0 |        0 |       0 |       0 |
  index.tsx                                   |       0 |        0 |       0 |       0 | 1-58
  unit-testing/src/lib                         |       0 |      100 |       0 |       0 |
  auth.ts                                     |       0 |      100 |       0 |       0 | 1-7
  unit-testing/src/pages                       |       0 |      100 |       0 |       0 |
  404.tsx                                     |       0 |      100 |       0 |       0 | 1-36
  _app.tsx                                    |       0 |      100 |       0 |       0 | 1-7
  _document.tsx                               |       0 |      100 |       0 |       0 | 1-3
  index.tsx                                   |       0 |      100 |       0 |       0 | 3-9
  unit-testing/src/pages/about                 |     100 |      100 |     100 |     100 |
  index.tsx                                   |     100 |      100 |     100 |     100 |
  unit-testing/src/pages/admin                 |       0 |      100 |       0 |       0 |
  index.tsx                                   |       0 |      100 |       0 |       0 | 1-18
  unit-testing/src/pages/auth                  |       0 |      100 |       0 |       0 |
  login.tsx                                   |       0 |      100 |       0 |       0 | 1-11
  register.tsx                                |       0 |      100 |       0 |       0 | 2-12
  unit-testing/src/pages/blog                  |       0 |      100 |       0 |       0 |
  [slug].tsx                                  |       0 |      100 |       0 |       0 | 1-14
  unit-testing/src/pages/category              |       0 |        0 |       0 |       0 |
  [...slug].tsx                               |       0 |        0 |       0 |       0 | 1-22
  unit-testing/src/pages/editor                |       0 |      100 |       0 |       0 |
  index.tsx                                   |       0 |      100 |       0 |       0 | 1-19
  unit-testing/src/pages/produk                |       0 |        0 |       0 |       0 |
  [produk].tsx                                |       0 |      100 |       0 |       0 | 4-65
  index.tsx                                   |       0 |        0 |       0 |       0 | 1-25
  server.tsx                                  |       0 |      100 |       0 |       0 | 1-22
  static.tsx                                  |       0 |      100 |       0 |       0 | 1-22
  unit-testing/src/pages/produk/csr            |       0 |        0 |       0 |       0 |
  [produk].tsx                                |       0 |        0 |       0 |       0 | 1-53
  unit-testing/src/pages/produk/ssg            |       0 |        0 |       0 |       0 |
  [produk].tsx                                |       0 |        0 |       0 |       0 | 1-69
  unit-testing/src/pages/produk/ssr            |       0 |        0 |       0 |       0 |
  [produk].tsx                                |       0 |        0 |       0 |       0 | 1-46
  unit-testing/src/pages/profile               |       0 |      100 |       0 |       0 |
  edit.tsx                                    |       0 |      100 |       0 |       0 | 3-9
  index.tsx                                   |       0 |      100 |       0 |       0 | 3-11
  unit-testing/src/pages/setting               |       0 |      100 |       0 |       0 |
  app.tsx                                     |       0 |      100 |       0 |       0 | 1-9
  unit-testing/src/pages/shop                  |       0 |        0 |       0 |       0 |
  [[...slug]].tsx                             |       0 |        0 |       0 |       0 | 1-23
  unit-testing/src/pages/stores                |       0 |        0 |       0 |       0 |
  csr.tsx                                     |       0 |        0 |       0 |       0 | 1-18
  ssg.tsx                                     |       0 |      100 |       0 |       0 | 1-23
  ssr.tsx                                     |       0 |      100 |       0 |       0 | 1-24
  unit-testing/src/pages/user                  |       0 |      100 |       0 |       0 |
  index.tsx                                   |       0 |      100 |       0 |       0 | 1-9
  unit-testing/src/pages/user/password         |       0 |      100 |       0 |       0 |
  index.tsx                                   |       0 |      100 |       0 |       0 | 1
  unit-testing/src/utils/db                    |       0 |        0 |       0 |       0 |
  firebase.ts                                 |       0 |      100 |     100 |       0 | 2-19
  servicefirebase.ts                          |       0 |        0 |       0 |       0 | 12-145
  unit-testing/src/utils/swr                   |       0 |      100 |       0 |       0 |
  fetcher.ts                                  |       0 |      100 |       0 |       0 | 1-3
  ----------------------------------------------|---------|----------|---------|---------|-------------------
  Test Suites: 1 passed, 1 total
  Tests:       1 passed, 1 total
  Snapshots:   1 passed, 1 total
  Time:        8.437 s
  Ran all test suites.
  ```

- Jika dilihat di index.htmlnya

  ![alt text](image-4.png)

---
