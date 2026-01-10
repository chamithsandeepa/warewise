import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20 transition-all duration-500">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10 font-outfit">
        <div className="flex flex-col gap-4">
          <Link to="/">
             <img className="mb-2 w-36 cursor-pointer hover:opacity-80 transition-opacity" src={assets.WAREWISE} alt="Logo" />
          </Link>
          <p className="w-full md:w-2/3 text-gray-500 leading-relaxed">
            We are dedicated to bringing you high-quality products with
            exceptional customer service. Our mission is to provide a seamless
            shopping experience while delivering premium items that exceed your
            expectations.
          </p>
        </div>

        <div>
           <p className="text-xl font-prata font-medium mb-5 text-primary">COMPANY</p>
           <ul className="flex flex-col gap-2 text-gray-500">
             <li>
               <Link to="/" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">Home</Link>
             </li>
             <li>
               <Link to="/about" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">About Us</Link>
             </li>
             <li>
               <Link to="/contact" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">Delivery</Link>
             </li>
             <li>
               <Link to="/contact" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">Privacy Policy</Link>
             </li>
           </ul>
        </div>

        <div>
           <p className="text-xl font-prata font-medium mb-5 text-primary">GET IN TOUCH</p>
           <ul className="flex flex-col gap-2 text-gray-500">
             <li className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">
                <span>+94 71 65 22 935</span>
             </li>
             <li className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">
                <span>warewise@gmail.com</span>
             </li>
           </ul>
        </div>
      </div>

      <div className="border-t border-gray-100">
         <p className="py-6 text-sm text-center text-gray-400 font-light">
            Copyright 2025 @ WareWise - All Right Reserved.
         </p>
      </div>
    </footer>
  );
};

export default Footer;
