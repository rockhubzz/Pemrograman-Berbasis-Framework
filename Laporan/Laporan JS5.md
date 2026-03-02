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
