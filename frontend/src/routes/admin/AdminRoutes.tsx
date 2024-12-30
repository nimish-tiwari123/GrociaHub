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
  DealsOffers,
  CreateOffer,
  Notifications,
  UserManagement,
  OrderManagement,
  ViewOrder
} from "../../pages/admin";
import { adminRoutesConstants } from "./adminRoutesConstants";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path={adminRoutesConstants.dashboard} element={<Dashboard />} />
        {/* Category Management */}
        <Route
          path={adminRoutesConstants.categoryManagement.view}
          element={<CategoryManagement />}
        />
        <Route
          path={adminRoutesConstants.categoryManagement.add}
          element={<AddCategory />}
        />
        <Route
          path={adminRoutesConstants.categoryManagement.edit}
          element={<EditCategory />}
        />
        <Route
          path={adminRoutesConstants.productManagement.view}
          element={<ProductManagement />}
        />
        <Route
          path={adminRoutesConstants.productManagement.add}
          element={<AddProduct />}
        />
        <Route
          path={adminRoutesConstants.productManagement.edit}
          element={<EditProduct />}
        />
        <Route
          path={adminRoutesConstants.dealsAndOffers.view}
          element={<DealsOffers />}
        />
          <Route
          path={adminRoutesConstants.dealsAndOffers.create}
          element={<CreateOffer />}
        />
        <Route
          path={adminRoutesConstants.orderManagement.viewAll}
          element={<OrderManagement/>}
        />
         <Route
          path={adminRoutesConstants.orderManagement.view}
          element={<ViewOrder/>}
        />
        <Route
          path={adminRoutesConstants.users}
          element={<UserManagement/>}
        />
          <Route
          path={adminRoutesConstants.notifications}
          element={<Notifications />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
