import React from "react";
import { sideDrawerData } from "../data/data";
import { Link } from "react-router-dom";

function SideDrawer({ sidebar }) {
  console.log(sideDrawerData);
  return (
    <>
      <div
        className={`${
          sidebar ? "-translate-x-full" : null
        } lg:w-1/6 md:w-1/5 sm:w-1/5 text-neutral h-full absolute bg-slate-300 transition duration-500 ease-in-out flex justify-center items-center`}
      >
        <div>
          <ul className="flex flex-col items-center justify-center w-full h-full">
            {sideDrawerData.map((items, index) => (
              <li key={index} className="w-full h-10">
                <Link to={items.path}>
                  <p className="p-3 inline">{items.icon}</p>
                  <p className="inline">{items.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideDrawer;
