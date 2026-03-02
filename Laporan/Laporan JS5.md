# Styling pada Next.js (Global CSS, CSS Module, Inline Style, SCSS, dan Tailwind CSS)

<b>1. Global CSS</b><br>

<b>a. File Global</b>

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

a {
  color: inherit;
  text-decoration: none;
}
```

<b>b. Import Global CSS</b>

```
// pages/_app.tsx
import "@/styles/globals.css";
```

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/AppShell";
import Navbar from "@/components/layouts/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}
```

<b>2. CSS Module (Local Scope)</b>

<b>a. Struktur Komponen Navbar</b>

```
src/components/layout/Navbar/
├── index.tsx
└── Navbar.module.css
```

![alt text](image.png)

<b>b. File CSS Module</b>

<li> Modifikasi global.css

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}
```

<li> Modifikasi navbar.module.css

```css
.navbar {
  width: 100%;
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
```

<b>c. Pemanggilan di Komponen</b>

<li> Modifikasi kode pada index.tsx pada folder navbar

```tsx
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div>navbar Component </div>
    </div>
  );
};

export default Navbar;
```

<li> Jalankan browser

![alt text](image-1.png)

<b>3. Styling untuk Pages (CSS Module)</b>

<b>a. Contoh Login Page</b>

<li>Tambahkan login.module.css pada folder auth

![alt text](image-2.png)

<li>Modifikasi login.module.css

```css
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

<li> Modifikasi login.tsx

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { setLogin } from "../../lib/auth";
import styles from "./login.module.css";

const halamanLogin = () => {
  const { push } = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlerLogin = () => {
    if (username === "user" && password === "password") {
      setLogin(true);
      push("/produk");
    } else {
      setError("Username or password incorrect");
    }
  };

  return (
    <div className={styles.login}>
      <h1>Halaman Login</h1>
      <div>
        <label>Username: </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={handlerLogin}>Login</button> <br />
      <Link href="/auth/register">Ke Halaman Register</Link>
    </div>
  );
};

export default halamanLogin;
```

<li>Jalankan browser

![alt text](image-3.png)

<b>4. Conditional Rendering Navbar (Tanpa Navbar di Login)</b>

<li> Modifikasi index.tsx pada folder Appshell

```tsx
import { useRouter } from "next/router";
import Footer from "../footer";
import Navbar from "../navbar";

const disableNavbar = ["/auth/login", "/auth/register"];

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
    </main>
  );
};

export default AppShell;
```

<li> Jalankan browser

![alt text](image-4.png)

<b>5. Refactoring Struktur Project (Best Practice)</b>

<b>a. Struktur Awal (Kurang Rapi)</b>

```
pages/login.tsx
styles/login.module.css
```

![alt text](image-5.png)

<b>b. Struktur Refactor (Disarankan)</b>

```
pages/auth/login.tsx
src/views/auth/Login/
├── index.tsx
└── Login.module.css
```

![alt text](image-6.png)

<li> Modifikasi login.module.css pada folder view/auth/login/

```css
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

<li> Login.module.css pada folder pages/auth dihapus

![alt text](image-7.png)

<li>Modifikasi login.tsx pada folder pages/auth

```tsx
import HalamanLogin from "@/views/auth/login";

const Login = () => {
  return (
    <>
      <HalamanLogin />
    </>
  );
};

export default Login;
```

<li>Modifikasi index.tsx pada folder views/auth/login

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { setLogin } from "../../../lib/auth";
import styles from "./login.module.css";

const HalamanLogin = () => {
  const { push } = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlerLogin = () => {
    if (username === "user" && password === "password") {
      setLogin(true);
      push("/produk");
    } else {
      setError("Username or password incorrect");
    }
  };

  return (
    <div className={styles.login}>
      <h1>Halaman Login</h1>
      <div>
        <label>Username: </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={handlerLogin}>Login</button> <br />
      <Link href="/auth/register">Ke Halaman Register</Link>
    </div>
  );
};

export default HalamanLogin;
```

<li> Jalankan browser

![alt text](image-8.png)

<b>6. Inline Styling (CSS-in-JS)</b>

<li>Modifikasi index.tsx pada folder views/auth/login

```css
             <h1 style={{color:"red",border:"1px solid red",borderRadius:"5px",padding:"5px"}}> belum punya akun</h1>
```

<li> Jalankan browser

![alt text](image-9.png)

<b>7. Kombinasi Global CSS + CSS Module</b>

<li>Modifikasi global.css

```css
.big {
  font-size: 1.5rem;
}
```

<li>Modifikasi index.tsx pada folder components/layouts/navbar

```tsx
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className="big">navbar Component </div>
    </div>
  );
};

export default Navbar;
```

![alt text](image-10.png)
