# Implementasi Login Database & Multi-Role

## BAGIAN 1 – Custom Login Page

1. Tambahkan custom page di NextAuth line 55-57

   ```ts
   pages: {
       signIn: "/auth/login",
   },
   ```

   - Jalankan browser http://localhost:3000/ dan klik sign in maka akan diarahkan ke login

     ![alt text](image.png)

---
