// import { useDispatch } from 'react-redux';
import { itemRoute } from '@services/endpoints';
import { storeItems } from '@stores/item/itemSlice';
import { AppDispatch } from '@stores/store';
import { FormikHelpers, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AmountType } from 'types/item';
import * as Yup from 'yup';
import { UserResponse } from '../../types/auth';

// Define the type for hook parameters
interface UseUpdateAmountItemFormikProps {
	onError?: (message: string) => void;
	onResponse: () => void;
    id: string;
    item_id: number;
	item_name: string; 
	management_in: string;
	management_out: string;
	type_name: string;
	type_id: number;
	unit_name: string;
	unit_id: number;
	image: string;
	image_public_id: string;
}

// Define the type for the formik hook return value
type UseUpdateAmountItemFormikReturn = ReturnType<typeof useFormik<AmountType>>;

export const useUpdateAmountItemFormik = ({ onError, onResponse, id, item_id, item_name, management_in, management_out, type_name, type_id, unit_name, unit_id, image, image_public_id }: UseUpdateAmountItemFormikProps): UseUpdateAmountItemFormikReturn => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const formik = useFormik<AmountType>({
		initialValues: { amount: 0 },
		validationSchema: Yup.object({
			amount: Yup.number().required('Mohon masukkan angka!'),
		}),
		onSubmit: async (values: AmountType, { resetForm } : FormikHelpers<AmountType>) => {
			try {

				const datas = {
					amount: values.amount,
					item_name, 
					item_id, 
					management_in,
					management_out,
					type_name,
					type_id,
					unit_name,
					unit_id,
					image,
					image_public_id,
				}

				console.log(datas)

				const { data }: {data: UserResponse, status: number} = await itemRoute.updateAmountItem(id, datas);
				console.log('response', data)
				if (Number(data?.statusCode) === 201 || Number(data?.statusCode) === 200 && data !== null) {
					resetForm()
					onResponse()
					const result = await itemRoute.getAllItem()
					dispatch(storeItems(result?.data?.data))
					
					Swal.fire({
						icon: 'success',
						title: "Berhasil",
						html: 'Barang berhasil dikeluarkan!',
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
	
					navigate('/data-barang')
				}
			} catch (error: any) {
				console.error('Error: ', error);
				if(error.status === 429 || error.response.data.message === "Too Many Attempts.") {
					Swal.fire({
						icon: 'error',
						title: "Upsss!",
						html: 'Terlalu banyak percobaan, tunggu beberapa saat untuk coba lagi.',
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
				if (onError) {
					onError('Terjadi kesalahan, silahkan coba kembali beberapa saat');
				}
				
			}
		},
	});

	return formik;
};

export default useUpdateAmountItemFormik;
