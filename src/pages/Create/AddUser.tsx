import { Loading03Icon, ViewIcon, ViewOffIcon } from 'hugeicons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Error from '../../components/ErrorMessage';
import useCreateUserFormik from '../../hooks/User/useCreateUserFormik';
import { RootState } from '../../stores';

const AddUser = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
 
  const roles = useSelector((state: RootState) => state.role.roles)
  console.log('roles', roles)
 
  const handleSetError = (error: string) => {
    setError(error)
  }

  const useCreateUser = useCreateUserFormik({
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
    
     useCreateUser.handleSubmit();
 
  };

  return (
    <>
      <Breadcrumb pageName="Tambah pengguna" />

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
                        Nama pengguna
                    </label>
                    <input
                        type="text"
                        name='username'
                        value={useCreateUser.values.username}
                        onBlur={useCreateUser.handleBlur}
                        onChange={useCreateUser.handleChange}
                        placeholder="Masukan nama pengguna"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                {useCreateUser.touched.username && useCreateUser.errors.username && (
                  <p className="text-red-500 text-sm">
                    {useCreateUser.errors.username ?? 'Masukan nama dengan benar!'}
                  </p>
                )}
                
                <div className='mt-6'>
                    <label className="mb-3 block text-black dark:text-white">
                        Akun email
                    </label>
                    <input
                        type="email"
                        name='email'
                        value={useCreateUser.values.email}
                        onBlur={useCreateUser.handleBlur}
                        onChange={useCreateUser.handleChange}
                        placeholder="example@gmail.com"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                {useCreateUser.touched.email && useCreateUser.errors.email && (
                  <p className="text-red-500 text-sm">
                    {useCreateUser.errors.email ?? 'Masukan email dengan benar!'}
                  </p>
                )}

                <div className='mt-6'>
                    <label className="mb-3 block text-black dark:text-white">
                        Kata sandi (min: 8 karakter)
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={useCreateUser.values.password}
                            onBlur={useCreateUser.handleBlur}
                            onChange={useCreateUser.handleChange}
                            placeholder="**********"
                            className={`w-full rounded-lg border ${
                            useCreateUser.touched.password && useCreateUser.errors.password
                                ? 'border-red-500'
                                : 'border-stroke'
                            } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        <span className="absolute text-slate-400 right-4 top-4">
                            {showPassword ? (
                                <ViewIcon onClick={() => setShowPassword(false)} />
                            ) : (
                                <ViewOffIcon onClick={() => setShowPassword(true)} />
                            )}
                        </span>
                    </div>
                    {useCreateUser.touched.password && useCreateUser.errors.password && (
                        <p className="text-red-500 text-sm">
                            {useCreateUser.errors.password ?? 'Masukan password dengan benar!'}
                        </p>
                    )}
                </div>

                <div className='mt-6'>
                    <label className="mb-3 block text-black dark:text-white">
                        Pilih jabatan
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                        <select
                            name='role_id'
                            value={useCreateUser.values.role_id} 
                            onChange={(e) => {
                                const selectedRoleId = e.target.value;
                                useCreateUser.setFieldValue("role_id", selectedRoleId); 
                            }}
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                            >
                            <option value="" className="text-body dark:text-bodydark">
                                Pilih jabatan
                            </option>
                            {roles?.map((data: any, index: number) => (
                                <option key={index} value={data.role_id} className="text-body dark:text-bodydark">
                                    {data.role_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {useCreateUser.touched.role_id && useCreateUser.values.role_id === 0 && (
                        <p className="text-red-500 text-sm">
                            {useCreateUser.errors.role_id ?? 'Masukan jabatan dengan benar!'}
                        </p>
                    )}
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

export default AddUser;
