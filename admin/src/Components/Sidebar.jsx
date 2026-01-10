import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-gray-200 bg-white">
      <div className="flex flex-col gap-6 pt-10 pl-[15%] text-[15px]">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-4 py-3 rounded-l-lg transition-all duration-300 ${
              isActive
                ? "bg-gray-50 border-primary border-r-4 text-primary font-medium"
                : "border-transparent text-gray-500 hover:text-primary hover:bg-gray-50"
            }`
          }
        >
          <img className="w-5 h-5 mx-2" src={assets.add_icon} alt="" />
          <p className="hidden md:block font-outfit">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-4 py-3 rounded-l-lg transition-all duration-300 ${
              isActive
                ? "bg-gray-50 border-primary border-r-4 text-primary font-medium"
                : "border-transparent text-gray-500 hover:text-primary hover:bg-gray-50"
            }`
          }
        >
          <img className="w-5 h-5 mx-2" src={assets.order_icon} alt="" />
          <p className="hidden md:block font-outfit">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-4 py-3 rounded-l-lg transition-all duration-300 ${
              isActive
                ? "bg-gray-50 border-primary border-r-4 text-primary font-medium"
                : "border-transparent text-gray-500 hover:text-primary hover:bg-gray-50"
            }`
          }
        >
          <img className="w-5 h-5 mx-2" src={assets.order_icon} alt="" />
          <p className="hidden md:block font-outfit">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
