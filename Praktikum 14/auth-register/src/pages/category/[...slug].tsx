import { useRouter } from "next/router";

const halamanKategori = () => {
    const { query } = useRouter();

    return (
        <div>
            <h1>Halaman Kategori</h1>
            <p>
                Kategori:<br />
                {Array.isArray(query.slug) ? query.slug.map((slug, index) => (
                    <span key={index}>
                            {index > 0 && <br />}
                            {slug}
                    </span>
                )) : query.slug}
            </p>
        </div>
    );
};

export default halamanKategori;