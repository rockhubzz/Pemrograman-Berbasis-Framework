import styles from "@/pages/produk/produk.module.scss";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({
  products,
  isLoading,
}: {
  products: ProductType[];
  isLoading?: boolean;
}) => {
  const skeletonItems = Array(4).fill(null);

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {isLoading ? (
          <>
            {skeletonItems.map((_, index) => (
              <div key={index} className={styles.produk__content__skeleton}>
                <div className={styles.produk__content__skeleton__image}></div>
                <div className={styles.produk__content__skeleton__name}></div>
                <div className={styles.produk__content__skeleton__category}></div>
                <div className={styles.produk__content__skeleton__price}></div>
              </div>
            ))}
          </>
        ) : products && products.length > 0 ? (
          <>
            {products.map((product: ProductType) => (
              <div
                key={product.id}
                className={styles.produk__content__item}
              >
                <div className={styles.produk__content__item__image}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    width={"250"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <h4 className={styles.produk__content__item__name}>
                  {product.name}
                </h4>
                <p className={styles.produk__content__item__category}>
                  #{product.category}
                </p>
                <p className={styles.produk__content__item__price}>
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className={styles.produk__content__empty}>
            <span style={{ fontSize: "48px", marginBottom: "16px", display: "block" }}>📦</span>
            Tidak ada produk yang tersedia saat ini
          </p>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;