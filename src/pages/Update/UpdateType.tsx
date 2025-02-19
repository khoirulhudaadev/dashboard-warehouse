import { useApiActions } from "@hooks/useApiAction";
import { typeRoute } from "@services/endpoints"; // Pastikan ada import untuk typeRoute
import { storeTypes } from "@stores/type/typeSlice";
import { Loading03Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Error from "../../components/ErrorMessage";
import { RootState } from "../../stores";

const UpdateType = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const detailType: any = useSelector((state: RootState) => state.type.detailType);
  console.log('detail', detailType)
  const { updateItem } = useApiActions();

  useEffect(() => {
    if (detailType?.type_name) {
      setName(detailType.type_name);
    }
  }, [detailType]);

  // Fungsi Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateItem(
        // ID satuan yang diperbarui
        detailType?.type_id, 
        // Data yang diperbarui
        {type_name: name }, 
        // Fungsi mendapatkan data terbaru
        typeRoute.getAllType, 
        // API update
        typeRoute.updateType, 
        // Redux action untuk menyimpan perubahan
        storeTypes,
        '/jenis-barang'
      );
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Gagal memperbarui satuan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Perbarui Jenis" />

      {/* <!-- Formulir Update --> */}
      <form
        onSubmit={handleSubmit}
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div className="flex items-center gap-4 border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Formulir</h3>
        </div>
        <div className="flex flex-col p-6.5">
          {/* Input Nama Pengguna */}
          <div className="relative">
            <label className="mb-3 block text-black dark:text-white">
              Nama Satuan
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Masukkan nama jenis"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Pesan Error */}
          {error && <Error text={error} />}

          {/* Tombol Submit */}
          <div className="mt-5">
            <button
              type="submit"
              className={`w-max p-3 flex justify-center items-center rounded-lg border ${
                loading
                  ? "border-slate-400 bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "border-blue-600 bg-blue-600 text-white transition hover:bg-opacity-90 cursor-pointer"
              }`}
              disabled={loading}
            >
              <p>{loading ? "Menyimpan..." : "Perbarui Sekarang"}</p>
              {loading && (
                <Loading03Icon className="relative top-[1px] ml-4 animate-spin duration-200" />
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateType;
