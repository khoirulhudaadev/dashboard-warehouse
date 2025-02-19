import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import * as endpoints from '@services/endpoints';
import { AuthResponse } from '../../types/auth';

// Define the type for hook parameters
interface useResetFormikFormikProps {
    onError?: (message: string) => void;
    onResponse: () => void;
    token?: string;
    email?: string;
}

// Define the type for the formik hook return value

export const useResetFormik = ({ onError, onResponse, token, email }: useResetFormikFormikProps) => {
    const navigate = useNavigate();

    const formik = useFormik<any>({
        initialValues: { password: ''},
        validationSchema: Yup.object({
            password: Yup.string().required('Mohon masukkan password Anda!'),
        }),
        onSubmit: async (values: any, { resetForm }) => {
            try {
                
                const dataValues = {
                    ...values,
                    email,
                    token
                }
                console.log('values:', dataValues)

                const { data }: { data: AuthResponse } = await endpoints.auth.resetPassword(dataValues);

                console.log('data', data)

                if (Number(data?.statusCode) === 201 && (typeof data?.data === 'string' && data !== null)) {
                    // Store
                    onResponse()
                    // Clear form and navigate to index
                    resetForm(); 
                    navigate('/');

                    Swal.fire({
                        icon: 'success',
                        title: "Berhasil",
                        html: 'Kata sandi telah diperbarui',
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
                        icon: 'error',
                        title: "Upsss!",
                        html: 'Terjadi kesalahan saat perbarui password!',
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
                console.error('Perbarui kata sandi Error: ', error);
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

export default useResetFormik;
