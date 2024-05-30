import { FC, useRef } from "react";
import Back from "../../assets/images/Back.png";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Normal",
    value: "Normal",
  },
  {
    id: 2,
    name: "NonVez",
    value: "NonVez",
  },
  {
    id: 3,
    name: "Vez",
    value: "Vez",
  },
  {
    id: 4,
    name: "Beverage",
    value: "Beverage",
  },
];

const AddDish: FC = () => {
  const fileRef = useRef<HTMLInputElement>(null); // Correctly type the ref
  const HandleInputFile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    fileRef.current?.click();
  };
  const HandleUploadImage = () => {
    if (fileRef.current?.files && fileRef.current.files.length > 0) {
      console.log("hello");
      const uploadedFile = fileRef.current.files[0];
      const catchedURL = URL.createObjectURL(uploadedFile);
      console.log(catchedURL);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="px-5 md:px-[72px] 2xl:px-40">
      <div className="w-16 my-[39px]">
        <Link to={"/"}>
          <img src={Back} alt="back-sign" />
        </Link>
      </div>
      <div>
        <div className="text-[#272D2F] font-lato text-[60px] font-extrabold leading-normal tracking-[-1.28px]">
          Add New Dish
        </div>
        <div className="text-[#828282] font-lato text-[24px] font-normal leading-[36px] ">
          Elevate Your Palate with Excellence
        </div>
      </div>
      <div className="mt-[44px] font-inter">
        <form encType="multipart/form-data">
          <div className="flex flex-col mb-[24px]">
            <label className="text-[#272D2F] text-[16px] font-medium leading-[24px]">
              Dish Name
            </label>
            <input
              className="w-[550px] px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
              type="text"
              placeholder="Chicken Curry"
            />
          </div>
          <div className="flex flex-col mb-[24px]">
            <label className="text-[#272D2F] text-[16px] font-medium leading-[24px]">
              Dish Description
            </label>
            <textarea
              className="w-[550px] px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
              placeholder="Enter Description within 10-20 words"
            />
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col mb-[24px]">
              <label className="text-[#272D2F] text-[16px] font-medium leading-[24px]">
                Quantity
              </label>
              <input
                type="number"
                className="w-[265px] px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
                placeholder="5"
              />
            </div>
            <div className="flex flex-col mb-[24px]">
              <label className="text-[#272D2F] text-[16px] font-medium leading-[24px]">
                Categories
              </label>
              <select
                className="w-[265px] px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
                id="cars"
                name="cars"
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col mb-[24px]">
            <label className="text-[#272D2F] text-[16px] font-medium leading-[24px]">
              Thumbnail
            </label>
            <div
              onClick={HandleInputFile}
              className="pointer w-[550px] px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
            >
              + Upload the dish thumbnail
            </div>
            <input
              type="file"
              onChange={HandleUploadImage}
              ref={fileRef}
              hidden
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDish;
