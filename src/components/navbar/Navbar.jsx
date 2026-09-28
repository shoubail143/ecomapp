import React from "react";
import logo from "../../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { FaCaretDown } from "react-icons/fa";
import Darkmode from "./Darkmode";
const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Top rated",
    link: "/#services",
  },
  {
    id: 3,
    name: "Kids wear",
    link: "/#",
  },
  {
    id: 4,
    name: "Mens wear",
    link: "/#",
  },
  {
    id: 5,
    name: "Electronics",
    link: "/#",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];
const Navbar = ({ isDark, onToggleTheme }) => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white shadow-md duration-300 relative z-40">
      {/*upper navbar */}
      <div className="bg-primary/40 dark:bg-gray-800">
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
                className="w-[200px] sm:w-[120px] group-hover:w-[300px] px-3 py-2 transition-all duration-300 border border-gray-400 rounded-full bg-white text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white position-outline-none focus:border-1 focus:border-orange-500"
              />
              <FaSearch className="w-5 h-5 right-3 absolute top-1/2 -translate-y-2 right-3 text-gray-500 group-hover:text-primary" />
            </div>
          </div>
          <div className="relative flex items-center">
            <button
              onClick={() => alert("Ordering not avail yet")}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-300 text-white py-2 px-3 rounded-full flex items-center gap-2 group "
            >
              <span className="group-hover:block hidden transition-all duration-300">
                Order now
              </span>
              <PiShoppingCartSimpleDuotone className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            {/* Darkmode */}
            <div>
              <Darkmode isDark={isDark} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </div>
      {/*lower navbar*/}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {" "}
                {data.name}
              </a>
            </li>
          ))}
          {/* Drop down */}
          <li className="cursor-pointer group relative">
            <a
              href="/#"
              className="flex items-center gap-[2px] py-2 hover:text-primary"
            >
              Trending Products
              <span className="hover:text-primary">
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="z-[9999] absolute hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                      href={data.link}
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
