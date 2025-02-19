import ModalComponent from '@components/Modal';
import { formatDate } from '@hooks/generateDate';
import useUpdateAmountItemFormik from '@hooks/item/useupdateAmountItemFormik';
import { RootState } from '@stores/index';
import { Table } from "flowbite-react";
import { Add01Icon, Delete01Icon, InboxUploadIcon, Loading03Icon, Pdf01Icon, PencilEdit01Icon } from 'hugeicons-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemType } from 'types/item';
import { DynamicTableProps } from '../../types/table';
import Button from '../Button';

interface PDFInterface {
  title: string;
  data: any;
}
const TableItem: React.FC<DynamicTableProps> = ({columns, data, title, onDelete, onUpdate}) => {

  const [search, setSearch] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [modalOut, setModalOut] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})
 
  const detailUser = useSelector((state: RootState) => state.auth.auth)
  const detailItem = useSelector((state: RootState) => state.item.detailItem)

  const handleOut = (id: string, d: ItemType) => {
    setDetail(d)
    setModalOut(true) 
    setId(String(id))
  }

  const useUpdateAmount = useUpdateAmountItemFormik({
     onError: () => {
       setLoading(false); 
       setModalOut(false)
     },
     onResponse: () => {
       setLoading(false); 
       setModalOut(false)
     },
     id,
     item_id: detail?.item_id, 
     item_name: detail?.item_name, 
     management_in: detail?.users?.username,
     management_out: detailUser?.username ?? '',
     type_name: detail?.types?.type_name,
     type_id: detail?.type_id,
     unit_name: detail?.units?.unit_name,
     unit_id: detail?.unit_id,
     image: detail?.image,
     image_public_id: detail?.image_public_id,
 });
 
  const filteredData = search !== '' 
  ? data?.filter((d: any) => d.item_name.toLowerCase().includes(search.toLowerCase())) 
  : data;

  const generatePDF = ({ title, data }: PDFInterface) => {
    const doc: any = new jsPDF();

    // Menambahkan judul
    doc.text(title + " " + "("+ new Date().getFullYear() +")", 14, 16);
    
    const mappedData = data.map((d: any, index: number) => [
      index + 1,
      d.item_id,
      d.item_name,
      d.amount,
      d.users?.username,
      formatDate(d.created_at) 
    ]);
    
    // Menambahkan tabel
    let y = 30;
    doc.autoTable({
      startY: y,
      head: [['No', 'ID-barang', 'Nama barang', 'Jumlah barang', 'Pengelola', 'Tgl dibuat']],
      body: mappedData,
    });
    
    // Simpan PDF
    doc.save('data-gudang.pdf');
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10">
      
      {
        modalOut ? (
          <ModalComponent title='Keluarkan barang' onClose={() => {setModalOut(false), useUpdateAmount.resetForm()}} openModal={modalOut}>
            <div className='w-full h-max p-6'> 
              <form onSubmit={useUpdateAmount.handleSubmit}>
                <div className='relative'>
                  <label className="mb-3 block text-black dark:text-white">
                      Stok barang (saat ini)
                  </label>
                  <input
                      type="number"
                      name='amount'
                      disabled
                      value={detailItem?.amount}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-slate-100 py-3 px-5 text-slate-300 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className='relative mt-6'>
                  <label className="mb-3 block text-black dark:text-white">
                      Jumlah barang
                  </label>
                  <input
                      type="number"
                      name='amount'
                      value={useUpdateAmount.values.amount}
                      onBlur={useUpdateAmount.handleBlur}
                      onChange={useUpdateAmount.handleChange}
                      placeholder="Masukan nama satuan"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                    type="submit" // Make sure it is "submit" to trigger form submission
                    className={`w-max mt-6 p-3 flex justify-center items-center rounded-lg border ${
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
              </form>
            </div>
          </ModalComponent>
        ):
          null
      }
      
      <div className='flex items-center justify-between mb-4'>
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Data {title}
        </h4>
        <div className='flex w-max'>
          <Button text='Tambah barang' url='/tambah-barang' icon={<Add01Icon />} className='bg-blue-600' />
          <Button text='Unduh PDF' onClick={() => generatePDF({title: 'Data barang masuk', data})} icon={<Pdf01Icon />} className='bg-red-600' />
        </div>
      </div>

      <input
        type="text"
        name="search"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        placeholder="Cari nama barang"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
      />

      <Table className='mt-6'>
        <Table.Head>
          {columns?.map((col: string, index: number) => (
            <Table.HeadCell key={index} className='!py-5'>{col}</Table.HeadCell>
          ))}
        </Table.Head>

        <Table.Body className="divide-y">
          {filteredData && filteredData?.length > 0 ? 
            filteredData?.map((d:any, index: number) => (
              <Table.Row key={index} className={`${d?.amount === 0 ? 'bg-red-100' : 'bg-white'} dark:border-gray-700 dark:bg-gray-800`}>
               <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className={`w-[25%] ${d?.amount === 0 ? 'text-red-500' : ''}`}>{d?.item_name}</Table.Cell>
                <Table.Cell>{d?.amount} ({d?.units?.unit_name})</Table.Cell>
                <Table.Cell>{d?.types?.type_name}</Table.Cell>
                <Table.Cell>{d?.users?.username}</Table.Cell>
                <Table.Cell className='flex items-center gap-4'>
                  {
                    d?.amount !== 0 && (
                      <InboxUploadIcon onClick={() => handleOut(d?.item_id, d)} className='text-green-500' />
                    )
                  }
                  <Delete01Icon onClick={() => onDelete?.(d.item_id ?? 0)} className='text-red-500' />
                  {
                    d?.amount !== 0 && (
                      <PencilEdit01Icon onClick={() => onUpdate?.(d?.item_id, d)} className='text-yellow-500' />              
                    )
                  }
                  </Table.Cell>
              </Table.Row>
            )):
              null
        }
        </Table.Body>
      </Table>

      {filteredData && filteredData?.length === 0 && (
        <div className='w-full pt-6'>
          <p>Data tidak tersedia!</p>
        </div>
      )}

    </div>
  );
};

export default TableItem;
