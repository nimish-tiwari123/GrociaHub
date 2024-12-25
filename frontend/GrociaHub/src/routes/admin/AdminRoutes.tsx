import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../../layout";
import { NotFound } from "../../components/common";
import { Dashboard, CategoryManagement, AddCategory } from "../../pages/admin";
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
          path={adminRoutesConstants.manageProduct}
          element={<div>Manage Product Page</div>}
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
