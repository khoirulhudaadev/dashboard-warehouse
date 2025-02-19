import useCreateItemFormik from '@hooks/item/useCreateItemFormik';
import { Loading03Icon } from 'hugeicons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Error from '../../components/ErrorMessage';
import { RootState } from '../../stores';

const AddItem = () => {

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
 
  const units = useSelector((state: RootState) => state.unit.units)
  const types = useSelector((state: RootState) => state.type.types)
  const detailUser = useSelector((state: RootState) => state.auth.auth)
 
  const handleSetError = (error: string) => {
    setError(error)
  }

  const useCreateItem = useCreateItemFormik({
    onError: (e: string) => {
       handleSetError(e);
       setLoading(false); 
    },
    onResponse: () => {
        setError('');
        setLoading(false); 
    },
    id: detailUser?.user_id ?? 1
 });


  return (
    <>
      <Breadcrumb pageName="Tambah barang" />

        <form onSubmit={useCreateItem.handleSubmit} encType='multipart/formdata' className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center gap-4 border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Formulir
                </h3>
                {error && <Error type="input-error" text={'Data yang dimasukan tidak sesuai!'} />}
            </div>
            <div className="flex flex-col p-6.5">
                <div className='relative'>
                    <label className="mb-3 block text-black dark:text-white">
                        Nama barang
                    </label>
                    <input
                        type="text"
                        name='item_name'
                        value={useCreateItem.values.item_name}
                        onBlur={useCreateItem.handleBlur}
                        onChange={useCreateItem.handleChange}
                        placeholder="Masukan nama satuan"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                {useCreateItem.touched.item_name && useCreateItem.errors.item_name && (
                  <p className="text-red-500 text-sm">
                    {useCreateItem.errors.item_name ?? 'Masukan satuan dengan benar!'}
                  </p>
                )}

                <div className='relative mt-6'>
                    <label className="mb-3 block text-black dark:text-white">
                        Jumlah
                    </label>
                    <input
                        type="number"
                        name='amount'
                        value={useCreateItem.values.amount}
                        onBlur={useCreateItem.handleBlur}
                        min={0}
                        onChange={useCreateItem.handleChange}
                        placeholder="Masukan nama satuan"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                {useCreateItem.touched.amount && useCreateItem.values.amount === 0 && (
                  <p className="text-red-500 text-sm">
                    {useCreateItem.errors.amount ?? 'Masukan jumlah minimal 1'}
                  </p>
                )}

                <div className='mt-6'>
                    <label className="mb-3 block text-black dark:text-white">
                        Pilih satuan
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                        <select
                            name='unit_id'
                            value={useCreateItem.values.unit_id} 
                            onChange={(e) => {
                                const selectedRoleId = e.target.value;
                                useCreateItem.setFieldValue("unit_id", selectedRoleId); 
                            }}
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                            >
                            <option value="" className="text-body dark:text-bodydark">
                                Pilih satuan
                            </option>
                            {units?.map((data: any, index: number) => (
                                <option key={index} value={data.unit_id} className="text-body dark:text-bodydark">
                                    {data.unit_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {useCreateItem.touched.unit_id && useCreateItem.values.unit_id === 0 && (
                        <p className="text-red-500 text-sm">
                            {useCreateItem.errors.unit_id ?? 'Masukan jenis dengan benar!'}
                        </p>
                    )}
                </div>

                <div className='mt-6'>
                    <label className="mb-3 block text-black dark:text-white">
                        Pilih jenis
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                        <select
                            name='type_id'
                            value={useCreateItem.values.type_id} 
                            onChange={(e) => {
                                const selectedRoleId = e.target.value;
                                useCreateItem.setFieldValue("type_id", selectedRoleId); 
                            }}
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                            >
                            <option value="" className="text-body dark:text-bodydark">
                                Pilih jenis
                            </option>
                            {types?.map((data: any, index: number) => (
                                <option key={index} value={data.type_id} className="text-body dark:text-bodydark">
                                    {data.type_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {useCreateItem.touched.type_id && useCreateItem.values.type_id === 0 && (
                        <p className="text-red-500 text-sm">
                            {useCreateItem.errors.type_id ?? 'Masukan satuan dengan benar!'}
                        </p>
                    )}
                </div>

                <div className='mt-6'>
                    <label className="mb-3 block text-black dark:text-white">
                        Pilih gambar
                    </label>
                    <input
                        type="file"
                        name='image'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0]; // Ambil file pertama
                            if (file) {
                              useCreateItem.setFieldValue("image", file); // Pastikan menyimpan File, bukan FileList
                            }
                        }}
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                </div>
             
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

export default AddItem;
