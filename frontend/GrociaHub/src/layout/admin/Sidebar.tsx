import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../constants/admin/SidebarLinks";
import { Nav } from "react-bootstrap";
import { logo } from "../../assets";
import minilogo from "../../../public/favIcon.svg";
import { MdLogout } from "react-icons/md";
import { LogoutModal } from "../../Modals";
interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleLogout = () => {
    console.log("Logged out successfully!");
    setShowModal(false);
  };
  return (
    <Nav
      className={`d-flex flex-column gap-2 sidebar-container bg-white position-relative ${
        isCollapsed ? "collapsed-sidebar" : ""
      }`}
    >
      {isCollapsed ? (
        <div className="logo-sidebar-container text-center py-4">
          `
          <img src={minilogo} alt="logo" className="logo-sidebar" />
        </div>
      ) : (
        <div className="logo-sidebar-container p-3">
          `
          <img src={logo} alt="logo" className="logo-sidebar" />
        </div>
      )}

      {sidebarLinks.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          className={({ isActive }) =>
            `d-flex align-items-center gap-2 text-decoration-none nav-link-custom p-3 fw-medium ${
              isActive ? "active-sidebar-link text-custom-primary" : ""
            }`
          }
          style={{
            whiteSpace: "nowrap", // Prevent text from wrapping
          }}
        >
          {isCollapsed ? <div>{link.icon}</div> : <>{link.icon}</>}

          {!isCollapsed && <span>{link.name}</span>}
        </NavLink>
      ))}
      <div className="px-3 position-absolute bottom-0 mb-5">
        <button
          className="text-danger bg-transparent border-0 fw-medium d-flex gap-2 align-items-center"
          onClick={handleOpenModal}
        >
          <MdLogout />
          Logout
        </button>
      </div>
      <LogoutModal
        show={showModal}
        handleClose={handleCloseModal}
        handleLogout={handleLogout}
      />
    </Nav>
  );
};

export default Sidebar;
