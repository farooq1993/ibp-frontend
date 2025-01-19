import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-10 min-h-[64px] bg-white shadow-sm flex items-center justify-between 
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
    </header>
  );
};

export default Header;
