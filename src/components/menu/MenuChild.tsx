import { FC } from "react";
import { Items } from "./MenuParent";
import VegType from "../../assets/images/Veg.svg";
import NonVegType from "../../assets/images/NonVeg.svg";
import { FaRegEdit } from "react-icons/fa";
import { currentDate } from "../LunchDate";
import { useNavigate } from "react-router";
// client/src/assets/images/NonVeg.svg
interface PropsItem {
  value: Items;
  ModDate: String;
}

const MenuChild: FC<PropsItem> = ({ value, ModDate }) => {
  console.log(value);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(
      `/updatemenu?id=${value.id}&title=${value.title}&description=${value.description}&image=${value.image}&quantity=${value.quantity}&type=${value.type}`
    );
  };

  return (
    <div className="h-[409px] rounded-[21px] shadow-card overflow-hidden bg-white relative">
      {currentDate == ModDate ? (
        <div className="absolute w-full text-right py-3 px-8 z-10">
          <button onClick={handleEdit}>
            <FaRegEdit className="w-auto h-5 text-[#fff]" />
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <div className="relative h-[211px] overflow-clip">
        <img
          src={value.image}
          alt={value.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
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
