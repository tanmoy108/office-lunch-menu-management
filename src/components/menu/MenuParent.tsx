import axios from 'axios';
import { FC, useEffect, useState } from 'react'
import MenuChild from './MenuChild';


export interface Items {
id:string,
title:string,
description:string,
type:string,
image:string,
quantity:number,
date:string
}

const MenuParent:FC = () => {
  const [menuItems, setMenuItems] = useState<Items[]>([])

    useEffect(()=>{

        const fetchingItem = async ()=>{
            const {data} = await axios.get("http://localhost:5000/api/v1/menu");
            console.log(data);
            setMenuItems(data)
        }

        fetchingItem()
    },[])

  return (
    <div className='px-5 md:px-[72px] 2xl:px-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  mb-3'>
    {
      menuItems.map((value)=>{
        return(
          <div key={value.id}>
            <MenuChild value={value} />
          </div>
        )
      })
    }
    </div>
  )
}

export default MenuParent