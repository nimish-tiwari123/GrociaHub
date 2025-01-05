import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import { FiPhone } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { MdOutlineGridView } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { Button } from "../../common";
import { MdAdminPanelSettings } from "react-icons/md";

import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
interface ResponsiveMenuBarProps {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}

function ResponsiveMenuBar({ show, handleClose }: ResponsiveMenuBarProps) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <div className="d-flex flex-column flex-lg-row gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-decoration-none fw-medium ${
                    isActive ? "text-custom-primary" : "text-dark"
                  }`
                }
              >
                <FiHome /> Home
              </NavLink>
              <NavLink
                to="/hot-deals"
                className={({ isActive }) =>
                  `text-decoration-none fw-medium ${
                    isActive ? "text-custom-primary" : "text-dark"
                  }`
                }
              >
                <MdOutlineLocalFireDepartment /> Hot deals
              </NavLink>
              <NavLink
                to="/new-products"
                className={({ isActive }) =>
                  `text-decoration-none fw-medium ${
                    isActive ? "text-custom-primary" : "text-dark"
                  }`
                }
              >
                <TfiAnnouncement /> New products
              </NavLink>
              {userId && (
                <Button
                  btnLabel="Login"
                  btnStyle="bg-custom-primary border-0 text-light px-4 py-2 fw-medium"
                  onClick={() => navigate("/auth/login")}
                />
              )}
            </div>
          </Nav>
          <div className="search-bar d-flex w-100 mt-4">
            <input
              type="text"
              placeholder="Search for items..."
              className="bg-custom-secondary border-0 outline fs-7 py-2 px-3 w-100"
            />
            <button className="bg-custom-primary border-0 text-light px-3">
              <IoSearchOutline size={24} />
            </button>
          </div>
          <div className="mt-4">
            <Button
              leftIcon={<MdOutlineGridView size={20} />}
              btnLabel="Browse All Categories"
              btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 mb-3 mb-lg-0"
              onClick={() => navigate("/all-categories")}
            />
          </div>
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            <FiPhone className="text-custom-primary" />
            <span className="text-custom-primary fw-bold ms-1">1233-7777</span>
            <span className="fs-7 ms-2 fw-medium">24/7 support center</span>
          </div>
          {userId && (
            <button
              className="rounded-pill bg-transparent border text-custom-primary fs-7 px-3 d-flex gap-2 align-items-center fw-medium"
              onClick={() => navigate(redirectAdminRoutes.dashboard)}
            >
              <MdAdminPanelSettings size={20} />
              Admin Panel
            </button>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ResponsiveMenuBar;
