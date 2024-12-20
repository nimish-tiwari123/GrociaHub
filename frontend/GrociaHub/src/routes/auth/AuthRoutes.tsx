import { authRoutesConstants } from "./authRoutesConstants";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  SignUp,
  ForgotPassword,
  CreatePassword,
} from "../../pages/auth";
import AuthLayout from "../../layout/auth/AuthLayout";
import { NotFound } from "../../components/common";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={authRoutesConstants.login} element={<Login />} />
        <Route path={authRoutesConstants.signUp} element={<SignUp />} />
        <Route path={authRoutesConstants.forgotPassword} element={<ForgotPassword />} />
        <Route path={authRoutesConstants.createPassword} element={<CreatePassword />} />

      </Route>
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AuthRoutes;
