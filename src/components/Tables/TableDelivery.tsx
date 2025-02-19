import { Table } from "flowbite-react";
import { Delete01Icon, Pdf01Icon, RestoreBinIcon } from 'hugeicons-react';
import React, { useState } from 'react';
import { DynamicTableProps } from '../../types/table';
import Button from '../Button';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatDate } from "@hooks/generateDate";

interface PDFInterface {
  title: string;
  data: any;
}

const TableDelivery: React.FC<DynamicTableProps> = ({columns, data, title, onDelete, onRestore}) => {

  const [search, setSearch] = useState<string>('')
  
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
    d.management_out,
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
      
      <div className='flex items-center justify-between mb-4'>
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Data {title}
        </h4>
        <div className='flex w-max'>
          <Button text='Unduh PDF' onClick={() => generatePDF({title: 'Data barang keluar', data})} icon={<Pdf01Icon />} className='bg-red-600' />
        </div>
      </div>

      <input
        type="text"
        name="search"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        placeholder="Cari nama barang keluar"
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
              <Table.Row key={index} className={`bg-white dark:border-gray-700 dark:bg-gray-800`}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className={`w-[40%]`}>{d?.item_name}</Table.Cell>
                <Table.Cell className={`w-[40%]`}>{d?.management_in}</Table.Cell>
                <Table.Cell className={`w-[40%]`}>{d?.management_out}</Table.Cell>
                <Table.Cell>{d?.amount}</Table.Cell>
                <Table.Cell className='flex items-center gap-4'>
                  <Delete01Icon aria-label="Delete" onClick={() => onDelete?.(d.delivery_id ?? 0)} className='text-red-500' />
                  <RestoreBinIcon aria-label="restore" onClick={() => onRestore?.(d)} className='text-yellow-500' />              
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

export default TableDelivery;
