import api from "./index.ts";

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    viewUserCategory: builder.query({
      query: () => `/categories`,
    }),
    viewUserProducts: builder.query({
      query: ({searchTerm="", currentPage="", totalPages=""}) => `/products?search=${searchTerm}&pageNo=${currentPage}&pageSize=${totalPages}`,
      providesTags: ["Product"],
    }),
    viewUserProductById: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: ["Product"],
    }),
  }),
  overrideExisting: false,
});

export const { useViewUserCategoryQuery, useViewUserProductsQuery, useViewUserProductByIdQuery } = userService;
