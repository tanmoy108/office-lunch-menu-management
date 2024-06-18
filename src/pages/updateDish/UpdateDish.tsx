import { FC, useEffect, useRef, useState } from "react";
import Back from "../../assets/images/Back.png";
import { Link, useLocation } from "react-router-dom";
import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import manImage from "../../assets/images/manimage.png"
import { categories } from "../addDish/AddDish";


const urlEndpoint = "https://ik.imagekit.io/cmxx5hnyv";
const publicKey = "public_W/xQwpQ+TpXlVgEAIT/crG3OLgA=";
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const UpdateDish: FC = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramId= queryParams.get("id");
  const paramTitle= queryParams.get("title");
  const paramDescription= queryParams.get("description");
  const paramImage= queryParams.get("image");
  const paramQuantity= queryParams.get("quantity");
  const paramType= queryParams.get("type"); 
  const [fileUrl, setFileUrl] = useState<string | null>(paramImage);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [inputField, setInputField] = useState({
    title: paramTitle,
    description: paramDescription,
    quantity: paramQuantity ?? 0,
    type: paramType,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const ikUploadRefTest = useRef<HTMLInputElement>(null);
  const HandleInputFile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    ikUploadRefTest.current?.click();
  };


  const onError = (err: any) => {
    console.log("Error", err);
    alert("Error");
    setIsUploading(false);
  };

  const onSuccess = (res: any) => {
    alert("Success");
    setFileUrl(res.url);
    setIsUploading(false);
  };

  const HandleForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let inputvalue = e.target.value;
    let inputname = e.target.name;
    setInputField((old) => {
      return {
        ...old,
        [inputname]: inputvalue,
      };
    });
  };

  useEffect(() => {
    const { title, description, quantity, type } = inputField;
    if (
      title?.trim() !== "" &&
      description?.trim() !== "" &&
      !isNaN(Number(quantity)) && Number(quantity) > 0 &&
      type?.trim() !== "" &&
      fileUrl !== null &&
      !isUploading
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [inputField, fileUrl, isUploading]);

  const UpdateDB = async (e: React.MouseEvent) => {
    e.preventDefault();
    const updatedTotalField = {
      ...inputField,
      quantity: Number(inputField.quantity),
      image: fileUrl,
    };

    try {
      const {data} = await axios.patch(
        `http://localhost:5000/api/v1/menu/${paramId}`,
        updatedTotalField
      );
     if(data){
      setInputField({
        title: "",
        description: "",
        quantity: 0,
        type: "",
      })
      setFileUrl(null)
     }
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };


  return (
    <div className="px-5 md:px-10 lg:px-[72px] 2xl:px-40 addNewMeshBackground">
      <div className="w-16 py-[39px]">
        <Link to={"/"}>
          <img src={Back} alt="back-sign" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div>
            <div className="text-[#272D2F] font-lato text-[40px] font-extrabold leading-normal tracking-[-1.28px]">
              Update Dish
            </div>
          </div>
          <div className="mt-[44px] font-inter">
            <form encType="multipart/form-data">
              <div className="flex flex-col mb-[24px]">
                <label className="text-[#272D2F] text-[16px] font-medium leading-[24px]">
                  Dish Name
                </label>
                <input
                  className="w-full px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
                  type="text"
                  placeholder="Chicken Curry"
                  name="title"
                  onChange={HandleForm}
                  value={inputField.title!}
                />
              </div>
              <div className="flex flex-col mb-[24px]">
                <label className="text-[#272D2F] text-[16px] font-medium leading-[24px]">
                  Dish Description
                </label>
                <textarea
                  className="w-full px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
                  placeholder="Enter Description within 10-20 words"
                  name="description"
                  onChange={HandleForm}
                  value={inputField.description!}
                />
              </div>
              <div className="grid grid-cols-2 mb-[24px] gap-5">
                <div className="flex flex-col">
                  <label className="text-[#272D2F] text-[16px] font-medium leading-[24px]">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className=" px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
                    placeholder="5"
                    name="quantity"
                    onChange={HandleForm}
                    value={inputField.quantity!}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[#272D2F] text-[16px] font-medium leading-[24px]">
                    Categories
                  </label>
                  <select
                    className="px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
                    name="type"
                    onChange={HandleForm}
                    value={inputField.type!}
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
                  className="cursor-crosshair w-full px-[16px] py-[12px] border-[1px] rounded-[8px] border-[#E0E0E0] shadow-input text-[#828282]"
                >
                  {!fileUrl ? `+ Upload the dish thumbnail` : `File Attached`}
                </div>
              </div>
              <IKContext
                urlEndpoint={urlEndpoint}
                publicKey={publicKey}
                authenticator={authenticator}
              >
                <IKUpload
                  ref={ikUploadRefTest}
                  fileName="office-upload.png"
                  onError={onError}
                  onSuccess={onSuccess}
                  hidden
                  onUploadStart={() => setIsUploading(true)}
                />
              </IKContext>
              <button
                type="button"
                className={`bg-[#FF5F34] uppercase hover:bg-[#FF3600] rounded-[8px] text-[16px] w-full py-[10px] text-center text-white font-semibold leading-[30px] ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={UpdateDB}
                disabled={isButtonDisabled}
              >
                Update Dish
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center md:justify-end
        ">
        <img className="w-[70%] md:w-full xl:w-[80%] 2xl:w-[70%]" src={manImage} />
        </div>
      </div>
    </div>
  );
};

export default UpdateDish;
