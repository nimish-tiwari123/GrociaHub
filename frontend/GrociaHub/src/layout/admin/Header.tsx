import { FaBars } from "react-icons/fa";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="d-flex align-items-center justify-content-between bg-white px-3 dashboard-header">
      <button
        onClick={toggleSidebar}
        className="border-0 bg-transparent text-custom-primary"
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>
    </header>
  );
};

export default Header;
