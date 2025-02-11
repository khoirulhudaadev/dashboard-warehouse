import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import Homepage from './pages/Homepage';
import Incoming from './pages/Incoming';
import Outgoing from './pages/Outgoing';
import Profile from './pages/Profile';
import Type from './pages/Type';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Unit from './pages/Unit';
import User from './pages/User';
import SignUp from './pages/Authentication/SignUp';
import SignIn from './pages/Authentication/SignIn';
import ResetPassword from './pages/Authentication/ResetPassword';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* <Route
        // index
        path='/daftar'
        element={
          <DefaultLayout useLayout={false}>
            <PageTitle title="Daftar" />
            <SignUp />
          </DefaultLayout>
        }
      /> */}
      <Route
        // index
        path='/'
        element={
          <DefaultLayout useLayout={false}>
            <PageTitle title="Masuk" />
            <SignIn />
          </DefaultLayout>
        }
      />
      <Route
        // index
        path='/reset-password'
        element={
          <DefaultLayout useLayout={false}>
            <PageTitle title="Reset kata sandi" />
            <ResetPassword />
          </DefaultLayout>
        }
      />
      <Route
        // index
        path='/halaman-utama'
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Halaman utama" />
            <Homepage />
          </DefaultLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Info pengguna" />
            <Profile />
          </DefaultLayout>
        }
      />
      <Route
        path="/barang-masuk"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Barang masuk" />
            <Incoming />
          </DefaultLayout>
        }
      />
      <Route
        path="/barang-keluar"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Barang keluar" />
            <Outgoing />
          </DefaultLayout>
        }
      />
      <Route
        path="/jenis-barang"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Jenis barang" />
            <Type />
          </DefaultLayout>
        }
      />
      <Route
        path="/satuan-barang"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Saatuan barang" />
            <Unit />
          </DefaultLayout>
        }
      />
      <Route
        path="/pengelolaan-pengguna"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Pengelolaan pengguna" />
            <User />
          </DefaultLayout>
        }
      />
        <Route
        path="/ui/alerts"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Alerts />
          </DefaultLayout>
        }
      />
      {/* <Route
        path="/ui/buttons"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Buttons />
          </DefaultLayout>  
        }
      /> */}
      {/* <Route
        path="/forms/form-elements"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormElements />
          </DefaultLayout>  
        }
      />
      <Route
        path="/forms/form-layout"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormLayout />
          </DefaultLayout>  
        }
      />
      <Route
        path="/tables"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Tables />
          </DefaultLayout>  
        }
      />
      <Route
        path="/settings"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Settings />
          </DefaultLayout>  
        }
      />
      <Route
        path="/chart"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Chart />
          </DefaultLayout>  
        }
      />
      <Route
        path="/ui/alerts"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Alerts />
          </DefaultLayout>  
        }
      />
      <Route
        path="/ui/buttons"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Buttons />
          </DefaultLayout>  
        }
      />
      <Route
        path="/auth/signin"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignIn />
          </DefaultLayout>  
        }
      />
      <Route
        path="/auth/signup"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignUp />
          </DefaultLayout>  
        }
      /> */}
    </Routes>
  );
}

export default App;
