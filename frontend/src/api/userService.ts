import api from "./index.ts";

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    viewUserCategory: builder.query({
      query: () => `/categories`,
    }),
    viewUserProducts: builder.query({
      query: ({ searchTerm = "", currentPage = 1, totalPages = 10, category = "", minPrice = 0, maxPrice = 500 }) => 
        `/products?search=${searchTerm}&pageNo=${currentPage}&pageSize=${totalPages}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
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
