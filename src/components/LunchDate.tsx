import { FC } from 'react';

const LunchDate: FC = () => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return (
    <div className='px-5 md:px-[72px] 2xl:px-40 my-7 font-lato text-[16px] font-medium leading-[24px]' >
      {`Lunch Date: ${year}-${month}-${day}`}
    </div>
  );
};

export default LunchDate;