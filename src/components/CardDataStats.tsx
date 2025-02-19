import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string | number;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  onclick: () => void
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  levelUp,
  levelDown,
  children,
  onclick
}) => {
  return (
    <div onClick={onclick} className="cursor-pointer active:scale-[0.99] hover:brightness-[96%] hover:border-slate-300 duration-200 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && 'text-meta-3'
          } ${levelDown && 'text-meta-5'} `}
        >
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
