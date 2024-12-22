import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../../layout";
import { NotFound } from "../../components/common";
import { Dashboard } from "../../pages/admin";
import { adminRoutesConstants } from "./adminRoutesConstants";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path={adminRoutesConstants.dashboard} element={<Dashboard />} />
        {/* Add other routes dynamically */}
        <Route
          path={adminRoutesConstants.categoryManagement}
          element={<div>Category Management Page</div>} // Replace with actual component
        />
        <Route
          path={adminRoutesConstants.manageProduct}
          element={<div>Manage Product Page</div>} // Replace with actual component
        />
        <Route
          path={adminRoutesConstants.dealsAndOffers}
          element={<div>Deals & Offers Page</div>} // Replace with actual component
        />
        <Route
          path={adminRoutesConstants.orderManagement}
          element={<div>Order Management Page</div>} // Replace with actual component
        />
        <Route
          path={adminRoutesConstants.users}
          element={<div>Users Page</div>} // Replace with actual component
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
