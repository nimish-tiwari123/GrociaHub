import { authRoutesConstants } from "./authRoutesConstants";
import { Routes, Route } from "react-router-dom";
import { Login, SignUp } from "../index";
import { NotFound } from "../../../components/common";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={authRoutesConstants.login} element={<Login />} />
      <Route path={authRoutesConstants.signUp} element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
