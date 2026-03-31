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
