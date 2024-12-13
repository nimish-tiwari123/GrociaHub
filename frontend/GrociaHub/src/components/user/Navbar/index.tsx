import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { logo } from "../../../assets";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GrCart } from "react-icons/gr";
import { FiHome } from "react-icons/fi";
import { TfiAnnouncement } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { MdOutlineGridView } from "react-icons/md";
import { Button } from "../../common";
import "./style.css";

const CustomNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex flex-column flex-lg-row justify-content-between w-100">
              <div className="search-bar d-flex ms-lg-4 mb-3 mb-lg-0">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="bg-custom-secondary border-0 outline fs-7 py-2 px-3 w-100 w-lg-50"
                />
                <button className="bg-custom-primary border-0 text-light px-3">
                  <IoSearchOutline size={24} />
                </button>
              </div>
              <div className="right d-flex gap-4 align-items-center">
                <div className="cart position-relative">
                  <GrCart size={24} />
                  <span className="ms-2 fs-7 fw-medium">My Cart</span>
                  <span className="cart-badge bg-custom-primary text-light fs-7 rounded-circle position-absolute d-flex align-items-center justify-content-center p-2">
                    2
                  </span>
                </div>
                <Button
                  btnLabel="Login"
                  btnStyle="bg-custom-primary border-0 text-light px-4 py-2 fw-medium"
                />
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="secondary-navbar-nav" />
          <Navbar.Collapse id="secondary-navbar-nav">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
              <Button
                leftIcon={<MdOutlineGridView size={20} />}
                btnLabel="Browse All Categories"
                btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 mb-3 mb-lg-0"
              />

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
                  to="/hotDeals"
                  className={({ isActive }) =>
                    `text-decoration-none fw-medium ${
                      isActive ? "text-custom-primary" : "text-dark"
                    }`
                  }
                >
                  <MdOutlineLocalFireDepartment /> Hot deals
                </NavLink>
                <NavLink
                  to="/allProducts"
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
                <span className="text-custom-primary fw-bold ms-1">1233-7777</span>
                <span className="fs-7 ms-2 fw-medium">24/7 support center</span>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;