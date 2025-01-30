import api from "./index.ts";

const adminService = api.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    viewCategory: builder.query({
      query: (searchTerm) => `/categories?search=${searchTerm}`,
      providesTags: ["Category"],
    }),
    viewCategoryById: builder.query({
      query: (categoryId) => `/categories/${categoryId}`,
      providesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: ({ id, categoryData }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    // Product mutation and query
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    viewProducts: builder.query({
      query: ({ searchTerm, currentPage, pageSize }) =>
        `/products?search=${searchTerm}&pageNo=${currentPage}&pageSize=${pageSize}`,
      providesTags: ["Product"],
    }),

    viewAllProduct: builder.query({
      query: () => `/products`,
      providesTags: ["Product"],
    }),
    viewProductById: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    getAllUsers: builder.query({
      query: ({ searchTerm, currentPage, pageSize }) =>
        `/users/?search=${searchTerm}&pageNo=${currentPage}&pageSize=${pageSize}`,
      providesTags: ["User"],
    }),
    getDashboardCounts: builder.query({
      query: () => `/admin/dashboard-counts`,
    }),
    //offers
    addOffer: builder.mutation({
      query: (offerData) => ({
        url: "/dealsAndOffers",
        method: "POST",
        body: offerData,
      }),
      invalidatesTags: ["Offer"],
    }),
    viewOffers: builder.query({
      query: ({ searchTerm, currentPage, pageSize }) =>
        `/dealsAndOffers?search=${searchTerm}&pageNo=${currentPage}&pageSize=${pageSize}`,
      providesTags: ["Offer"],
    }),
    deleteOffer: builder.mutation({
      query: (offerId) => ({
        url: `/dealsAndOffers/${offerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Offer"],
    }),
    updateOfferStatus : builder.mutation({
      query: ({ id, formData }) => ({
        url: `/dealsAndOffers/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Offer"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddCategoryMutation,
  useViewCategoryQuery,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useViewCategoryByIdQuery,
  useAddProductMutation,
  useViewProductsQuery,
  useViewProductByIdQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetAllUsersQuery,
  useGetDashboardCountsQuery,
  useViewAllProductQuery,
  useAddOfferMutation,
  useViewOffersQuery,
  useDeleteOfferMutation,
  useUpdateOfferStatusMutation
} = adminService;
