// Header.tsx
import { FaBars } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { redirectAdminRoutes } from "../../routes/admin/adminRoutesConstants";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useViewUserByIdQuery } from "../../api/userService";
import { Loader } from "../../components/common";
interface HeaderProps {
  toggleSidebar: () => void;
  handleOffcanvasShow: () => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  handleOffcanvasShow,
}) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { data: userData, isLoading } = useViewUserByIdQuery(userId);

  return (
    <header className="d-flex align-items-center justify-content-between bg-white px-3 dashboard-header">
      {isLoading && <Loader />}
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
          <MdOutlineNotificationsNone
            size={24}
            onClick={() => navigate(redirectAdminRoutes.notifications)}
          />
          <div className="bg-danger rounded-circle notify-icon position-absolute top-0 end-0"></div>
        </div>
        {userId && (
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="d-flex align-items-center border-0 rounded-circle bg-transparent"
            >
              {userData?.user?.profileImage ? (
                    <img
                      src={userData.user.profileImage}
                      className="border rounded-circle object-fit-cover"
                      style={{ width: "30px", height: "30px" }}
                    />
                  ) : (
                    <FiUser size={50} />
                  )}
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item
                onClick={() => navigate("/profile")}
                className="fs-7 "
              >
                View Profile
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </header>
  );
};

export default Header;
