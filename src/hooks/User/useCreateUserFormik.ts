// import { useDispatch } from 'react-redux';
import { userRoute } from '@services/endpoints';
import { FormikHelpers, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { authType, UserResponse } from '../../types/auth';
import { AppDispatch } from '@stores/store';
import { useDispatch } from 'react-redux';
import { storeUsers } from '@stores/user/userSlice';

// Define the type for hook parameters
interface UseLoginFormikProps {
	onError?: (message: string) => void;
	onResponse: () => void;
}

// Define the type for the formik hook return value
type UseLoginFormikReturn = ReturnType<typeof useFormik<authType>>;

export const useCreateUserFormik = ({ onError, onResponse }: UseLoginFormikProps): UseLoginFormikReturn => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const formik = useFormik<authType>({
		initialValues: { username: '', email: '', password: '', role_id: 0 },
		validationSchema: Yup.object({
			username: Yup.string().required('Mohon masukkan nama pengguna!'),
			email: Yup.string().email('Format email tidak valid!').required('Mohon masukkan email pengguna!'),
			password: Yup.string().required('Password tidak boleh kosong!'),
		}),
		onSubmit: async (values: authType, { resetForm } : FormikHelpers<authType>) => {
			try {

				const datas = {
					username: values.username,
					email: values.email,
					password: values.password,
					role_id: values.role_id
				}

				const { data }: {data: UserResponse, status: number} = await userRoute.addUser(datas);
				if (Number(data?.statusCode) === 201 || Number(data?.statusCode) === 200 && data !== null) {
					resetForm()
					onResponse()
					const result = await userRoute.getAllUser()
					dispatch(storeUsers(result?.data?.data))

					Swal.fire({
						icon: 'success',
						title: "Berhasil",
						html: 'Akun pengguna berhasil dibuat!',
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
	
					navigate('/pengelolaan-pengguna')
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

export default useCreateUserFormik;
