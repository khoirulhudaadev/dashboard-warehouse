// import { useDispatch } from 'react-redux';
import { unitRoute } from '@services/endpoints';
import { AppDispatch } from '@stores/store';
import { FormikHelpers, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UnitType } from 'types/unit';
import * as Yup from 'yup';
import { UserResponse } from '../../types/auth';
import { storeUnits } from '@stores/unit/unitSlice';

// Define the type for hook parameters
interface UseUnitFormikProps {
	onError?: (message: string) => void;
	onResponse: () => void;
}

// Define the type for the formik hook return value
type UseUnitFormikReturn = ReturnType<typeof useFormik<UnitType>>;

export const useCreateUnitFormik = ({ onError, onResponse }: UseUnitFormikProps): UseUnitFormikReturn => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const formik = useFormik<UnitType>({
		initialValues: { unit_name: '' },
		validationSchema: Yup.object({
			unit_name: Yup.string().required('Mohon masukkan nama satuan!'),
		}),
		onSubmit: async (values: UnitType, { resetForm } : FormikHelpers<UnitType>) => {
			try {

				const datas = {
					unit_name: values.unit_name
				}

				const { data }: {data: UserResponse, status: number} = await unitRoute.addUnit(datas);
				console.log('response', data)
				if (Number(data?.statusCode) === 201 || Number(data?.statusCode) === 200 && data !== null) {
					resetForm()
					onResponse()
					const result = await unitRoute.getAllUnit()
					dispatch(storeUnits(result?.data?.data))
					
					Swal.fire({
						icon: 'success',
						title: "Berhasil",
						html: 'Data satuan berhasil dibuat!',
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
	
					navigate('/satuan-barang')
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

export default useCreateUnitFormik;
