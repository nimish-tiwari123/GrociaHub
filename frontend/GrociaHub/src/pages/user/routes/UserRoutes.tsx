import { userRoutesConstants } from "./userRoutesConstants";
import { Home, AllProducts } from "../index";
import { Routes, Route } from "react-router-dom";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path={userRoutesConstants.home} element={<Home />} />
      <Route path={userRoutesConstants.home} element={<AllProducts />} />
    </Routes>
  );
};

export default UserRoutes;
