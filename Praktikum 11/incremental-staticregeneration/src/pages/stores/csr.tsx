import TampilanStores from "@/views/stores";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

const StoresCSR = () => {
  const { data, error, isLoading } = useSWR("/api/stores", fetcher);

  return (
    <div>
      <h1 style={{ padding: "20px", backgroundColor: "#e3f2fd", textAlign: "center" }}>
        Rendering: Client-Side Rendering (CSR)
      </h1>
      <TampilanStores stores={data?.data || []} isLoading={isLoading} />
    </div>
  );
};

export default StoresCSR;
