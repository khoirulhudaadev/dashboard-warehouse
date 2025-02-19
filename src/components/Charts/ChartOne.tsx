import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ChartType } from 'types/component';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#F56565', '#48BB78'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#F56565', '#48BB78'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'
    ],
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 500,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: any;
  }[];
}

const ChartOne = ({ dataIn, dataOut }: ChartType) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  // Group and sum 'amount' by month-year for 'dataIn'
  const groupedInByMonth = dataIn?.reduce((result: any, item: any) => {
    const date = new Date(item.created_at);
    const monthYear: any = `${date.getMonth() + 1}-${date.getFullYear()}`;
    
    if (!result[monthYear]) {
      result[monthYear] = 0; // Set initial value to 0 if month not yet encountered
    }

    result[monthYear] += item.amount; // Sum amounts for the same month-year
    
    return result;
  }, {});

  // Ensure that totalAmountsIn matches months from Jan to Dec
  const totalAmountsIn = months.map((_: any, index: number) => {
    const monthIndex = index + 1; // Month index (1-12)
    const matchingMonth = Object.keys(groupedInByMonth).find((key) =>
      key.startsWith(`${monthIndex}`) // Match by month number
    );
    return matchingMonth ? groupedInByMonth[matchingMonth] : 0; // Use 0 if no data for this month
  });

  // Group and sum 'amount' by month-year for 'dataOut'
  const groupedOutByMonth = dataOut?.reduce((result: any, item: any) => {
    const date = new Date(item.created_at);
    const monthYear: any = `${date.getMonth() + 1}-${date.getFullYear()}`;
    
    if (!result[monthYear]) {
      result[monthYear] = 0; // Set initial value to 0 if month not yet encountered
    }

    result[monthYear] += item.amount; // Sum amounts for the same month-year
    
    return result;
  }, {});

  // Ensure that totalAmountsOut matches months from Jan to Dec
  const totalAmountsOut = months.map((_: any, index: number) => {
    const monthIndex = index + 1; // Month index (1-12)
    const matchingMonth = Object.keys(groupedOutByMonth).find((key) =>
      key.startsWith(`${monthIndex}`) // Match by month number
    );
    return matchingMonth ? groupedOutByMonth[matchingMonth] : 0; // Use 0 if no data for this month
  });

  const [state] = useState<ChartOneState>({
    series: [
      {
        name: 'Barang masuk',
        data: totalAmountsIn,
      },
      {
        name: 'Barang keluar',
        data: totalAmountsOut,
      },
    ],
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#F56565]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#F56565]">Barang masuk</p>
              <p className="text-sm font-medium">Jan - Des `{new Date().getFullYear()}`</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#48BB78]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#48BB78]">Barang keluar</p>
              <p className="text-sm font-medium">Jan - Des `{new Date().getFullYear()}`</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
