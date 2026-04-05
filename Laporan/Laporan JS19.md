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
