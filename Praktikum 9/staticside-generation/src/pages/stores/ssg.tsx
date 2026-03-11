import TampilanStores from "@/views/stores";
import { StoreType } from "../../types/Store.type";

const HalamanStoresSSG = (props: { stores: StoreType[] }) => {
  const { stores } = props;
  return (
    <div>
      <h1 style={{ padding: "20px", backgroundColor: "#f3e5f5", textAlign: "center" }}>
        Rendering: Static Site Generation (SSG)
      </h1>
      <TampilanStores stores={stores} />
    </div>
  );
};

export default HalamanStoresSSG;

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:3000/api/stores");
  const response: { data: StoreType[] } = await res.json();

  // console.log("Data toko yang diambil dari API:", response);
  return {
    props: {
      stores: response.data,
    },
    revalidate: 3600, // Revalidate setiap 1 jam
  };
}
