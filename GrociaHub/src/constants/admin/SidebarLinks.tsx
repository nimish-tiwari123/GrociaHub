import { FaHome, FaTags, FaBoxOpen, FaPercent, FaShoppingCart, FaUsers } from "react-icons/fa";
import { redirectAdminRoutes } from "../../routes/admin/adminRoutesConstants";

export const sidebarLinks = [
  {
    name: "Dashboard",
    path: redirectAdminRoutes.dashboard,
    icon: <FaHome />,
  },
  {
    name: "Category Management",
    path: redirectAdminRoutes.categoryManagement.viewCategory,
    icon: <FaTags />,
  },
  {
    name: "Manage Product",
    path: redirectAdminRoutes.manageProduct,
    icon: <FaBoxOpen />,
  },
  {
    name: "Deals & Offers",
    path: redirectAdminRoutes.dealsAndOffers,
    icon: <FaPercent />,
  },
  {
    name: "Order Management",
    path: redirectAdminRoutes.orderManagement,
    icon: <FaShoppingCart />,
  },
  {
    name: "Users",
    path: redirectAdminRoutes.users,
    icon: <FaUsers />,
  },
];
