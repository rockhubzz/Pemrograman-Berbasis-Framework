import { Poppins } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
import styles from "@/pages/produk/produk.module.scss";
import { StoreType } from "@/types/Store.type";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const TampilanStores = ({
  stores,
  isLoading,
}: {
  stores: StoreType[];
  isLoading?: boolean;
}) => {
  const skeletonItems = Array(4).fill(null);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8RYP9TYTNN"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8RYP9TYTNN', {
              'debug_mode': true,
              'allow_google_signals': false,
              'anonymize_ip': true
            });
          `,
        }}
      />
      <div className={`${styles.produk} ${poppins.className}`}>
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
                  <Image 
                    src={store.image} 
                    alt={store.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={false}
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
    </>
  );
};

export default TampilanStores;
