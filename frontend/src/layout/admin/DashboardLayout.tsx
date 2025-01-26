// DashboardLayout.tsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../constants/admin/SidebarLinks";
import { MdLogout } from "react-icons/md";
import "./style.css";
import { toast } from "react-toastify";
import { LogoutModal } from "../../Modals";

const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false);
 const [show, setShow] = useState(false);
 const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully!");
    navigate("/");
  };
  const toggleSidebar = (): void => {
    setIsCollapsed((prevState) => !prevState);
  };

  const handleOffcanvasClose = (): void => setShowOffcanvas(false);
  const handleOffcanvasShow = (): void => setShowOffcanvas(true);

  return (
    <div className="d-flex dashboard-container">
      <div className="d-none d-md-block">
        <Sidebar isCollapsed={isCollapsed} />
      </div>
      <Offcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasClose}
        className="bg-white sidebar-container"
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {sidebarLinks.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          className={({ isActive }) =>
            `d-flex align-items-center gap-2 text-decoration-none nav-link-custom p-3 fw-medium ${
              isActive ? "active-sidebar-link text-custom-primary" : ""
            }`
          }
          onClick={()=>handleOffcanvasClose()}
        >
          {link.icon}
         <span>{link.name}</span>
        </NavLink>
      ))}
      <div className="px-3 position-absolute bottom-0 mb-5">
        <button className="text-danger bg-transparent border-0 fw-medium d-flex gap-2 align-items-center" onClick={() => setShow(true)}>
          <MdLogout />
         <span>Logout</span>
        </button>
      </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="w-100">
        <Header
          toggleSidebar={toggleSidebar}
          handleOffcanvasShow={handleOffcanvasShow}
        />
        <main className="bg-custom-secondary">
          <Outlet />
        </main>
      </div>
      <LogoutModal
        show={show}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default DashboardLayout;