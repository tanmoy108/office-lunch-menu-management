import SecondBar from "../../components/SecondBar.tsx";
import { FC } from "react";
import Categories from "../../components/Categories.tsx"
import LunchDate from "../../components/LunchDate.tsx";
import MenuParent from "../../components/menu/MenuParent.tsx";

const Home:FC = () => {
    return (
      <>
      <SecondBar/>
      <Categories/>
      <LunchDate/>
      <MenuParent/>
      </>
    )
  };
  
  export default Home;