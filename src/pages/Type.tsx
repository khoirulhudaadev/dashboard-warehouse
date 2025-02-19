import TableType from "@components/Tables/TableType";
import { useApiActions } from "@hooks/useApiAction";
import { typeRoute } from "@services/endpoints";
import { RootState } from "@stores/index";
import { AppDispatch } from "@stores/store";
import { storeType, storeTypes } from "@stores/type/typeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Type = () => {

  const { deleteItem } = useApiActions();
  const dispatch = useDispatch<AppDispatch>()
  const types = useSelector((state: RootState) => state.type.types);
  const navigate = useNavigate();

  const columns = [
    "NO",
    "NAMA JENIS",
    "ID JENIS",
    "TGL DIBUAT",
    "OPSI",
  ]

  const handleUpdate = async (id: string, body: any) => {
    console.log('update', body)
    if((id || body) !== null || (id || body) !== undefined) {
      navigate(`/perbarui-data-jenis/${id}`);
      dispatch(storeType(body));
    } else {
      Swal.fire({
          icon: 'error',
          title: "Upsss!",
          text: 'ID atau data tidak didapatkan',
          showCancelButton: false,
          showConfirmButton: false,
          customClass: {
              popup: "!rounded-[12px] !bg-white !w-[30rem] !py-[2rem] !overflow-hidden",
              icon: "!mt-0",
              title: "!pt-[5px] !text-size-md font-700",
              htmlContainer: "!pt-[5px] !pb-[1rem] !my-0",
              timerProgressBar: "!bg-Neutrals-300",
          },
          timer: 2000,
          timerProgressBar: true,
      });
    }
  }
  
  const handleDelete = (id: string) => {
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda akan hapus data jenis ini?",
        icon: 'question',
        showCancelButton: true, // Menampilkan tombol Cancel
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batalkan',
        customClass: {
          cancelButton: "!bg-blue-500 !!w-max !px-4 !overflow-hidden",
          confirmButton: "!bg-slate-300 !text-slate-500 !px-4",
        },
        reverseButtons: true, // Agar urutan tombol Ya dan Tidak berbalik
    }).then((result) => {
        if (result.isConfirmed) {
          // Jika klik "Ya", clear user data dan redirect ke homepage
          deleteItem(id, typeRoute.getAllType, typeRoute.deleteType, storeTypes, '/jenis-barang')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Jika klik "Tidak" atau tombol Cancel
          console.log('Anda batal hapus jenis');
        }
    });
  }

  return (
    <div>
      <TableType 
        columns={columns} 
        data={types ?? []} 
        title="jenis barang" 
        onDelete={(id: string) => handleDelete(id)}
        onUpdate={(id: string, body: any) => handleUpdate(id, body)}
      />
    </div>
  )
}

export default Type
