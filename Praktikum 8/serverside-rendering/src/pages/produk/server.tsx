import TampilanProduk from "@/views/produk";

const halamanProdukServer = () => {
    return(
        <div>
            <h1>Halaman Produk Server</h1>
            <TampilanProduk products={[]} />
        </div>
    )
}

export default halamanProdukServer;