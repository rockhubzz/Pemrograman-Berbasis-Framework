import DetailProduk from "@/views/DetailProduct";
import { ProductType } from "@/types/Produk.type";

interface HalamanProdukSSRProps {
  product: ProductType;
}

const HalamanProdukSSR = ({ product }: HalamanProdukSSRProps) => {
  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          <strong>Rendering Mode:</strong> Server-Side Rendering (SSR)
        </p>
      </div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProdukSSR;

// Fungsi getServerSideProps akan dipanggil setiap kali halaman ini diakses,
// dan akan mengambil data produk dari API sebelum merender halaman.
export async function getServerSideProps({
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
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
