import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./style.css";
const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="d-flex dashboard-container bg-custom-secondary">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="w-100">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-3"> <Outlet/></main>
      </div>
    </div>
  );
};

export default DashboardLayout;
