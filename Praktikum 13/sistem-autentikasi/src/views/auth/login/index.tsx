import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { setLogin } from "../../../lib/auth";
import Cookies from "js-cookie";
// import styles from './login.module.css';
import styles from './login.module.scss';

const HalamanLogin = () => {
    const { push } = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handlerLogin = () => {
        if (username === "user" && password === "password") {
            setLogin(true);
            Cookies.set("isLogin", "true");
            push('/about');
        } else {
            setError('Username or password incorrect');
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
                            <label htmlFor="username" className={styles.label}>Username</label>
                            <input
                                id="username"
                                type="text"
                                className={styles.input}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukkan username"
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