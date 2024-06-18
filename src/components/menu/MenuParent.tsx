import axios from "axios";
import { FC, useEffect, useState } from "react";
import MenuChild from "./MenuChild";

export interface Items {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  quantity: number;
  date: string;
}

const MenuParent: FC = () => {
  const [menuItems, setMenuItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchingItem = async () => {
      const { data } = await axios.get("http://localhost:5000/api/v1/menu");
      setMenuItems(data);
    };

    fetchingItem();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); //  YYYY-MM-DD
  };

  const groupByDate = (items: Items[]): { [date: string]: Items[] } => {
    return items.reduce((groups, item) => {
      const date = formatDate(item.date);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {} as { [date: string]: Items[] });
  };

  const groupedItems = groupByDate(menuItems);

  return (
    <div>
      {menuItems.length > 0 ? (
        Object.keys(groupedItems).reverse()
          .map((date) => (
            <div key={date} className="px-5 md:px-[72px] 2xl:px-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-3">
              <h2 className="col-span-full font-bold">Date: {date}</h2>
              {groupedItems[date].map((value) => (
                <div key={value.id}>
                  <MenuChild value={value} ModDate={date} />
                </div>
              ))}
            </div>
          ))
      ) : (
        <p>Loading menu items...</p>
      )}
    </div>
  );
};

export default MenuParent;
