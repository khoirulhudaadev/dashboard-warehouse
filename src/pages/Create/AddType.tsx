import { Loading03Icon } from 'hugeicons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Error from '../../components/ErrorMessage';
import useCreateTypeFormik from '../../hooks/Type/useCreateTypeFormik';
import { RootState } from '../../stores';

const AddType = () => {

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
 
  const roles = useSelector((state: RootState) => state.role.roles)
  console.log('roles', roles)
 
  const handleSetError = (error: string) => {
    setError(error)
  }

  const useCreateType = useCreateTypeFormik({
     onError: (e: string) => {
       handleSetError(e);
       setLoading(false); 
     },
     onResponse: () => {
       setError('');
       setLoading(false); 
     },
 });
 
  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
    
     useCreateType.handleSubmit();
 
  };

  return (
    <>
      <Breadcrumb pageName="Tambah jenis" />

        <form onSubmit={handleSubmit} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center gap-4 border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Formulir
                </h3>
                {error && <Error type="input-error" text={'Email atau password salah!'} />}
            </div>
            <div className="flex flex-col p-6.5">
                <div className='relative'>
                    <label className="mb-3 block text-black dark:text-white">
                        Nama jenis
                    </label>
                    <input
                        type="text"
                        name='type_name'
                        value={useCreateType.values.type_name}
                        onBlur={useCreateType.handleBlur}
                        onChange={useCreateType.handleChange}
                        placeholder="Masukan nama jenis"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                {useCreateType.touched.type_name && useCreateType.errors.type_name && (
                  <p className="text-red-500 text-sm">
                    {useCreateType.errors.type_name ?? 'Masukan jenis dengan benar!'}
                  </p>
                )}
             
                <div className="mt-5">
                    <button
                    type="submit" // Make sure it is "submit" to trigger form submission
                    className={`w-max p-3 flex justify-center items-center rounded-lg border ${
                        loading
                        ? 'order-slate-400 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'border-blue-600 bg-blue-600 text-white transition hover:bg-opacity-90 cursor-pointer'
                    }`}
                    >
                    <p>Simpan sekarang</p>
                    {loading && (
                        <Loading03Icon className="relative top-[1px] ml-4 animate animate-spin duration-200" />
                    )}
                    </button>
                </div>
            </div>
        </form>
    </>
  );
};

export default AddType;
