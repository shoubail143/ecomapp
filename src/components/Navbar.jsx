import React from "react";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import Darkmode from "./Darkmode";
const Navbar = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white shadow-md duration-300 relative z-40">
      {/*upper navbar */}
      <div className="bg-primary/40">
        <div className="flex container justify-between items-center">
          <div className="w-15 h-15">
            <a fer="#" className="flex gap-2 font-bold text-2xl sm:text-3xl">
              <img src={logo} alt="" />
              NexaStore
            </a>
          </div>
          {/*search bar*/}
          <br />
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                placeholder="Search"
                className="w-[200px] sm:w-[120px] group-hover:w-[300px] px-3 py-2 transition-all duration-300 border border-gray-400 rounded-full bg-white position-outline-none focus:border-1 focus:border-orange-500 text-gray-600 "
              />
              <FaSearch className="w-5 h-5 right-3 absolute top-1/2 -translate-y-2 right-3 text-gray-500 group-hover:text-primary" />
            </div>
          </div>
          <div className="relative flex items-center group">
            <button
              onClick={() => alert("Ordering not avail yet")}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-300 text-white py-2 px-3 rounded-full flex items-center gap-2 "
            >
              <span className="group-hover:block hidden transition-all duration-300">
                Order now
              </span>
              <PiShoppingCartSimpleDuotone className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            <Darkmode />
          </div>
        </div>
      </div>
      {/*lower navbar*/}
      <div></div>
    </div>
  );
};

export default Navbar;
