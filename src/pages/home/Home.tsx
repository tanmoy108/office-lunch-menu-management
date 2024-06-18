import Cookies from "js-cookie";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { useMyContext } from "../../lib/Context.tsx";
import { getResponse } from "../../lib/checkToken.ts";
import SecondBar from "../../components/SecondBar.tsx";
import Categories from "../../components/Categories.tsx";
import LunchDate from "../../components/LunchDate.tsx";
import MenuParent from "../../components/menu/MenuParent.tsx";

const Home: FC = () => {
  const navigate = useNavigate();
  const { value, setValue } = useMyContext();
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
          setValue({
            id: respond.data.id,
            role: respond.data.role,
          });
          navigate("/");
        } else navigate("/auth/login");
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
