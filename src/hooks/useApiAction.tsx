import { AppDispatch } from "@stores/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const useApiActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Generic delete function
  const deleteItem = async (
    id: string, 
    getAllDataFunc: () => Promise<any>, 
    deleteApiFunc: (id: string) => Promise<any>, 
    dispactAction: (data: any) => any,
    url: string
    ) => {
        try {
            const resultDelete = await deleteApiFunc(id);
            console.log("resultDelete", resultDelete);
            if (resultDelete.status === 201 || resultDelete.status === 200) {
                const result = await getAllDataFunc();
                dispatch(dispactAction(result?.data?.data));
                Swal.fire({
                    icon: 'success',
                    title: "Berhasil!",
                    text: 'Data berhasil dihaps!.',
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
                navigate(url);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "Upsss!",
                text: 'Terlalu banyak percobaan, tunggu beberapa saat untuk coba lagi.',
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
            console.error("Error deleting item:", error);
        }
  };

  // Generic update function
  const updateItem = async (
    id: string,
    body: any,
    getAllDataFunc: () => Promise<any>, 
    updateApiFunc: (id: string, body: any) => Promise<any>, 
    dispactAction: (data: any) => any,
    url: string
  ) => {
        try {
            console.log('body update:', body)
            const resultUpdate = await updateApiFunc(id, body);
            console.log("resultUpdate", resultUpdate);
        if (resultUpdate.status === 201 || resultUpdate.status === 200) {
            const result = await getAllDataFunc();
            dispatch(dispactAction(result?.data?.data));
            Swal.fire({
                icon: 'success',
                title: "Berhasil!",
                text: 'Data berhasil diperbarui!.',
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
            navigate(url);
        }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "Upsss!",
                text: 'Terlalu banyak percobaan, tunggu beberapa saat untuk coba lagi.',
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
            console.error("Error updating item:", error);
        }
  };

  return { deleteItem, updateItem };
  
};
