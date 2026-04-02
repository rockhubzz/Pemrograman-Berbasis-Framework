import styles from "@/pages/produk/produk.module.scss";
import { StoreType } from "@/types/Store.type";

const TampilanStores = ({
  stores,
  isLoading,
}: {
  stores: StoreType[];
  isLoading?: boolean;
}) => {
  const skeletonItems = Array(4).fill(null);

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Toko</h1>
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
        ) : stores && stores.length > 0 ? (
          <>
            {stores.map((store: StoreType) => (
              <div
                key={store.id}
                className={styles.produk__content__item}
              >
                <div className={styles.produk__content__item__image}>
                  <img 
                    src={store.image} 
                    alt={store.name} 
                    width={"250"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <h4 className={styles.produk__content__item__name}>{store.name}</h4>
                <p className={styles.produk__content__item__category}>{store.location}</p>
                <p style={{color: "#000000"}}>📞 {store.phoneNumber}</p>
                <p style={{color: "#000000"}}>📧 {store.email}</p>
              </div>
            ))}
          </>
        ) : (
          <p>Tidak ada data toko</p>
        )}
      </div>
    </div>
  );
};

export default TampilanStores;
