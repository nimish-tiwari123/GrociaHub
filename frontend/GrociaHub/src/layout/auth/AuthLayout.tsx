import "./style.css";
import { logo } from "../../assets";
import { Outlet } from "react-router-dom";


const AuthLayout = () => {
  return (
    <div className="auth-img-bg">
      <div className="h-100 auth-bg d-flex justify-content-center align-items-center">
        <div className="auth-layout-container bg-white shadow-sm rounded-4 border p-5">
          <img src={logo} alt="logo" className="d-block m-auto" />
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
