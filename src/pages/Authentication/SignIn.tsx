import { InboxCheckIcon, Loading03Icon, ViewIcon, ViewOffIcon } from 'hugeicons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Error from '../../components/ErrorMessage';
import useLoginFormik from '../../hooks/Auth/useLoginFormik';
import { clearUser } from '../../stores/auth/authSlice';

const SignIn: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(clearUser())
  }, [])

  const handleSetError = (e: string) => {
    setError(e);
  };

  const useLogin = useLoginFormik({
    onError: (e: string) => {
      handleSetError(e);
      setLoading(false); // Set loading false if error occurs
    },
    onResponse: () => {
      setError('');
      setLoading(false); // Set loading false after successful response
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before submitting

    useLogin.handleSubmit(); // Proceed with form submission
  };

  return (
    <div className="w-screen h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="h-full flex flex-wrap items-center">
        
        {/* Menu kiri */}
        <div className="hidden bg-blue-600 text-white h-full w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center flex flex-col justify-center items-center h-full">
            <Link className="mb-5.5 inline-block" to="/">
              <div className='flex items-center gap-4'>
                <h2 className='font-semibold text-[40px] mb-2'>Warehouse</h2>
              </div>
            </Link>

            <InboxCheckIcon className='w-50 h-50 mt-10' />
          </div>
        </div>

        {/* Menu kanan */}
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Selamat datang</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Masuk gudang digital
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Akun email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={useLogin.values.email}
                    onChange={useLogin.handleChange}
                    onBlur={useLogin.handleBlur}
                    placeholder="xxxx@gmail.com"
                    className={`w-full rounded-lg border ${
                      useLogin.touched.email && useLogin.errors.email
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {useLogin.touched.email && useLogin.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {useLogin.errors.email ?? 'Masukan email yang sesuai!'}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Kata sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={useLogin.values.password}
                    onBlur={useLogin.handleBlur}
                    onChange={useLogin.handleChange}
                    placeholder="**********"
                    className={`w-full rounded-lg border ${
                      useLogin.touched.password && useLogin.errors.password
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
                {useLogin.touched.password && useLogin.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {useLogin.errors.password ?? 'Masukan password yang sesuai!'}
                  </p>
                )}
              </div>
              

              <div className="mb-5">
                <button
                  type="submit" // Make sure it is "submit" to trigger form submission
                  className={`w-full p-4 flex justify-center items-center rounded-lg border ${
                    loading
                      ? 'order-slate-400 bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border-blue-600 bg-blue-600 text-white transition hover:bg-opacity-90 cursor-pointer'
                  }`}
                >
                  <p>Masuk sekarang</p>
                  {loading && (
                    <Loading03Icon className="relative top-[1px] ml-4 animate animate-spin duration-200" />
                  )}
                </button>
              </div>

              {error && <Error type="input-error" text={'Email atau password salah!'} />}

              <div className="mt-6 text-center">
                <p>
                  Lupa password?{' '}
                  <Link to="/forgot-password" className="text-primary">
                    Reset ulang
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
