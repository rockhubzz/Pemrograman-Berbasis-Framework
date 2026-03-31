# Sistem Autentikasi & Proteksi Route

## Bagian 1 – Install NextAuth

- npm install next-auth –force

  ```shell
  PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 13\sistem-autentikasi> npm install next-auth

  added 15 packages, and audited 505 packages in 19s

  162 packages are looking for funding
  run `npm fund` for details

  7 vulnerabilities (3 moderate, 4 high)

  To address issues that do not require attention, run:
  npm audit fix

  To address all issues, run:
  npm audit fix --force

  Run `npm audit` for details.
  ```

---

## Bagian 2 – Konfigurasi API Auth

- Buat file dan folder pada folder pages/api/auth/[...nextauth].ts

  ![alt text](image.png)

- Modifikasi file […nextauth].ts:

  ```ts
  import NextAuth, { NextAuthOptions } from "next-auth";
  import CredentialsProvider from "next-auth/providers/credentials";

  export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          fullname: { label: "Full Name", type: "text" },
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const user: any = {
            id: "1",
            email: credentials?.email,
            password: credentials?.password,
            fullname: credentials?.fullname,
          };

          if (user) {
            return user;
          } else {
            return null;
          }
        },
      }),
    ],

    callbacks: {
      async jwt({ token, account, profile, user }: any) {
        if (account?.provider === "credentials" && user) {
          token.email = user.email;
        }
        return token;
      },

      async session({ session, token }: any) {
        if (token.email) {
          session.user.email = token.email;
        }
        return session;
      },
    },
  };

  export default NextAuth(authOptions);
  ```

---

## Bagian 3 – Tambahkan Secret

- Buka file .env.local dan tambahkan code pada line 12
  - NEXTAUTH_SECRET=RANDOM_BASE64_STRING
  - Untuk mendapatkan nilai RANDOM_BASE64_STRING gunakan generator RANDOM_BASE64_STRING seperti https://www.convertsimple.com/random-base64-generator/

  ```env
  NEXTAUTH_SECRET=RANDOM_BASE64_STRING
  ```

---

## Bagian 4 – Tambahkan SessionProvider

- Buka file \_app.tsx dan modifikasi:

  ```tsx
    import { SessionProvider } from "next-auth/react"

      <SessionProvider session={pageProps.session}>
          <!-- kode lain -->
      </SessionProvider>
  ```

---

## Bagian 5 – Tambahkan Tombol Login & Logout

- Buka index.tsx pada folder component/navbar:
- Modifikasi file index.tsx pada line 10 dan 2

  ```tsx
  <button onClick={() => signIn()}>Sign In</button>
  ```

- Buka file file navbar.module.scss tambahkan code pada line 9

  ```css
  justify-content: space-between;
  ```

- Jalankan http://localhost:3000/

  ![alt text](image-1.png)

- Jika di klik sign in maka akan muncul dan isikan textbox masing. Setelah itu klik button sign in dan setelah diklik maka akan kembali ke halaman localhost

  ![alt text](image-2.png)

- Setelah berhasil login maka akan muncul session

  ![alt text](image-3.png)

- Untuk dapat menangkap data pada session maka tambahkan code sebagai berikut :

  ```tsx
      const { data } = useSession()

        <div className="big">navbar Component </div>
        {data ? (
            <button onClick={() => signOut()}>Sign Out</button>
        ) : (
            <button onClick={() => signIn()}>Sign In</button>
        )}
  ```

- Uji coba sign in dan sign out
  - Jalankan Kembali npm run dev
  - Jalankan localhost

    ![alt text](image-4.png)

  - Klik sign in dan isikan textboxnya

    ![alt text](image-5.png)

  - Maka akan muncul tombol signout

    ![alt text](image-6.png)

  - Ketika user klik signout maka akan kembali sign in

    ![alt text](image-7.png)

---
