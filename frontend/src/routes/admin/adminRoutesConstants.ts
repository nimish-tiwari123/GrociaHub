export const adminRoutesConstants = {
  dashboard: "/dashboard",
  categoryManagement: {
    viewCategory: "/category-management",
    addCategory: "/category-management/add-category",
    editCategory: "/category-management/edit-category",
  },
  manageProduct: {
    viewProduct: "/manage-product",
    addProduct: "/manage-product/add-product",
    editProduct: "/manage-product/edit-product",

  },
  dealsAndOffers: {
    viewDeals: "/deals-offers",
    createOffer:"/deals-offers/create-offer"
  },
  orderManagement:{
   viewAllOrders: "/order-management",
   viewOrder:"/order-management/view-order"
  },
  users: "/users",
  notifications:"/notifications"
};

export const redirectAdminRoutes = {
  dashboard: "/admin/dashboard",
  categoryManagement: {
    viewCategory: "/admin/category-management",
    addCategory: "/admin/category-management/add-category",
    editCategory: "/admin/category-management/edit-category",
  },
  manageProduct: {
    viewProduct: "/admin/manage-product",
    addProduct: "/admin/manage-product/add-product",
    editProduct: "/admin/manage-product/edit-product",

  },
  dealsAndOffers: {
    viewDeals: "/admin/deals-offers",
    createOffer:"/admin/deals-offers/create-offer"

  },
  orderManagement:{
    viewAllOrders: "/admin/order-management",
   viewOrder:"/admin/order-management/view-order"

   },
  users: "/admin/users",
  notifications:"/admin/notifications"

};
