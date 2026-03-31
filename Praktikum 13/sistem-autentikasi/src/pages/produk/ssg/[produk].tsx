import DetailProduk from "@/views/DetailProduct";
import { ProductType } from "@/types/Produk.type";

interface HalamanProdukSSGProps {
  product: ProductType;
}

const HalamanProdukSSG = ({ product }: HalamanProdukSSGProps) => {
  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          <strong>Rendering Mode:</strong> Static-Site Generation (SSG)
        </p>
      </div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProdukSSG;

// Fungsi getStaticPaths menghasilkan daftar path yang akan di-generate pada saat build
export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3000/api/products");
    const response = await res.json();

    const paths = response.data.map((product: ProductType) => ({
      params: { produk: product.id },
    }));

    return {
      paths,
      fallback: "blocking", // Jika path tidak ada, Next.js akan generate di saat request
    };
  } catch (error) {
    console.error("Error fetching products for SSG:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

// Fungsi getStaticProps akan dipanggil pada saat build dan generate halaman statis
export async function getStaticProps({
  params,
}: {
  params: { produk: string };
}) {
  try {
    const res = await fetch(`http://localhost:3000/api/produk/${params.produk}`);
    const response = await res.json();

    if (!response.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product: response.data,
      },
      revalidate: 60, // Revalidate setiap 60 detik (ISR)
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
