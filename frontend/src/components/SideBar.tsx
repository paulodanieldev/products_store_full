'use client';
import { useState } from "react";
import Link from "next/link";


export default function SideBar():JSX.Element  {
  const [menuItems, setMenuItems] = useState(
    [
        {
            label: "Dashboard",
            selected: true,
            href: "/"
        },
        {
            label: "Products",
            selected: false,
            href: "/products"
        },
        {
            label: "Product Types",
            selected: false,
            href: "/product-types"
        },
        {
            label: "Taxes",
            selected: false,
            href: "/taxes"
        },
        {
            label: "Sales",
            selected: false,
            href: "/sales"
        }
    ]);

  return (
    <div  className={`desktop-sidebar fixed z-10 w-50 h-full bg-white shadow-lg dark:bg-gray-900 dark:text-gray-200`}>
 
      <div className="flex flex-col px-6 py-8 mx-auto md:h-screen lg:py-0 my-24">
       
        <ul className="flex flex-col w-full gap-2">     
          {menuItems.map((item, index) => (
            <li 
            onClick={() => {
              setMenuItems((prev) => prev.map((prevItem, prevIndex) => {
                if (prevIndex === index) {
                  return { ...prevItem, selected: true };
                }
                return { ...prevItem, selected: false };
              }));
            }}
            key={index}>
              <Link href={item.href} className={`flex items-center rounded-lg px-2 py-2 text-gray-700 dark:text-gray-200 ${item.selected ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 '}`}>
                <span className="mx-2">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

    </div>

    </div>
  )

};

