import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="header">
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>
      <h3>Integrated Bank of Projects</h3>
    </div>
  );
};

export default Header;
