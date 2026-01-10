import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 uppercase text-sm tracking-widest hover:text-black transition-colors ${
      isActive ? "text-black font-semibold" : "text-gray-500"
    }`;

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-soft py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Link to="/">
          <img src={assets.WAREWISE} className="w-36 transition-transform hover:scale-105" alt="Logo" />
        </Link>
        
        <ul className="hidden sm:flex gap-8">
          <NavLink to="/" className={navLinkClass}>
            <p>Home</p>
            <span className="w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink to="/collection" className={navLinkClass}>
            <p>Collection</p>
            <span className="w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            <p>About</p>
            <span className="w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            <p>Contact</p>
            <span className="w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowSearch(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <img src={assets.search_icon} className="w-5" alt="Search" />
          </button>

          <div className="group relative">
            <button 
              onClick={() => (token ? null : navigate("/login"))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={assets.profile_icon} className="w-5" alt="Profile" />
            </button>
            {/* Drop Down */}
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-40 p-4 bg-white shadow-xl rounded-lg border border-gray-100">
                  <p className="cursor-pointer hover:text-accent transition-colors font-medium">My Profile</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-accent transition-colors font-medium"
                  >
                    Orders
                  </p>
                  <p onClick={logout} className="cursor-pointer hover:text-red-500 transition-colors font-medium">
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <img src={assets.cart_icon} className="w-5" alt="Cart" />
            <span className="absolute top-1 right-0 w-4 h-4 text-[10px] bg-black text-white flex items-center justify-center rounded-full font-bold">
              {getCartCount()}
            </span>
          </Link>
          
          <button 
            onClick={() => setVisible(true)} 
            className="sm:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <img src={assets.menu_icon} className="w-5" alt="Menu" />
          </button>
        </div>

        {/* Sidebar for small screens */}
        <div
          className={`fixed top-0 right-0 h-full bg-white z-[60] transition-all duration-300 shadow-2xl ${
            visible ? "w-3/4 max-w-sm" : "w-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col h-full bg-white">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-6 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <img className="h-4 rotate-180 opacity-60" src={assets.dropdown_icon} alt="Back" />
              <p className="font-medium text-gray-600">Back</p>
            </div>
            <nav className="flex flex-col p-4 gap-2">
              <NavLink onClick={() => setVisible(false)} className="py-3 px-4 hover:bg-gray-50 rounded-lg text-lg font-medium text-gray-700 hover:text-black transition-all" to="/">
                HOME
              </NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-3 px-4 hover:bg-gray-50 rounded-lg text-lg font-medium text-gray-700 hover:text-black transition-all" to="/collection">
                COLLECTION
              </NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-3 px-4 hover:bg-gray-50 rounded-lg text-lg font-medium text-gray-700 hover:text-black transition-all" to="/about">
                ABOUT
              </NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-3 px-4 hover:bg-gray-50 rounded-lg text-lg font-medium text-gray-700 hover:text-black transition-all" to="/contact">
                CONTACT
              </NavLink>
            </nav>
          </div>
        </div>
        {/* Overlay when menu is open */}
        {visible && (
          <div 
            className="fixed inset-0 bg-black/20 z-[55] sm:hidden backdrop-blur-sm"
            onClick={() => setVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
