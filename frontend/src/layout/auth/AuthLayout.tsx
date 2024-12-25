import { logo } from "../../assets";
import { Outlet } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userRoutesConstants } from "../../routes/user/userRoutesConstants";
import "./style.css";

const AuthLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-img-bg">
      <div className="h-100 auth-bg d-flex justify-content-center align-items-center">
        <IoIosArrowRoundBack size={40} className="opacity-50 position-absolute top-0 start-0 m-3 cursor-pointer" onClick={()=>navigate(userRoutesConstants.home)}/>
        <div className="auth-layout-container bg-white shadow-sm rounded-4 border p-5">
          <img src={logo} alt="logo" className="d-block m-auto" />
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
