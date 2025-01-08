import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content */}
        <main
          className={`flex-grow p-5 mt-[64px] transition-all ${
            isSidebarOpen
              ? "md:ml-[200px]" // On desktop when sidebar is open
              : "ml-0" // On small/medium screens or when sidebar is closed
          } md:ml-[200px]`} // Ensure 200px margin on desktop
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
