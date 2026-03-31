import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from './login.module.scss';

const HalamanLogin = () => {
    const { push } = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [error, setError] = useState("");

    const handlerLogin = async () => {
        const result = await signIn("credentials", {
            email,
            password,
            fullname,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
        } else if (result?.ok) {
            push('/profile');
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Halaman Login</h1>
                    <p className={styles.subtitle}>Masuk ke akun Anda</p>

                    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handlerLogin(); }}>
                        <div className={styles.formGroup}>
                            <label htmlFor="fullname" className={styles.label}>Full Name</label>
                            <input
                                id="fullname"
                                type="text"
                                className={styles.input}
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                id="email"
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan email"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <input
                                id="password"
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukkan password"
                            />
                        </div>

                        {error && <div className={styles.error}>{error}</div>}

                        <button type="submit" className={styles.button}>Login</button>
                    </form>

                    <div className={styles.divider}></div>

                    <div className={styles.footer}>
                        <p className={styles.footerText}>Belum punya akun?</p>
                        <Link href="/auth/register" className={styles.link}>
                            Daftar sekarang
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HalamanLogin;