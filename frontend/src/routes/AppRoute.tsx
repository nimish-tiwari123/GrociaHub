import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./user/UserRoutes";
import AuthRoutes from "./auth/AuthRoutes";
import { NotFound } from "../components/common";
import AdminRoutes from "./admin/AdminRoutes";
import ScrollToTop from "./ScrolledToTop";
const AppRoute = () => {
  return (
    <BrowserRouter>
        <ScrollToTop/>

      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
