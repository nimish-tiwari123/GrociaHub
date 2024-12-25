import { Navbar, Footer } from "../../../components/user";
import { Outlet } from "react-router-dom";
const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
