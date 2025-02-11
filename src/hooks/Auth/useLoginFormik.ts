import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useFormik, FormikHelpers } from 'formik';
import { AppDispatch } from '../../stores/store';
import { storeUser, storeToken } from '../../stores/auth/authSlice';
import * as endpoints from '../../services/endpoints';
import { authType } from '../../types/auth';

// Define the type for hook parameters
interface UseLoginFormikProps {
	onError?: (message: string) => void;
}

// Define the type for the formik hook return value
type UseLoginFormikReturn = ReturnType<typeof useFormik<authType>>;

export const useLoginFormik = ({ onError }: UseLoginFormikProps): UseLoginFormikReturn => {
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
				const { data } = await endpoints.auth.login(values);

                console.log('data', data)

				if (Number(data?.status) === 200 && (typeof data === 'object' && data !== null)) {
					// Store
					dispatch(storeUser(data.data?.user));
					dispatch(storeToken(data.data?.token));

					// Clear form and navigate to index
					resetForm(); 
                    navigate('/');

					// Notifications
					Swal.fire({
						icon: 'success',
						title: "Logged In",
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
					Swal.fire({
						icon: 'warning',
						title: "Masuk",
						html: 'Terjadi kesalahan, silahkan coba kembali beberapa saat',
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
			} catch (error: unknown) {
				console.error('Login Error: ', error);
				if (onError) {
					onError('Terjadi kesalahan, silahkan coba kembali beberapa saat');
				}
				
			}
		},
	});

	return formik;
};

export default useLoginFormik;
