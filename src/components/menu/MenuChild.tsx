import { FC } from "react";
import { Items } from "./MenuParent";
import VegType from "../../assets/images/Veg.svg";
import NonVegType from "../../assets/images/NonVeg.svg";
// client/src/assets/images/NonVeg.svg
interface PropsItem {
  value: Items;
}

const MenuChild: FC<PropsItem> = ({ value }) => {
  return (
    <div className="h-[409px] rounded-[21px] shadow-card overflow-hidden bg-white">
      <div className="h-[211px] overflow-clip">
        <img src={value.image} alt={value.title} />
      </div>
      <div className="flex justify-between px-[15px] mt-[15px]">
        <div className="text-[#272D2F] font-lato text-base font-extrabold leading-[24px] tracking-wide">
          {value.title}
        </div>
        <div>
          <img src={value.type == "NonVeg" ? NonVegType : VegType} />
        </div>
      </div>
      <div className="px-[15px] mt-2 text-justify text-[#878686] font-lato text-[12px] font-normal leading-[15.6px] h-5">
        {value.description}
      </div>
      <div className="px-[15px] mt-2 font-lato text-right font-extrabold text-sm leading-[21px] text-[#57430C] ">
        QTY {value.quantity}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="bg-[#FF5F34] hover:bg-[#FF3600] rounded-[6px] mt-[37px] w-[90%] py-[10px] text-center text-white font-bold"
        >
          ADD TO YOUR DISH
        </button>
      </div>
    </div>
  );
};

export default MenuChild;
 