export const adminRoutesConstants = {
  dashboard: "/dashboard",
  categoryManagement: {
    view: "/category-management",
    add: "/category-management/add",
    edit: "/category-management/edit/:id",
  },
  productManagement: {
    view: "/product-management",
    add: "/product-management/add",
    edit: "/product-management/edit/:id",
  },
  dealsAndOffers: {
    view: "/deals-and-offers",
    create: "/deals-and-offers/create",
  },
  orderManagement: {
    viewAll: "/order-management",
    view: "/order-management/view/:id", 
  },
  users: "/users",
  notifications: "/notifications",
};

export const redirectAdminRoutes = {
  dashboard: "/admin/dashboard",
  categoryManagement: {
    view: "/admin/category-management",
    add: "/admin/category-management/add",
    edit: "/admin/category-management/edit/", 
  },
  productManagement: {
    view: "/admin/product-management",
    add: "/admin/product-management/add",
    edit: "/admin/product-management/edit/", 
  },
  dealsAndOffers: {
    view: "/admin/deals-and-offers",
    create: "/admin/deals-and-offers/create",
  },
  orderManagement: {
    viewAll: "/admin/order-management",
    view: "/admin/order-management/view/", 
  },
  users: "/admin/users",
  notifications: "/admin/notifications",
};
