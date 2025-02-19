import TableDelivery from "@components/Tables/TableDelivery"
import { useApiActions } from "@hooks/useApiAction"
import { deliveryRoute } from "@services/endpoints"
import { storeDeliveries } from "@stores/delivery/deliverySlice"
import { RootState } from "@stores/index"
import { AppDispatch } from "@stores/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const Delivery = () => {
  const { deleteItem } = useApiActions();
  const dispatch = useDispatch<AppDispatch>()
  const deliveries = useSelector((state: RootState) => state.delivery.deliveries)
  const navigate = useNavigate();
  console.log('deliveries', deliveries)

  useEffect(() => {
    (async() => {
          const dataDeliveries = await deliveryRoute.getAllDelivery();
          dispatch(storeDeliveries(dataDeliveries?.data?.data))
    })()
  }, [])

  const columns = [
    "NO",
    "NAMA BARANG",
    "PENGELOLA (IN)",
    "PENGELOLA (OUT)",
    "JUMLAH",
    "OPSI",
  ]

  const handleOnRestore = async (body: any) => {
    if (!body) {
        Swal.fire({
            icon: 'error',
            title: "Upsss!",
            text: 'Data tidak didapatkan',
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
        return;
    }

    Swal.fire({
        title: "Yakin pulihkan?",
        text: 'Apakah anda ingin mengembalikan data tersebut?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Pulihkan',
        cancelButtonText: 'Batalkan',
        customClass: {
            cancelButton: "!bg-blue-500 !!w-max !px-4 !overflow-hidden",
            confirmButton: "!bg-slate-300 !text-slate-500 !px-4",
        },
        reverseButtons: true,
    }).then(async (result) => {
        if (!result.isConfirmed) {
            console.log('Anda batal memulihkan data');
            return;
        }

        try {
            const { data }: { data: any } = await deliveryRoute.restoreDelivery(body?.delivery_id);
            console.log('dd', data);

            if (Number(data?.status) === 200 || Number(data?.status) === 201) {
                Swal.fire({
                    icon: 'success',
                    title: "Berhasil!",
                    text: 'Barang telah dipulihkan',
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

                const resultDelivery = await deliveryRoute.getAllDelivery();
                dispatch(storeDeliveries(resultDelivery?.data?.data));
                navigate('/barang-keluar');
            } else {
                throw new Error(data?.response?.data?.message ?? 'Terjadi kesalahan saat memulihkan data');
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: "Gagal!",
                text: `${error?.status === 403 ? 'Barang tersebut sudah tidak ada!' : error?.response?.data?.message}`,
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
    });
  };

  const handleDelete = (id: string) => {
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda akan hapus data ini?",
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
          deleteItem(id, deliveryRoute.getAllDelivery, deliveryRoute.deleteDelivery, storeDeliveries, '/barang-keluar')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Jika klik "Tidak" atau tombol Cancel
          console.log('Anda batal hapus barang');
        }
    });
  }

  return (
    <div>
      <TableDelivery 
        columns={columns} 
        data={deliveries ?? []} 
        title="barang keluar" 
        onDelete={(id: string) => handleDelete(id)}
        onRestore={(body: any) => handleOnRestore(body)}
      />
    </div>
  )
}

export default Delivery
