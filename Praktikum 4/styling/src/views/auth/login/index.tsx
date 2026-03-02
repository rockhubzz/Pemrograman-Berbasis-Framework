import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { setLogin } from "../../../lib/auth";
import styles from './login.module.css';

const HalamanLogin = () => {
    const { push } = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handlerLogin = () => {
        if (username === "user" && password === "password") {
            setLogin(true);
            push('/produk');
        } else {
            setError('Username or password incorrect');
        }
    };

    return (
        <div className={styles.login}>
            <h1>Halaman Login</h1>
            <div>
                <label>Username: </label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={handlerLogin}>Login</button> <br />
             <h1 style={{color:"red",border:"1px solid red",borderRadius:"5px",padding:"5px"}}> belum punya akun</h1>
            <Link href="/auth/register">Ke Halaman Register</Link>
        </div>
    );
};

export default HalamanLogin;