import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between py-4 px-[4%] glass shadow-soft bg-white/80">
      <img className="w-[max(10%,120px)]" src={assets.logo} alt="Logo" />
      <button
        className="bg-primary text-white border border-primary px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-outfit tracking-wide hover:bg-transparent hover:text-primary transition-all duration-300"
        onClick={() => setToken("")}
      >
        Log out
      </button>
    </div>
  );
};

export default Navbar;
