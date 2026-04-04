# Implementasi Login Google Provider dengan NextAuth.js + Firebase

## Konfigurasi Google OAuth

- Langkah 1 – Masuk ke Google Cloud Console
  - Buka: https://console.cloud.google.com/apis/credentials

    ![alt text](image.png)

---

- Langkah 2 – Buat Project Baru
  - Klik New Project

    ![alt text](image-1.png)

  - Nama project: MyAppNext

    ![alt text](image-2.png)

  - Klik Create
  - Setelah berhasil klik https://console.cloud.google.com/apis/credentials pastikan projectnya MyAppNext

    ![alt text](image-3.png)

---

- Langkah 3 – Konfigurasi OAuth Consent Screen

1. Pilih OAuth consent screen

   ![alt text](image-4.png)

2. Pilih Get Started
3. Maka akan muncul seperti berikut dan isikan

   ![alt text](image-5.png)

   ![alt text](image-6.png)

   ![alt text](image-7.png)

   ![alt text](image-8.png)
   - Klik create

- Langkah 4 – Buat OAuth Credentials

1. Klik create client pada Clients

   ![alt text](image-9.png)

   ![alt text](image-10.png)

---

## Tambahkan Environment Variables

1. Copy dan paste client ID dan Client secret ke .env

   ![alt text](image-11.png)

   ![alt text](image-12.png)

---

## Konfigurasi Google Provider di NextAuth dan Handle Callback JWT & Session

1. Buka file [...nextauth].ts pada folder api/auth dan modifikasi menjadi berikut

   ```ts
    import GoogleProvider from "next-auth/providers/google"

    // ...

       GoogleProvider({
       clientId: process.env.GOOGLE_CLIENT_ID || "",
       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
       }),

       // ...

    if (account?.provider === "google" && profile) {
      const data = {
        fullname: user.name,
        email: user.email,
        image: user.image,
        type: account.provider,
      };
      token.fullname = data.fullname;
      token.email = data.email;
      token.image = data.image;
      token.type = data.type;
    }

    // ...

    if (token.image) {
      session.user.image = token.image;
    }
    if (token.type) {
      session.user.type = token.type;
    }

   ```

---

## Tambahkan Button Login Google

1. Modifikasi file index.tsx pada folder views/auth/login

   ```tsx
   <button
     onClick={() => signIn("google", { callbackUrl, redirect: false })}
     className={style.login_form_item__button}
     disabled={isLoading}
   >
     {isLoading ? "Loading..." : "Sign in with Google"}
   </button>
   ```

2. Jalankan browser localhost:3000/auth/login masuk melalui sign in with google.Jika berhasil maka akan terhubung dengan akun google.

   ![alt text](image-13.png)

3. Menampilkan image dari google
   - Buka file index.tsx dan tambahkan code berikut

     ```tsx
     {
       data.user?.image && (
         <img
           src={data.user.image}
           alt="User Image"
           className={styles.navbar__user__image}
         />
       );
     }
     ```

- Buka file navbar.module.css dan tambahkan code berikut

  ```css
  .navbar__user__image {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #3b82f6;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
    transition: all 0.3s ease;
  }

  .navbar__user__image:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
  }
  ```

- Jika berhasil maka tampillannya akan seperti berikut

  ![alt text](image-14.png)

---

## Simpan Data Google ke Database

- Buka file servicefirebase.ts pada folder src/utils/db/ dan tambahkan beberapa kode berikut

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
    updateDoc, // <= tambahan kode
  } from "firebase/firestore";
  ```

- Tambahkan juga code berikut

  ```ts
  export async function signInWithGoogle(userData: any, callback: any) {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", userData.email),
      );

      const querySnapshot = await getDocs(q);
      const data: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (data.length > 0) {
        // User sudah ada, update data
        userData.role = data[0].role;
        await updateDoc(doc(db, "users", data[0].id), userData);
        callback({
          status: true,
          message: "User registered and logged in with Google",
          data: userData,
        });
      } else {
        // User baru, tambah data
        userData.role = "member";
        await addDoc(collection(db, "users"), userData);
        callback({
          status: true,
          message: "User registered and logged in with Google",
          data: userData,
        });
      }
    } catch (error: any) {
      // Tangani error di sini
      callback({
        status: false,
        message: "Failed to register user with Google",
      });
    }
  }
  ```

- Panggil Service di JWT Callback buka file […nextAuth].ts

  ```ts
  await signInWithGoogle(data, (result: any) => {
    if (result.status) {
      token.fullname = result.data.fullname;
      token.email = result.data.email;
      token.image = result.data.image;
      token.type = result.data.type;
    }
  });
  ```

- Jalankan browser dan login menggunakan akun google setelah cek di firebase, jika data akun googlenya masuk ke database maka anda telah berhasil

  ![alt text](image-15.png)

---

## Analisis & Diskusi

1. **Apa perbedaan login credential dan login Google?**  
   Login credential menggunakan email dan password yang dibuat dan dikelola sendiri oleh sistem. Sedangkan login Google menggunakan akun pihak ketiga (OAuth) sehingga proses autentikasi dilakukan oleh Google tanpa perlu menyimpan password di aplikasi.

2. **Mengapa data Google tetap perlu disimpan ke database?**  
   Data dari Google tetap perlu disimpan agar aplikasi memiliki kontrol terhadap user, seperti menyimpan role, preferensi, atau data tambahan lainnya. Ini juga memudahkan integrasi dengan fitur internal aplikasi.

3. **Apa fungsi JWT callback?**  
   JWT callback digunakan untuk memodifikasi atau menambahkan data ke dalam token saat proses autentikasi. Data seperti user id, email, atau role biasanya disimpan di dalam token agar bisa digunakan pada request berikutnya.

4. **Mengapa perlu multi-role?**  
   Multi-role memungkinkan sistem mengatur hak akses yang berbeda untuk setiap jenis user, seperti admin, user biasa, atau moderator. Ini penting untuk membatasi akses dan menjaga keamanan serta struktur aplikasi.

5. **Apa risiko jika tidak menyimpan user ke database?**  
   Aplikasi tidak memiliki kontrol penuh terhadap data user, seperti pengaturan role atau penyimpanan data tambahan. Selain itu, sulit untuk melakukan manajemen user, tracking aktivitas, atau integrasi dengan fitur lain di dalam sistem.
