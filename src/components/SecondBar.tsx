import { FC } from "react";
import { Link } from "react-router-dom";

const SecondBar:FC = () => {
  return (
    <div className="meshBackground w-full h-[84px] px-5 md:px-[72px] 2xl:px-40  flex items-center justify-between">
      <div className="text-[#272D2F] font-lato text-xs sm:text-base md:text-xl font-extrabold leading-[20px]  ">
        OFFICE FOOD MANAGEMENT
      </div>
      <div className="w-full text-right sm:w-auto">
       <Link to="/addmenu">
       <button
          type="button"
          className="text-white text-[12px] md:text-[14px] font-bold uppercase font-lato rounded-full bg-[#FE724C] hover:bg-[#FF3600] leading-[150%] px-[30px] md:px-[42px] py-[7px] "
        >
          <span className="text-xs sm:text-sm md:text-[16px]">+</span> NEW DISH
        </button>
       </Link>
      </div>
    </div>
  );
};

export default SecondBar;
