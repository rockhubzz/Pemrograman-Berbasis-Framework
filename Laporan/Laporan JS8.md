# Client Side Rendering & Data Fetching

<b>Bagian 1 – Setup Data Produk</b>

1. Siapkan project Next.js.
2. Buat endpoint API /api/products.
3. Pastikan data memiliki:
<li> id
<li> name
<li> category
<li> price
<li> image

4. jalankan browser http://localhost:3000/api/produk

![alt text](image.png)

<b>Bagian 2 – Implementasi CSR dengan useEffect</b>

1. Membuat file index.tsx pada folder views/products

![alt text](image-1.png)

2. Modifikasi index.tsx

```tsx
type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div>
      <h1>Daftar Produk</h1>
      {products.map((products: ProductType) => (
        <div key={products.id}>
          <h2>nama : {products.name}</h2>
          <p>Harga: {products.price}</p>
          <img src={products.image} alt={products.name} width={200} />
          <p>kategori: {products.category}</p>
        </div>
      ))}
    </div>
  );
};

export default TampilanProduk;
```

3. Buka file index.tsx pada pages/produk/

![alt text](image-2.png)

4. Modifikasi index.tsx pada pages/produk/

```tsx
useEffect(() => {
  fetch("/api/produk")
    .then((response) => response.json())
    .then((responsedata) => {
      setProducts(responsedata.data);
      // console.log("Data produk:", responsedata.data);
    })
    .catch((error) => {
      console.error("Error fetching produk:", error);
    });
}, []);
```

5. Jalankan browser http://localhost:3000/produk

![alt text](image-3.png)

6. Pada folder produk buat file produk.modules.scss

```scss
.produk {
  width: 100%;
  padding: 0 5%;
  &__title {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    &__item {
      &__image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
        margin-bottom: 12px;
      }
      &__name {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      &__price {
        font-size: 16px;
        color: #ff5722;
        font-weight: bold;
      }
      &__category {
        font-size: 14px;
        color: #888;
        margin-bottom: 8px;
      }
    }
  }
}
```

7. Modifikasi Pada file index.tsx pada folder pages/views/product

```tsx
import styles from "@/pages/produk/product.module.scss";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {products.map((products: ProductType) => (
          <div key={products.id} className={styles.produk__content__item}>
            <div className={styles.produk__content__item__image}>
              <img src={products.image} alt={products.name} width={200} />
            </div>
            <h4 className={styles.produk__content__item__name}>
              {products.name}
            </h4>
            <p className={styles.produk__content__item__category}>
              {products.category}
            </p>
            <p className={styles.produk__content__item__price}>
              Rp {products.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TampilanProduk;
```

9. Jalankan Browser

![alt text](image-4.png)

<b>Bagian 3 – Implementasi Skeleton Loading</b>

<li>Modfikasi file index.tsx pada folder views/product/index.tsx

```tsx
<div className={styles.produk__content__skeleton}>
  <div className={styles.produk__content__skeleton__image}></div>
  <div className={styles.produk__content__skeleton__name}></div>
  <div className={styles.produk__content__skeleton__category}></div>
  <div className={styles.produk__content__skeleton__price}></div>
</div>
```

<li>Modifikasi file product.module.scss

```scss
&__skeleton {
  width: 200px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: identifier 1.5s infinite ease-in-out;

  &__image {
    width: 100%;
    height: 200px;
    background-color: #e0e0e0;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  &__name {
    width: 80%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  &__category {
    width: 60%;
    height: 16px;
    background-color: #e0e0e0;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  &__price {
    width: 40%;
    height: 18px;
    background-color: #e0e0e0;
    border-radius: 4px;
  }
}
```

<li>Jalankan browser maka akan muncul skeleton yang terdapat animasi berkedip

![alt text](image-5.png)

<li> Modifikasi pada index.tsx pada folder views/product/index.tsx

```tsx
import styles from "@/pages/produk/produk.module.scss";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {products.length > 0 ? (
          <>
            {products.map((products: ProductType) => (
              <div key={products.id} className={styles.produk__content__item}>
                <div className={styles.produk__content__item__image}>
                  <img src={products.image} alt={products.name} width={200} />
                </div>
                <h4 className={styles.produk__content__item__name}>
                  {products.name}
                </h4>
                <p className={styles.produk__content__item__category}>
                  {products.category}
                </p>
                <p className={styles.produk__content__item__price}>
                  Rp {products.price.toLocaleString()}
                </p>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.produk__content__skeleton}>
            <div className={styles.produk__content__skeleton__image}></div>
            <div className={styles.produk__content__skeleton__name}></div>
            <div className={styles.produk__content__skeleton__category}></div>
            <div className={styles.produk__content__skeleton__price}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;
```

<li> Jalankan browser
<br>
Jika dijalankan akan muncul skeletonnya terlebih dahulu setelah itu muncul gambar dan informasinya

![alt text](image-6.png)

<b>Bagian 5 – Implementasi SWR</b>

1. Install SWR

```shell
PS C:\Users\raki\Documents\raki6\Pemrograman Berbasis Framework\Code\Praktikum\Praktikum 7\clientside-rendering> npm install swr

added 3 packages, and audited 489 packages in 40s

158 packages are looking for funding
  run `npm fund` for details

1 high severity vulnerability

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
```

2. Buka dan modifkasi file index.tsx pada folder pages/product/

```tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "@/views/produk";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const kategori = () => {
  const [products, setProducts] = useState([]);

  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data.data} />
    </div>
  );
};

export default kategori;
```

3. Agar terlihat lebih rapi

<li>Buat folder swr pada utils dan tambahkan file dengan nama fetcher.js

![alt text](image-7.png)

 <li>Modifikasi file fetcher.ts

```ts
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default fetcher;
```

<li>Modifikasi file index.tsx pada folder pages/produk

```tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "@/views/produk";
import useSWR from "swr";
import fetcher from "../utils/swr/fetcher";

const kategori = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const { push } = useRouter();
  const [products, setProducts] = useState([]);
  // console.log("products:", products);

  const { data, error, isLoading } = useSWR("/api/produk", fetcher);
  //cek apakah data, error, dan isLoading sudah benar

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data.data} />
    </div>
  );
};

export default kategori;
```

![alt text](image-8.png)

Bandingkan:

1. **useEffect**  
   useEffect digunakan untuk mengambil data secara manual di dalam komponen React. Developer harus mengatur sendiri proses fetch, loading state, error handling, dan re-fetching jika diperlukan. Pendekatan ini lebih fleksibel tetapi membutuhkan lebih banyak kode dan pengelolaan state tambahan.

   Kelebihan:
   - Kontrol penuh terhadap proses pengambilan data
   - Tidak membutuhkan library tambahan
   - Cocok untuk kebutuhan sederhana

   Kekurangan:
   - Perlu mengatur loading dan error secara manual
   - Tidak ada caching otomatis
   - Tidak ada fitur revalidation bawaan

---

2. **SWR**  
   SWR adalah library data fetching untuk React yang menyediakan caching, revalidation otomatis, dan sinkronisasi data. SWR menggunakan konsep stale-while-revalidate, yaitu menampilkan data cache terlebih dahulu lalu memperbaruinya di background.

   Kelebihan:
   - Caching otomatis
   - Revalidation otomatis saat fokus window atau reconnect
   - Kode lebih ringkas
   - Performa lebih optimal untuk aplikasi dengan banyak request

   Kekurangan:
   - Membutuhkan library tambahan
   - Kurang fleksibel dibanding fetch manual untuk kasus sangat spesifik
