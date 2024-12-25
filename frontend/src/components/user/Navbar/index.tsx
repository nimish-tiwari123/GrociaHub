import { Container, Navbar } from "react-bootstrap";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logo } from "../../../assets";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GrCart } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { MdOutlineGridView } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { Button } from "../../common";
import { SlMenu } from "react-icons/sl";
import ResponsiveMenuBar from "./ResponsiveMenuBar";
import { redirectAuthRoutesConstants } from "../../../routes/auth/authRoutesConstants";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { MdAdminPanelSettings } from "react-icons/md";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
import "./style.css";

const CustomNavbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar expand="lg" className="sticky-top bg-white border-bottom w-100">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" className="logo-nav" />
          </Navbar.Brand>
          <div className="d-flex gap-3 d-lg-none">
            <div className="cart position-relative">
              <GrCart size={20} />
              <span className="cart-badge bg-custom-primary text-light fs-7 rounded-circle position-absolute d-flex align-items-center justify-content-center p-2">
                2
              </span>
            </div>
            <button className="bg-transparent border-0 " onClick={handleShow}>
              <SlMenu size={20} />
            </button>
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex flex-column flex-lg-row justify-content-between w-100">
              <div className="search-bar d-flex ms-lg-4 mb-3 mb-lg-0 w-50">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="bg-custom-secondary border-0 input-focus fs-7 py-2 px-3 w-100 w-lg-50 rounded-start"
                />
                <button className="bg-custom-primary border-0 text-light px-3 rounded-end">
                  <IoSearchOutline size={24} />
                </button>
              </div>
              <button
                className="rounded-pill bg-transparent border text-custom-primary fs-7 px-3 d-flex gap-2 align-items-center fw-medium"
                onClick={() => navigate(redirectAdminRoutes.dashboard)}
              >
                <MdAdminPanelSettings size={20} />
                Admin Panel
              </button>
              <div className="right d-flex gap-4 align-items-center">
                <NavLink
                  to={userRoutesConstants.cart}
                  className="text-decoration-none text-dark"
                >
                  <div className="cart position-relative">
                    <GrCart size={24} />
                    <span className="ms-2 fs-7 fw-medium">My Cart</span>
                    <span className="cart-badge bg-custom-primary fw-bold text-light rounded-circle position-absolute d-flex align-items-center justify-content-center ">
                      2
                    </span>
                  </div>
                </NavLink>
                <NavLink
                  to={redirectAuthRoutesConstants.login}
                  className="text-decoration-none"
                >
                  <Button
                    btnLabel="Login"
                    btnStyle="bg-custom-primary border-0 text-light px-4 py-2 fw-medium rounded"
                  />
                </NavLink>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar expand="lg" className="py-lg-3 py-0 border-bottom w-100">
        <Container>
          <Navbar.Collapse id="secondary-navbar-nav">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
              <NavLink
                to={userRoutesConstants.allCategories}
                className="text-decoration-none"
              >
                <Button
                  leftIcon={<MdOutlineGridView size={20} />}
                  btnLabel="Browse All Categories"
                  btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 mb-3 mb-lg-0 rounded"
                />
              </NavLink>

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
                  to={userRoutesConstants.hotDeals}
                  className={({ isActive }) =>
                    `text-decoration-none fw-medium ${
                      isActive ? "text-custom-primary" : "text-dark"
                    }`
                  }
                >
                  <MdOutlineLocalFireDepartment size={20} /> Hot deals
                </NavLink>
                <NavLink
                  to={userRoutesConstants.newProducts}
                  className={({ isActive }) =>
                    `text-decoration-none fw-medium ${
                      isActive ? "text-custom-primary" : "text-dark"
                    }`
                  }
                >
                  <TfiAnnouncement /> New products
                </NavLink>
              </div>

              <div className="d-flex align-items-center mt-3 mt-lg-0">
                <FiPhone className="text-custom-primary" />
                <span className="text-custom-primary fw-bold ms-1">
                  1233-7777
                </span>
                <span className="fs-7 ms-2 fw-medium">24/7 support center</span>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ResponsiveMenuBar
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

export default CustomNavbar;
