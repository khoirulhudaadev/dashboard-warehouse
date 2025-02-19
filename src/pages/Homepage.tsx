import { deliveryRoute, itemRoute, roleRoute, typeRoute, unitRoute, userRoute } from '@services/endpoints';
import { RootState } from '@stores/index';
import { storeItems } from '@stores/item/itemSlice';
import { storeRoles } from '@stores/role/roleSlice';
import { AppDispatch } from '@stores/store';
import { storeTypes } from '@stores/type/typeSlice';
import { storeUnits } from '@stores/unit/unitSlice';
import { storeUsers } from '@stores/user/userSlice';
import { InboxDownloadIcon, InboxUploadIcon, LeftToRightListNumberIcon, PackageSearchIcon, UserSquareIcon } from 'hugeicons-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardDataStats from '../components/CardDataStats';
import DynamicTable from '../components/Tables/DynamicTable';
import ChartOne from '@components/Charts/ChartOne';

const Homepage: React.FC = () => {

  const users = useSelector((state: RootState) => state.user.users)
  const units = useSelector((state: RootState) => state.unit.units)
  const types = useSelector((state: RootState) => state.type.types)
  const items = useSelector((state: RootState) => state.item.items)
  const deliveries = useSelector((state: RootState) => state.delivery.deliveries)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() =>  {
    (async() => {
      const dataUser = await userRoute.getAllUser();
      const dataUnit = await unitRoute.getAllUnit();
      const dataType = await typeRoute.getAllType();
      const dataItem = await itemRoute.getAllItem();
      const dataRole = await roleRoute.getAllRoles();
      const dataDelivery = await deliveryRoute.getAllDelivery();
      dispatch(storeUsers(dataUser?.data?.data))
      dispatch(storeUnits(dataUnit?.data?.data))
      dispatch(storeTypes(dataType?.data?.data))
      dispatch(storeItems(dataItem?.data?.data))
      dispatch(storeRoles(dataRole?.data?.data))
      dispatch(storeRoles(dataDelivery?.data?.data))
    })()
  }, [])

  const columns = [
    "NO",
    "NAMA BARANG",
    "JUMLAH",
    "JENIS",
    "PENGELOLA",
    "SATUAN",
  ]

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats onclick={() => navigate('/barang-masuk')} title="Barang masuk" total={items?.length ?? 0}>
          <InboxDownloadIcon className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats onclick={() => navigate('/barang-keluar')} title="Barang keluar" total={deliveries?.length ?? 0}>
          <InboxUploadIcon className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats onclick={() => navigate('/jenis-barang')} title="Jenis barang" total={types?.length ?? 0}>
         <PackageSearchIcon className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats onclick={() => navigate('/satuan-barang')} title="Satuan barang" total={units?.length ?? 0}>
         <LeftToRightListNumberIcon className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats onclick={() => navigate('/pengelolaan-pengguna')} title="Jumlah pengguna" total={`${users?.length ?? 0} akun`}>
         <UserSquareIcon className='text-primary dark:text-white' />
        </CardDataStats>
      </div>

      <ChartOne dataIn={items ?? []} dataOut={deliveries ?? []}  />

      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-1">
          <DynamicTable title='Data barang' columns={columns} data={items ?? []} />
        </div>
      </div>
    </>
  );
};

export default Homepage;
