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
