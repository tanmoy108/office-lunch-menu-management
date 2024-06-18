import { FC, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import person from "../../assets/images/person.svg";
import { useMyContext } from "../../lib/Context";
import axios from "axios";

interface UserType {
  name: String;
  email: String;
  designation: String;
}

const Layout: FC = () => {
  const { value, setValue } = useMyContext();
  const [userInfo, setUserInfo] = useState<UserType>({
    name: "Anonymouse",
    email: "Loading...",
    designation: "Loading...",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/user/${value.id}`
      );
      setUserInfo(data);
    };

    if (value.id) getUserInfo();
  }, [value]);

  return (
    <>
      <div className="bg-white shadow-custom w-full h-[83px] px-5 md:px-[72px] 2xl:px-40 ">
        <div className="h-full flex items-center justify-between">
          <Link to="/">
            <div className="text-[#9C791A] text-[20px] sm:text-[25px] font-extrabold leading-[37.5px]">
              IT FARM LOGO
            </div>
          </Link>
          <div className="flex">
            <img src={person} alt="person-picture" />
            <div className="ml-[11px]">
              <div className="text-[#272D2F] font-lato text-[12px] sm:text-[14px] font-bold leading-[150%]">
                {userInfo.name}
              </div>
              <div className="text-[#272D2F] font-lato text-[10px] sm:text-[12px] font-light sm:font-normal leading-[150%]">
                {userInfo.designation}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
