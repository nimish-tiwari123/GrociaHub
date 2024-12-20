import { userRoutesConstants } from "./userRoutesConstants";
import {
  Home,
  NewProducts,
  AllCategories,
  Cart,
  HotDeals,
} from "../../pages/user";
import { HomeLayout } from "../../layout";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../components/common";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path={userRoutesConstants.home} element={<Home />} />
        <Route
          path={userRoutesConstants.newProducts}
          element={<NewProducts />}
        />
        <Route path={userRoutesConstants.hotDeals} element={<HotDeals />} />
        <Route path={userRoutesConstants.cart} element={<Cart />} />
        <Route
          path={userRoutesConstants.allCategories}
          element={<AllCategories />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default UserRoutes;
