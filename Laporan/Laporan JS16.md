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

## BAGIAN 2 – Handle Login di Frontend

- Copy paste isi dari register/index.tsx ke file login/index.tsx
- Copy paste isi dari register/register.module.scss ke file login/login.module.scss

  ![alt text](image-1.png)

- Semua text register pada file index.tsx pada folder login diubah menjadi login

  ```tsx
  <h1 className={style.login__title}>Halaman login</h1>
  ```

- Jangan lupa setting link hrefnya

  ```tsx
  <p className={style.login__form_item_text}>
    tidak punya ' akun ? Ke Halaman Register
    <Link href="/auth/register">Ke Halaman Register</Link>
  </p>
  ```

- Lakukan hal yang sama pada file login.module.scss rubah text register menjadi login

  ```scss
  .login {
    min-height: 100vh;
    display: flex;
    flex-direction: column; /* ← penting */
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    padding: 20px;

    // sisa kode login.module.scss
  }
  ```

- Cek pada file login.tsx pada pages/auth

  ```tsx
  import TampilanLogin from "@/views/auth/login";

  const Login = () => {
    return (
      <>
        <TampilanLogin />
      </>
    );
  };

  export default Login;
  ```

- Jalankan browser localhost:3000/auth/login. Tampilannya akan sama dengan register

  ![alt text](image-3.png)

- Pada tampilan login kita tidak perlu hapus fullname jadi pada folder views/auth/login/index.tsx hapus fullname

  ```tsx
  {
    /* <div className={style.register__form_item}>
              <label
              htmlFor="Fullname"
              className={style.register__form_item__label}
              >
              Fullname
              </label>
              <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.register__form_item__input}
              />
          </div> */
  }
  ```

  Sehingga hasilnya seperti berikut :

  ![alt text](image-2.png)

- Buka file index.tsx pada folder views/auth/login dan modifikasi codenya seperti berikut ( Untuk line 64 sampai kebawah tidak ada perubahan )

  ```tsx
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      // console.log("signIn response:", res);
      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res?.error || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };
  ```

- Buka file servicefirebase.ts dan tambahkan code di line 25-38

  ```ts
  export async function signIn(email: string) {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (data) {
      return data[0];
    } else {
      return null;
    }
  }
  ```

---

## BAGIAN 3 – Authorize di NextAuth (Database Login)

- Buka file [...nextauth].ts modifikasi menjadi berikut ( pada bagian providers )

  ```ts
  providers: [
      CredentialsProvider({
      name: "credentials",
      credentials: {
          // fullname: { label: "Full Name", type: "text" },
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;

          const user: any = await signIn(credentials.email);

          if (user) {
          const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
          );

          if (isPasswordValid) {
              // Pastikan mengembalikan object user yang bersih
              return {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              role: user.role,
              };
          }
          }

          return null;
      },
      }),
  ],
  ```

---
