import { useRouter } from "next/router";

const HalamanProduk = () => {
    const { query } = useRouter();

    return (
        <div>
            <h1>Halaman Blog</h1>
            <b>Slug: {query.slug}</b>
        </div>
    );
};

export default HalamanProduk;