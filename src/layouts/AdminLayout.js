import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // This function will close the sidebar (set state to false)
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar Overlay for Small/Medium Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onSidebarItemClick={closeSidebar} />

        {/* Main Content */}
        <main
          className={`flex-grow p-5 mt-[64px] transition-all bg-gray-100 overflow-hidden ${
            isSidebarOpen
              ? "md:ml-[250px]" // On desktop when sidebar is open
              : "ml-0" // On small/medium screens or when sidebar is closed
          } md:ml-[250px]`} // Ensure 200px margin on desktop
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
