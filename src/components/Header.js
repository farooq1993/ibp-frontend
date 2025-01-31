import React, { useState, useEffect, useRef } from "react";
import { CiLogout } from "react-icons/ci";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const { logout, user } = useAuth(); // Get user & logout function
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown state
  const dropdownRef = useRef(null); // Reference for dropdown

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    // Attach event listener when dropdown is open
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-10 min-h-[64px] bg-white border-b flex items-center justify-between 
      px-5 py-2 transition-all duration-300 z-1000 md:left-[250px] md:w-[calc(100%-250px)]"
    >
      {/* Hamburger Menu for Small/Medium Devices */}
      <button
        className="text-2xl text-gray-800 md:hidden"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Header Title */}
      <h3 className="text-lg font-semibold text-gray-800">
        Integrated Bank of Projects
      </h3>

      {/* Profile Icon with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <AccountCircleIcon className="text-3xl text-gray-800 cursor-pointer" />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 z-50">
            {/* Show User Email */}
            {user && <p className="text-sm text-gray-700 px-2">{user.email}</p>}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
            >
              <CiLogout className="mr-2 text-lg" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
