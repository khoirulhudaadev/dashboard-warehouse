// import { useDispatch } from 'react-redux';
import { typeRoute } from '@services/endpoints';
import { AppDispatch } from '@stores/store';
import { storeTypes } from '@stores/type/typeSlice';
import { FormikHelpers, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TypeType } from 'types/type';
import * as Yup from 'yup';
import { UserResponse } from '../../types/auth';

// Define the type for hook parameters
interface UseTypeFormikProps {
	onError?: (message: string) => void;
	onResponse: () => void;
}

// Define the type for the formik hook return value
type UseTypeFormikReturn = ReturnType<typeof useFormik<TypeType>>;

export const useCreateTypeFormik = ({ onError, onResponse }: UseTypeFormikProps): UseTypeFormikReturn => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const formik = useFormik<TypeType>({
		initialValues: { type_name: '' },
		validationSchema: Yup.object({
			type_name: Yup.string().required('Mohon masukkan nama jenis!'),
		}),
		onSubmit: async (values: TypeType, { resetForm } : FormikHelpers<TypeType>) => {
			try {

				const datas = {
					type_name: values.type_name
				}

				const { data }: {data: UserResponse, status: number} = await typeRoute.addType(datas);
				console.log('response', data)
				if (Number(data?.statusCode) === 201 || Number(data?.statusCode) === 200 && data !== null) {
					resetForm()
					onResponse()
					const result = await typeRoute.getAllType()
					dispatch(storeTypes(result?.data?.data))
					
					Swal.fire({
						icon: 'success',
						title: "Berhasil",
						html: 'Data jenis berhasil dibuat!',
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
	
					navigate('/jenis-barang')
				}
			} catch (error: any) {
				console.error('Login Error: ', error);
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

export default useCreateTypeFormik;
