import Link from "next/link";
import styles from "./register.module.scss";

const HalamanRegister = () => {
    return (
        <div className={styles.container}>
                <h1 className={styles.title}>Halaman Register</h1>
                <Link href="/auth/login" className={styles.link}>
                    Ke halaman login
                </Link>
        </div>
    );
};

export default HalamanRegister;