import Link from "next/link";
import TampilanProduk from "@/views/produk";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

const kategori = () => {
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  return (
    <div>
      <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "1.5rem" }}>🚀 Rendering Modes - Halaman Detail Produk</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <Link
            href="/produk/docs"
            style={{
              display: "block",
              padding: "1.5rem",
              backgroundColor: "white",
              border: "2px solid #0066cc",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#0066cc",
              fontWeight: "bold",
              transition: "all 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0066cc";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#0066cc";
            }}
          >
            📚 Dokumentasi Lengkap
            <div style={{ fontSize: "0.85rem", marginTop: "0.5rem", opacity: 0.8 }}>
              Baca penjelasan detail tentang CSR, SSR, dan SSG
            </div>
          </Link>

          <Link
            href="/produk/comparison"
            style={{
              display: "block",
              padding: "1.5rem",
              backgroundColor: "white",
              border: "2px solid #f39c12",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#f39c12",
              fontWeight: "bold",
              transition: "all 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f39c12";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#f39c12";
            }}
          >
            🔗 Coba Semua Rendering Mode
            <div style={{ fontSize: "0.85rem", marginTop: "0.5rem", opacity: 0.8 }}>
              Pilih produk dan akses dengan CSR, SSR, atau SSG
            </div>
          </Link>

          <div
            style={{
              display: "block",
              padding: "1.5rem",
              backgroundColor: "#f0f0f0",
              border: "2px dashed #999",
              borderRadius: "8px",
              color: "#666",
            }}
          >
            💡 Tips
            <div style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
              Buka Developer Tools (F12) untuk melihat perbedaan dalam Network tab
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>📊 Quick Links ke Rendering Modes</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <a
                href="https://nextjs.org/docs/basic-features/data-fetching/client-side"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "1rem",
                  backgroundColor: "#e3f2fd",
                  border: "1px solid #0066cc",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#0066cc",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                📖 CSR Doc
              </a>
              <small style={{ color: "#666" }}>
                Fetch data di browser dengan SWR
              </small>
            </div>
            <div>
              <a
                href="https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "1rem",
                  backgroundColor: "#e8f5e9",
                  border: "1px solid #00aa00",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#00aa00",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                📖 SSR Doc
              </a>
              <small style={{ color: "#666" }}>
                Fetch data di server setiap request
              </small>
            </div>
            <div>
              <a
                href="https://nextjs.org/docs/basic-features/data-fetching/get-static-props"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "1rem",
                  backgroundColor: "#ffebee",
                  border: "1px solid #cc0000",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#cc0000",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                📖 SSG Doc
              </a>
              <small style={{ color: "#666" }}>
                Generate halaman saat build
              </small>
            </div>
          </div>
        </div>
      </div>

      <TampilanProduk products={data?.data || []} />
    </div>
  );
};

export default kategori;
