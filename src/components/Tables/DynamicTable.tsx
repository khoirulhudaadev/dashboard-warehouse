import { Delete01Icon, Pdf01Icon, PencilEdit01Icon } from 'hugeicons-react';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { BRAND } from '../../types/brand';
import { DynamicTableProps } from '../../types/table';
import Button from '../Button';
import Checkbox from '../Checkboxes/Checkbox';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
];

const DynamicTable: React.FC<DynamicTableProps> = ({title}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className='flex items-center justify-between mb-4'>
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Data {title}
        </h4>
        <div className='flex w-max'>
          <input
            type="text"
            placeholder="Cari nama barang"
            disabled
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
          />
          <Button text='Unduh PDF' url='/unduh-pdf' icon={<Pdf01Icon />} className='bg-red-600' />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5 flex items-center">
            <Checkbox />
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              ID
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama barang
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Jumlah
            </h5>
          </div>
          <div className="hidden p-2.5 sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Satuan
            </h5>
          </div>
          <div className="hidden p-2.5 sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Opsi
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <Checkbox />
              <p className="hidden text-black dark:text-white sm:block">
                ID-121727
              </p>
            </div>

            <div className="flex p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}K</p>
            </div>

            <div className="flex p-2.5 xl:p-5">
              <p className="text-meta-3">${brand.revenues}</p>
            </div>

            <div className="hidden p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.sales}</p>
            </div>

            <div className="hidden sm:flex">
              <Button icon={<PencilEdit01Icon />} className='bg-transparent text-yellow-500 px-0py-0' />
              <Button icon={<Delete01Icon />} className='bg-transparent text-red-600 px-0 py-0' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicTable;
