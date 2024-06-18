import { FC } from "react";

const d = new Date();
const day = String(d.getDate()).padStart(2, "0");
const month = String(d.getMonth() + 1).padStart(2, "0");
const year = d.getFullYear();
export const currentDate = `${year}-${month}-${day}`;

const LunchDate: FC = () => {
  return (
    <div className="px-5 md:px-[72px] 2xl:px-40 my-7 font-lato text-[16px] font-medium leading-[24px]">
      {`Today Lunch Date: ${year}-${month}-${day}`}
    </div>
  );
};

export default LunchDate;
