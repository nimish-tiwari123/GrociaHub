import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../../layout";
import { NotFound } from "../../components/common";
import {
  Dashboard,
  CategoryManagement,
  AddCategory,
  EditCategory,
  ProductManagement,
  AddProduct,
  EditProduct,
} from "../../pages/admin";
import { adminRoutesConstants } from "./adminRoutesConstants";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path={adminRoutesConstants.dashboard} element={<Dashboard />} />
        {/* Category Management */}
        <Route
          path={adminRoutesConstants.categoryManagement.viewCategory}
          element={<CategoryManagement />}
        />
        <Route
          path={adminRoutesConstants.categoryManagement.addCategory}
          element={<AddCategory />}
        />
        <Route
          path={adminRoutesConstants.categoryManagement.editCategory}
          element={<EditCategory />}
        />
        <Route
          path={adminRoutesConstants.manageProduct.viewProduct}
          element={<ProductManagement />}
        />
        <Route
          path={adminRoutesConstants.manageProduct.addProduct}
          element={<AddProduct />}
        />
        <Route
          path={adminRoutesConstants.manageProduct.editProduct}
          element={<EditProduct />}
        />
        <Route
          path={adminRoutesConstants.dealsAndOffers}
          element={<div>Deals & Offers Page</div>}
        />
        <Route
          path={adminRoutesConstants.orderManagement}
          element={<div>Order Management Page</div>}
        />
        <Route
          path={adminRoutesConstants.users}
          element={<div>Users Page</div>}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
