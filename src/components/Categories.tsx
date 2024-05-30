import { FC } from 'react';
import categoriesData from "../lib/category.json";

type CategoryType = {
    id: number;
    value: string;
};

const Categories: FC = () => {
    // const categories: CategoryType[] = categoriesData.Categories;
  return (
    <div>
        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-10 px-5 md:px-[72px] 2xl:px-40 mt-11'>
        {categoriesData.Categories.map((item: CategoryType) => {
            return (
               
                 <div key={item.id} className='py-[13px] bg-[#FFE7A6] text-center rounded-[8px] text-[#57430C] font-lato'>
                    {item.value}
                </div>
            );
        })}
        </div>
    </div>
  );
}

export default Categories;