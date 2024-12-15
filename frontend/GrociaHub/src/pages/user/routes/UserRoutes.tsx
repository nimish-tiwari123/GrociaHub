import { userRoutesConstants } from "./userRoutesConstants";
import { Home, NewProducts, AllCategories, Cart, HotDeals } from "../index";
import { NotFound } from "../../../components/common";
import { Route, Routes } from "react-router-dom";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path={userRoutesConstants.home} element={<Home />} />
      <Route path={userRoutesConstants.newProducts} element={<NewProducts />} />
      <Route path={userRoutesConstants.hotDeals} element={<HotDeals />} />
      <Route path={userRoutesConstants.cart} element={<Cart />} />
      <Route path={userRoutesConstants.allCategories} element={<AllCategories />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;
