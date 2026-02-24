import Link from "next/link";

const HalamanLogin = () => {
    return (
        <div>
            <h1>Halaman Login</h1>
            <Link href="/auth/register">Ke halaman register</Link>
        </div>
    );
};

export default HalamanLogin;