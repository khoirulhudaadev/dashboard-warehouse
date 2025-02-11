import { DeliveryBox01Icon, InboxDownloadIcon, InboxUploadIcon, LeftToRightListNumberIcon, PackageSearchIcon, UserSquareIcon } from 'hugeicons-react';
import React from 'react';
import CardDataStats from '../components/CardDataStats';
import DynamicTable from '../components/Tables/DynamicTable';

const Homepage: React.FC = () => {

  const columns = [
    "ID-BARANG",
    "NAMA BARANG",
    "JUMLAH",
    "SATUAN",
  ]

  const data = [
    "ID-121721",
    "Kipas LG",
    "120",
    "Unit",
  ]

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="Jumlah barang" total="1.120">
          <DeliveryBox01Icon className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats title="Barang masuk" total="1.422">
          <InboxDownloadIcon className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats title="Barang keluar" total="2.450">
          <InboxUploadIcon className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats title="Jenis barang" total="12">
         <PackageSearchIcon className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats title="Satuan barang" total="4">
         <LeftToRightListNumberIcon className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats title="Jumlah pengguna" total="8 akun">
         <UserSquareIcon className='text-primary dark:text-white' />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-1">
          <DynamicTable title='barang' columns={columns} data={data} />
        </div>
        {/* <ChartOne />
        <ChartTwo /> */}
        {/* <ChartThree />
        <MapOne /> */}
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default Homepage;
