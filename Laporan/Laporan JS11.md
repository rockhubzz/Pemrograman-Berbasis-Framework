# Dynamic Routing & Static Generation

**Bagian 1 – Membuat Dynamic Route**

1. Buka file pages/products/[product].tsx dan modfikasi sbb ( line 20 )

```tsx
<Link
  href={`/produk/${products.id}`}
  key={products.id}
  className={styles.produk__content__item}
>
  <div className={styles.produk__content__item__image}>
    <img src={products.image} alt={products.name} width={200} />
  </div>

  <h4 className={styles.produk__content__item__name}>{products.name}</h4>

  <p className={styles.produk__content__item__category}>{products.category}</p>

  <p className={styles.produk__content__item__price}>
    Rp {products.price.toLocaleString("id-ID")}
  </p>
</Link>
```

2. Jalankan browser http://localhost:3000/produk

- Jika kita klik salah satu gambar maka akan menuju halaman lain

![alt text](image.png)

**Bagian 2 – Implementasi CSR (Client Rendering)**

1. Modifikasi pada file [produk].tsx pada folder src/pages/produk/

```tsx
const { query } = useRouter();
const { data, error, isLoading } = useSWR(
  `/api/products/${query.produk}`,
  fetcher,
);
```

2. Pada file produk.ts pada folder pages/api di rename menjadi [[...product]].ts

![alt text](image-1.png)

3. Modifikasi file servicefirebase.ts

```tsx
export async function retrieveProductById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}
```

4. Modifikasi file [[...produk]].ts

```tsx
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  retrieveProductById,
  retrieveProducts,
} from "../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.query.produk![1]) {
    const data = await retrieveProductById("products", req.query.produk![1]);
    res.status(200).json({ status: true, status_code: 200, data });
    return;
  } else {
    const data = await retrieveProducts("products");
    res.status(200).json({ status: true, status_code: 200, data });
  }
}
```

5. Jalankan browser http://localhost:3000/api/produk/HjnApBuIHCqGRs4tohUE

![alt text](image-2.png)

6. Jalankan alamat url http://localhost:3000/api/produk/123

![alt text](image-3.png)

7. Buat file dengan nama index.tsx pada folder views/DetailProduct selain itu buat juga file dengan nama detailProduct.module.scss

![alt text](image-4.png)

8. Modifikasi detailProduct.module.scss

```scss
.produkdetail {
  margin: 40px auto;
  padding: 24px;
  display: flex;
  gap: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  align-items: flex-start;

  &__image {
    flex: 1;

    img {
      width: 100%;
      border-radius: 12px;
      object-fit: cover;
    }
  }

  &__info {
    flex: 1.2;
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #222;
  }

  &__category {
    font-size: 16px;
    color: #666;
    margin-bottom: 16px;
  }

  &__price {
    font-size: 22px;
    font-weight: bold;
    color: #ff5722;
    margin-bottom: 20px;
  }

  &__button {
    width: fit-content;
    padding: 12px 24px;
    background-color: #111;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background-color: #ff5722;
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .produkdetail {
    flex-direction: column;

    &__image {
      margin-bottom: 20px;
    }
  }
}
```

9. Modifikasi index.tsx pada folder DetailProduct

```tsx
import { ProductType } from "../../types/Produk.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <div className={styles.produkdetail}>
      <div className={styles.produkdetail__image}>
        <img src={products.image} alt={products.name} />
      </div>

      <div className={styles.produkdetail__info}>
        <h1 className={styles.produkdetail__name}>{products.name}</h1>
        <p className={styles.produkdetail__category}>{products.category}</p>
        <p className={styles.produkdetail__price}>
          Rp {products.price.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
};

export default DetailProduk;
```

10. Modifikasi file [product].tsx

```tsx
import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../views/DetailProduct";

const HalamanProduk = () => {
  // const Router = useRouter();
  // console.log(Router);
  const { query } = useRouter();
  const { data, error, isLoading } = useSWR(
    `/api/products/${query.produk}`,
    fetcher,
  );
  return (
    <div>
      <DetailProduk products={isLoading ? [] : data.data} />
    </div>
  );
};

export default HalamanProduk;
```

11. Modifikasi index.tsx pada folder views/detailProduct line 16

```tsx
        <div className={styles.produkdetail__info}>
          <h1 className={styles.produkdetail__name}>{products.name}</h1>
          <p className={styles.produkdetail__category}>{products.category}</p>
          <p className={styles.produkdetail__price}>
            Rp {products.price && products.price.toLocaleString("id-ID")}
          </p>
```

12. Jalankan browser http://localhost:3000/produk/ saat produk diklik maka akan muncul detailProduk http://localhost:3000/produk/pAWIT99SWmVbVrNm49ml

![alt text](image-5.png)

![alt text](image-6.png)

13. Agar tulisan detail produk ditengah maka modifikasi file detailProduct.module.scss line 103-108

```scss
.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #333;
}
```

dan file index.tsx tambahkan code pada line 7,8 dan 22 menjadi

```tsx
<h1 className={styles.title}>Detail Produk</h1>
```

14. Sehingga hasilnya seperti berikut

![alt text](image-7.png)

**Bagian 3 – Implementasi SSR**

1. Modifikasi [produk].tsx pada folder src/pages/produk dan comment line 9 sampai 20 dikarena kita akan menggunakan metode SSR. Tambahkan beberapa kode untuk SSR

```tsx
export async function getServerSideProps({
  params,
}: {
  params: { produk: string };
}) {
  const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
  const respone = await res.json();
  // console.log("Data produk yang diambil dari API:", respone);
  return {
    props: {
      product: respone.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
    },
  };
}
```

2. Jalankan browser http://localhost:3000/produk/server
   Tidak perlu loading state karena data sudah tersedia sebelum render.

![alt text](image-8.png)

![alt text](image-9.png)
