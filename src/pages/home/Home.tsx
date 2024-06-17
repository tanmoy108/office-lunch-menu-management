import SecondBar from "../../components/SecondBar.tsx";
import { FC, useEffect, useState } from "react";
import Categories from "../../components/Categories.tsx";
import LunchDate from "../../components/LunchDate.tsx";
import MenuParent from "../../components/menu/MenuParent.tsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { getResponse } from "../../lib/checkToken.ts";

const Home: FC = () => {
  const navigate = useNavigate();
  const [userId,setUserId] = useState<String>("Anonymous");
  const [userRole,setUserRole] = useState<String>("user");
  useEffect(() => {
    console.log("home");
    const accessToken = Cookies.get("access_token");

    const tokensend = async (accessToken: String) => {
      const res = await getResponse(accessToken);
      return res;
    };

    const VerifyToken = async (accessToken: String | null) => {
      if (accessToken) {
        const respond = await tokensend(accessToken);
        if (respond.result) {
          setUserId(respond.data.id);
          setUserRole(respond.data.role);
          navigate("/");}
        else navigate("/auth/login");
      } else {
        console.log("Access Token not found");
        navigate("/auth/login");
      }
    };

    VerifyToken(accessToken!);
  }, []);
  return (
    <>
      <SecondBar />
      <Categories />
      <LunchDate />
      <MenuParent />
    </>
  );
};

export default Home;
