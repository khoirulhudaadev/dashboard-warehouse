import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import AddItem from '@pages/Create/AddItem';
import AddType from '@pages/Create/AddType';
import AddUnit from '@pages/Create/AddUnit';
import Delivery from '@pages/Delivery';
import FormElements from '@pages/Form/FormElements';
import FormLayout from '@pages/Form/FormLayout';
import Item from '@pages/Item';
import UpdateType from '@pages/Update/UpdateType';
import UpdateUnit from '@pages/Update/UpdateUnit';
import UpdateUser from '@pages/Update/UpdateUser';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/SignIn';
import AddUser from './pages/Create/AddUser';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import Success from './pages/Result/Success';
import Type from './pages/Type';
import Unit from './pages/Unit';
import User from './pages/User';
import Chart from '@pages/Chart';

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

      {/* ============================  MAINS  =============================== */}
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
        path='/forgot-password'
        element={
          <DefaultLayout useLayout={false}>
            <PageTitle title="Kirim pesan email" />
            <ForgotPassword />
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
        path='/sukses'
        element={
          <DefaultLayout useLayout={false}>
            <PageTitle title="Berhasil kirim permintaan" />
            <Success />
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
        path="/data-barang"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Barang masuk" />
            <Item />
          </DefaultLayout>
        }
      />
      <Route
        path="/barang-keluar"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Barang keluar" />
            <Delivery />
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


      {/* ============================  CREATES  =============================== */}
      <Route
        path="/tambah-pengguna"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Tambah pengguna baru" />
            <AddUser />
          </DefaultLayout>
        }
      />
      <Route
        path="/tambah-satuan"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Tambah satuan baru" />
            <AddUnit />
          </DefaultLayout>
        }
      />
      <Route
        path="/tambah-jenis"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Tambah jenis baru" />
            <AddType />
          </DefaultLayout>
        }
      />
      <Route
        path="/tambah-barang"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Masukan barang baru" />
            <AddItem />
          </DefaultLayout>
        }
      />

      {/* =============================  UPDATES  ============================== */}
      <Route
        path="/perbarui-data-pengguna/:id"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Perbarui data pengguna" />
            <UpdateUser />
          </DefaultLayout>
        }
      />
      <Route
        path="/perbarui-data-satuan/:id"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Perbarui data satuan" />
            <UpdateUnit />
          </DefaultLayout>
        }
      />
      <Route
        path="/perbarui-data-jenis/:id"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Perbarui data jenis" />
            <UpdateType />
          </DefaultLayout>
        }
      />


      <Route
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
        path="/chart"
        element={
        <DefaultLayout useLayout={true}>
            <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Chart />
          </DefaultLayout>  
        }
      />

      {/* =============================  OTHERS  ============================== */}
      {/* <Route
        path="/ui/alerts"
        element={
          <DefaultLayout useLayout={true}>
            <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Alerts />
          </DefaultLayout>
        }
      /> */}
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
