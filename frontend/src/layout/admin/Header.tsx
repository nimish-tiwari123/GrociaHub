
// Header.tsx
import { FaBars } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { MdOutlineNotificationsNone } from "react-icons/md";
import profileImg from "../../assets/profile.jpg";
import { redirectAdminRoutes } from "../../routes/admin/adminRoutesConstants";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
  handleOffcanvasShow: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, handleOffcanvasShow }) => {
  const navigate = useNavigate();
  return (
    <header className="d-flex align-items-center justify-content-between bg-white px-3 dashboard-header">
      <button
        onClick={toggleSidebar}
        className="d-none d-md-block border-0 bg-transparent text-custom-primary"
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>
      <button
        onClick={handleOffcanvasShow}
        className="d-md-none border-0 bg-transparent text-custom-primary"
        aria-label="Open Offcanvas Menu"
      >
        <FaBars />
      </button>
      <div className="d-flex align-items-center gap-3">
        <div className="position-relative cursor-pointer">
          <MdOutlineNotificationsNone size={24} onClick={()=>navigate(redirectAdminRoutes.notifications)}/>
          <div className="bg-danger rounded-circle notify-icon position-absolute top-0 end-0"></div>
        </div>
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            className="p-0 border-0 bg-transparent d-flex align-items-center text-decoration-none text-dark"
            id="dropdown-profile"
          >
            <img
              src={profileImg}
              alt="Admin Profile"
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="ms-2 text-start">
              <div className="fw-bold">Admin Name</div>
              <small className="fw-medium opacity-50">Admin Role</small>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/profile">View Profile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;