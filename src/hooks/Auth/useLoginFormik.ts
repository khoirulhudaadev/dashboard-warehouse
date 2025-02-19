import { FormikHelpers, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import * as endpoints from '../../services/endpoints';
import { storeToken, storeUser } from '../../stores/auth/authSlice';
import { AppDispatch } from '../../stores/store';
import { AuthResponse, authType } from '../../types/auth';

// Define the type for hook parameters
interface UseLoginFormikProps {
	onError?: (message: string) => void;
	onResponse: () => void;
}

// Define the type for the formik hook return value
type UseLoginFormikReturn = ReturnType<typeof useFormik<authType>>;

export const useLoginFormik = ({ onError, onResponse }: UseLoginFormikProps): UseLoginFormikReturn => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const formik = useFormik<authType>({
		initialValues: { email: '', password: '' },
		validationSchema: Yup.object({
			email: Yup.string().email('Format email tidak valid!').required('Mohon masukkan email Anda!'),
			password: Yup.string().required('Password tidak boleh kosong!'),
		}),
		onSubmit: async (values: authType, { resetForm } : FormikHelpers<authType>) => {
			try {

				const { data }:{ data: AuthResponse, status: number } = await endpoints.auth.login(values);

                console.log('data', data)
                // console.log('status', status)

				if (Number(data?.statusCode) === 200 && (typeof data?.data === 'object' && data !== null)) {
					// Store
					dispatch(storeUser(data.data?.user));
					dispatch(storeToken(data.data?.token));
					onResponse()
					// Clear form and navigate to index
					resetForm(); 
                    navigate('/halaman-utama');

					// Notifications
					Swal.fire({
						icon: 'success',
						title: "Masuk",
						html: `Selamat datang kembali, <span class="font-600">${data?.data?.user?.username}</span>`,
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
				} else {
					// Notifications
					if(onError) {
						onError('Terjadi kesalahan saat masuk!')
					}
					Swal.fire({
						icon: 'error',
						title: "Upsss!",
						html: 'Terjadi kesalahan saat masuk!',
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

export default useLoginFormik;
