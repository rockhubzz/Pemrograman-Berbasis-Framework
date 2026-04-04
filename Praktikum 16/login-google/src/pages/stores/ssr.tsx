import TampilanStores from "@/views/stores";
import { StoreType } from "../../types/Store.type";

const HalamanStoresSSR = (props: { stores: StoreType[] }) => {
  const { stores } = props;
  return (
    <div>
      <h1 style={{ padding: "20px", backgroundColor: "#fff3e0", textAlign: "center" }}>
        Rendering: Server-Side Rendering (SSR)
      </h1>
      <TampilanStores stores={stores} />
    </div>
  );
};

export default HalamanStoresSSR;

// Fungsi getServerSideProps akan dipanggil setiap kali halaman ini diakses,
// dan akan mengambil data toko dari API sebelum merender halaman.
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/stores");
  const response = await res.json();
  // console.log("Data toko yang diambil dari API:", response);
  return {
    props: {
      stores: response.data,
    },
  };
}
