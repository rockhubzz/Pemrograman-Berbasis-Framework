import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img
          src="/page-eaten.png"
          alt="404"
          className={styles.image}
        />
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Halaman Tidak Ditemukan</h2>
        <p className={styles.text}>
          Maaf, halaman yang Anda cari tidak tersedia atau sudah dimakan.
        </p>

        <a href="/" className={styles.button}>
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

export default Custom404;