import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header
      className="fixed top-0 left-0 right-0 min-h-[64px] bg-[#f5f5f5] shadow-[inset_0_-5px_5px_-5px_#223c5099] flex items-center justify-between 
      px-5 py-2 transition-all duration-300 z-1000 md:left-[200px] md:w-[calc(100%-200px)]"
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
