import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "@/views/DetailProduct";
import { ProductType } from "@/types/Produk.type";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HalamanProdukCSR = () => {
  const router = useRouter();
  const { produk } = router.query;

  const { data, error, isLoading } = useSWR(
    produk ? `/api/produk/${produk}` : null,
    fetcher
  );

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Error loading product</h2>
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          <strong>Rendering Mode:</strong> Client-Side Rendering (CSR)
        </p>
      </div>
      <DetailProduk products={data.data} />
    </div>
  );
};

export default HalamanProdukCSR;
