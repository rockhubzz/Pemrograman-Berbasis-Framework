# Register User dengan Hash Password & Validasi

## Bagian 1 – Membuat Register View

- Buat folder pada views dengan nama register dan tambahkan 2 file yaitu index.tsx dan register.module.scss

  ![alt text](imgs/JS15/image.png)

- Modifikasi file index.tsx ( pada folder views/auth/register/index.tsx)

  ```tsx
  import Link from "next/link";
  import styles from "./register.module.scss";

  const TampilanRegister = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.register_title}>Halaman Register</h1>
        <Link href="/auth/login" className={styles.link}>
          Ke halaman login
        </Link>
      </div>
    );
  };

  export default TampilanRegister;
  ```

- Modifikasi file register.tsx ( pada folder pages/auth/register.tsx )

  ```tsx
  import TampilanRegister from "@/views/auth/register";

  const HalamanRegister = () => {
    return (
      <>
        <TampilanRegister />
      </>
    );
  };

  export default HalamanRegister;
  ```

- Modifikasi register.module.scss

  ```scss
  .register {
    padding: 40px;
  }

  .register_title {
    font-size: 28px;
    font-weight: bold;
  }
  ```

- Tambahkan form inputan pada file index.tsx ( pada folder views/auth/register/index.tsx ) Form berisi:
  - Email

    ```tsx
    <div className={style.register__form_item}>
      <label htmlFor="email" className={style.register__form_item__label}>
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        className={style.register__form_item__input}
      />
    </div>
    ```

  - Full Name

    ```tsx
    <div className={style.register__form_item}>
      <label htmlFor="Fullname" className={style.register__form_item__label}>
        Fullname
      </label>
      <input
        type="text"
        id="Fullname"
        name="Fullname"
        placeholder="Fullname"
        className={style.register__form_item__input}
      />
    </div>
    ```

  - Password

    ```tsx
    <div className={style.register__form_item}>
      <label htmlFor="Password" className={style.register__form_item__label}>
        Password
      </label>
      <input
        type="password"
        id="Password"
        name="Password"
        placeholder="Password"
        className={style.register__form_item__input}
      />
    </div>
    ```

- Modifikasi register.module.scss

  ```scss
  .register {
    min-height: 100vh;
    display: flex;
    flex-direction: column; /* <- penting */
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    padding: 20px;

    &__title {
      width: 100%;
      text-align: center;
      font-size: 36px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 40px;
    }

    &__form {
      background: #ffffff;
      width: 100%;
      max-width: 420px;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

      &__item {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        &__label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        &__input {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #ddd;
          font-size: 14px;
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: #2a5298;
            box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.2);
          }
        }

        button {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #2a5298;
          color: #ffffff;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;

          &:hover {
            background: #1e3c72;
            transform: translateY(-2px);
          }
        }
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .register {
        &__form {
          padding: 30px 20px;
        }

        &__title {
          font-size: 26px;
        }
      }
    }
  }

  /* Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  ```

- Jalankan browsernya http://localhost:3000/auth/register sehingga tampilan sebagai berikut

  ![alt text](imgs/JS15/image-1.png)

---

## Bagian 2 – Membuat API Register

- Buka file servicefirebase.ts pada folder src/utils/db dan modifikasi

  ```ts
  import {
    getFirestore,
    collection,
    getDocs,
    Firestore,
    getDoc,
    doc,
    query,
    addDoc,
    where,
  } from "firebase/firestore";
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

  export async function retrieveDataByID(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    const data = snapshot.data();
    return data;
  }

  export async function signUp(
    userData: {
      email: string;
      fullname: string;
      password: string;
    },
    callback: Function,
  ) {
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email),
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Query result:", data);

    if (data.length > 0) {
      // user belum ada -> boleh daftar
      // await addDoc(collection(db, "users"), userData);
      // console.log("User registered:", data);
      callback({
        status: "success",
        message: "User registered successfully",
      });
    } else {
      callback({
        status: "error",
        message: "User already exists",
      });
    }
  }
  ```

- Buat file register.ts pada folder api

  ![alt text](imgs/JS15/image-2.png)

- Modifikasi file register.ts

  ```ts
  // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
  import { signUp } from "@/utils/db/servicefirebase";
  import type { NextApiRequest, NextApiResponse } from "next";

  type Data = {
    name: string;
    alamat: string;
  };

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
  ) {
    if (req.method === "POST") {
      await signUp(req.body, (result: { status: string; message: string }) => {
        if (result.status === "success") {
          res.status(200).json({ name: result.message, alamat: "" });
        } else {
          res.status(400).json({ name: result.message, alamat: "" });
        }
      });
    } else {
      res.status(405).json({ name: "Method not allowed", alamat: "" });
    }
  }
  ```

- Modifikasi index.tsx pada folder register ( tambahkan beberapa code)

  ```tsx
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const fullname = formData.get("Fullname") as string;
    const password = formData.get("Password") as string;
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, password }),
    });

    // const result = await response.json();
    // console.log(result);
    if (response.status === 200) {
      form.reset();
      // event.currentTarget.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(
        response.status === 400 ? "User already exists" : "An error occurred",
      );
    }
  };
  ```

- Buka browser http://localhost:3000/auth/register isikan data dan klik register. Jika berhasil maka akan masuk ke menu login

  ![alt text](imgs/JS15/image-3.png)

  ![alt text](imgs/JS15/image-4.png)

---

## Bagian 3 – Install bcrypt

- npm install bcrypt --force

  ```shell
  PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 14\auth-register> npm install bcrypt

  added 3 packages, and audited 508 packages in 11s

  162 packages are looking for funding
  run `npm fund` for details

  7 vulnerabilities (3 moderate, 4 high)

  To address issues that do not require attention, run:
  npm audit fix

  To address all issues, run:
  npm audit fix --force

  Run `npm audit` for details.
  ```

- npm install --save-dev @types/bcrypt –force

  ```shell
  PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 14\auth-register> npm install --save-dev @types/bcrypt

  added 1 package, and audited 509 packages in 7s

  162 packages are looking for funding
  run `npm fund` for details

  7 vulnerabilities (3 moderate, 4 high)

  To address issues that do not require attention, run:
  npm audit fix

  To address all issues, run:
  npm audit fix --force

  Run `npm audit` for details.
  ```

- Buka file servicefirebase.ts pada folder src/utils/db dan modifikasi

  ```ts
  } else {
      userData.password = await bcrypt.hash(userData.password, 10);
      userData.role = "user";
      await addDoc(collection(db, "users"), userData)
      .then(() => {
      callback({
          status: "success",
          message: "User registered successfully",
      });
      })
      .catch((error) => {
      callback({
          status: "error",
          message: "Failed to register user: " + error.message,
      });
      });
      // callback({
      //   status: "error",
      //   message: "User already exists",
      // });
  }
  ```

- Jalankan browser http://localhost:3000/auth/register dan input data setelah itu klik register

  ![alt text](imgs/JS15/image-3.png)

- Buka pada firebase jika berhasil maka data register akan masuk

  ![alt text](imgs/JS15/image-5.png)

- Jika user memasukkan data yang sama sistem tidak akan memproses tetapi permasalahannya user memasukkan data yang sama tidak ada pemberitahuan pada layar maka dari itu perlu ada perubahan pada code index.tsx pada folder views/auth/register

```tsx
// ...

setError(
  response.status === 400 ? "Email already exists" : "An error occurred",
);

// ...

{
  error && <p className={style.register__error}>{error}</p>;
}

// ...

<button
  type="submit"
  className={style.register_form_item__button}
  disabled={isLoading}
>
  {isLoading ? "Loading..." : "Register"}
</button>;

// ...
```

- Modifikasi juga pada register.module.scss

  ```scss
  &__error {
    color: red;
    font-size: 14px;
    margin-top: 8px;
  }
  ```

- Jika berhasil maka hasilnya seperti berikut

  ![alt text](imgs/JS15/image-6.png)

- Tambakan loading dengan menambahkan kode pada index.tsx

  ```tsx
  setError("");
  setIsLoading(true);
  ```

- Jika berhasil maka hasilnya akan muncul loading saat klik register

  ![alt text](imgs/JS15/image-7.png)

---

## Pengujian

### Uji 1 – Register Baru

Input:

- Email baru

  ![alt text](imgs/JS15/image-3.png)

Hasil:

![alt text](imgs/JS15/image-5.png)

- Data tersimpan di Firestore
- Password ter-hash
- Redirect ke login

### Uji 2 – Email Sudah Ada

Input:

- Email yang sama

Hasil:

- Error 400
  ![alt text](imgs/JS15/image-8.png)

- Message: Email already exists

  ![alt text](imgs/JS15/image-6.png)

### Uji 3 – Method GET

Akses:
/api/register

Hasil:

![alt text](imgs/JS15/image-9.png)

405 Method Not Allowed

---

## Tugas Praktikum

1. Implementasikan register terhubung database.
2. Tambahkan validasi:
   - Email wajib

     ![alt text](imgs/JS15/image-10.png)

   - Password minimal 6 karakter

     ![alt text](imgs/JS15/image-11.png)

3. Tambahkan role default "member".

   Pada servicefirebase.ts modifikasi:

   ```ts
   userData.role = "member";
   ```

   Sehingga saat register user baru akan memiliki role member pada database:

   ![alt text](imgs/JS15/image-12.png)

4. Tampilkan pesan error di UI.

![alt text](imgs/JS15/image-13.png)

5. Screenshot hasil:
   - Register sukses

     ![alt text](imgs/JS15/image-14.png)

   - Email sudah ada

     ![alt text](imgs/JS15/image-13.png)

   - Database Firestore

     ![alt text](imgs/JS15/image-15.png)

---

## Pertanyaan Analisis

1. **Mengapa password harus di-hash?**  
   Password harus di-hash agar tidak disimpan dalam bentuk plaintext di database. Dengan hashing, jika database bocor, password asli pengguna tidak langsung diketahui. Ini meningkatkan keamanan karena hash sulit untuk dikembalikan ke bentuk semula.

2. **Apa perbedaan addDoc dan setDoc?**  
   addDoc digunakan untuk menambahkan dokumen baru dengan ID yang dibuat otomatis oleh database. Sedangkan setDoc digunakan untuk membuat atau menimpa dokumen dengan ID yang sudah ditentukan secara manual.

3. **Mengapa perlu validasi method POST?**  
   Validasi method POST diperlukan untuk memastikan endpoint hanya menerima request yang sesuai. Ini mencegah akses tidak valid dari method lain seperti GET atau PUT yang bisa menyebabkan error atau potensi celah keamanan.

4. **Apa risiko jika email tidak dicek unik?**  
   Jika email tidak unik, bisa terjadi duplikasi akun dengan email yang sama. Hal ini dapat menyebabkan konflik data, kebingungan saat login, dan potensi penyalahgunaan akun.

5. **Apa fungsi role pada user?**  
   Role digunakan untuk mengatur hak akses pengguna dalam sistem. Dengan adanya role (seperti admin atau user), sistem dapat menentukan fitur atau halaman mana yang boleh diakses oleh masing-masing pengguna.
