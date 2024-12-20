import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./user/UserRoutes";
import AuthRoutes from "./auth/AuthRoutes";
import { NotFound } from "../components/common";
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
