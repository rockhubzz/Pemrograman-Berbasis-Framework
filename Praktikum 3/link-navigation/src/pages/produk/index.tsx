import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../lib/auth";

const produk = () => {
    // const [isLogin, setIsLogin] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        if (!auth.isLogin) {
            push("/auth/login");
        }
    }, []);

    return (
        <div>Produk User Page</div>
    );
};

export default produk;