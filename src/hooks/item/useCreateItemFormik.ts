// import { useDispatch } from 'react-redux';
import { AppDispatch } from '@stores/store';
import { FormikHelpers, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { UserResponse } from '../../types/auth';
import { storeItems } from '@stores/item/itemSlice';
import { ItemOnly } from 'types/item';
import { itemRoute } from '@services/endpoints';

// Define the type for hook parameters
interface UseCreateItemFormikProps {
	onError?: (message: string) => void;
	onResponse: () => void;
    id: string | number;
}

// Define the type for the formik hook return value
type UseCreateItemFormikReturn = ReturnType<typeof useFormik<ItemOnly>>;

export const useCreateItemFormik = ({ onError, onResponse, id }: UseCreateItemFormikProps): UseCreateItemFormikReturn => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const formik = useFormik<ItemOnly>({
		initialValues: { item_name: '', type_id: 0, unit_id: 0, amount: 0, image: null },
		validationSchema: Yup.object({
			item_name: Yup.string().required('Mohon masukkan nama barang!'),
			type_id: Yup.number().required('Mohon masukkan jenis barang!'),
			unit_id: Yup.number().required('Mohon masukkan satuan barang!'),
			amount: Yup.number().required('Mohon masukkan angka!'),
            image: Yup.mixed<File>()
            .required('Mohon unggah gambar!')
            .test('fileType', 'Hanya menerima format JPG, PNG, atau JPEG', (value: any) => {
                return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
            })
            .test('fileSize', 'Ukuran file maksimal 2MB!', (value: any) => {
                return value && value.size <= 2 * 1024 * 1024; // 2MB
            }),
		}),
		onSubmit: async (values: ItemOnly, { resetForm } : FormikHelpers<ItemOnly>) => {
			try {
                console.log(values);
                const formData = new FormData();
                
                if (values.image instanceof File) {
                    formData.append("image", values.image);
                  } else {
                    if (onError) {
                        onError('Terjadi kesalahan, silahkan coba kembali beberapa saat');
                    }
                }
                formData.append('user_id', id.toString())
                formData.append('item_name', values.item_name)
                formData.append('unit_id', values.unit_id.toString())
                formData.append('type_id', values.type_id.toString())
                formData.append('amount', values.amount.toString())

                if(values.image) {
					formData.append('image', values.image)
                } else {
					if(onError) {
						onError('Upload gambar terdahulu');
					}
				}


				const { data }: {data: UserResponse, status: number} = await itemRoute.addItem(formData);
				console.log('response', data)
				if (Number(data?.statusCode) === 201 || Number(data?.statusCode) === 200 && data !== null) {
					resetForm()
					onResponse()
					const result = await itemRoute.getAllItem()
					dispatch(storeItems(result?.data?.data))
					
					Swal.fire({
						icon: 'success',
						title: "Berhasil",
						html: 'Barang berhasil dimasukan!',
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

export default useCreateItemFormik;
