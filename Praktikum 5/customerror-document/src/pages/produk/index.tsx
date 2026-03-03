import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../../lib/auth";
import ProdukView from "../../views/produk";

const ProdukPage = () => {
    const { push } = useRouter();

    useEffect(() => {
        if (!auth.isLogin) {
            push("/auth/login");
        }
    }, []);

    return <ProdukView />;
};

export default ProdukPage;