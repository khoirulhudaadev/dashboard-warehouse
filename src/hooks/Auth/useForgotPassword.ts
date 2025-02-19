import { FormikHelpers, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import * as endpoints from '@services/endpoints';
import { AuthResponse, authType } from '../../types/auth';

// Define the type for hook parameters
interface useForgotFormikFormikProps {
	onError?: (message: string) => void;
	onResponse: () => void;
}

// Define the type for the formik hook return value
type useForgotFormikFormikReturn = ReturnType<typeof useFormik<authType>>;

export const useForgotFormik = ({ onError, onResponse }: useForgotFormikFormikProps): useForgotFormikFormikReturn => {
	const navigate = useNavigate();

	const formik = useFormik<authType>({
		initialValues: { email: ''},
		validationSchema: Yup.object({
			email: Yup.string().email('Format email tidak valid!').required('Mohon masukkan email Anda!'),
		}),
		onSubmit: async (values: authType, { resetForm } : FormikHelpers<authType>) => {
			try {
				

				const { data }:{ data: AuthResponse, status: number } = await endpoints.auth.forgotPassword(values);

                console.log('data', data)

				if (Number(data?.statusCode) === 201 && (typeof data?.data === 'string' && data !== null)) {
					// Store
					onResponse()
					// Clear form and navigate to index
					resetForm(); 
                    navigate('/sukses');
				
				} else {
					// Notifications
					Swal.fire({
						icon: 'error',
						title: "Upsss!",
						html: 'Terjadi kesalahan saat kirim pesan!',
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
				console.error('Kirim pesan email Error: ', error);
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

export default useForgotFormik;
