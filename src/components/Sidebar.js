import React from "react";
import { Link, NavLink } from "react-router-dom";  //fix side bar 
import { FaTachometerAlt } from "react-icons/fa";
import Logo from "../assets/coat_of_arms.png";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 w-[200px] h-full bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 px-4 min-h-[64px] bg-white">
        <div className="w-10 h-10">
          <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h3 className="text-[#263238] text-2xl font-medium leading-[28px] tracking-[-0.06px]">IBP</h3>
      </div>

      {/* Navigation Links */}
      <ul className="p-4 space-y-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 py-2 rounded transition-colors ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 py-2 rounded transition-colors ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 py-2 rounded transition-colors ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
