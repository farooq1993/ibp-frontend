import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-layout-wrapper">
      <Header toggleSidebar={toggleSidebar} />
      {/* Overlay for small/medium screens */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <div className="admin-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="main-content">
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
