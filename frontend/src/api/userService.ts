import api from "./index.ts";

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    viewUserCategory: builder.query({
      query: () => `/categories`,
    }),
    viewUserProducts: builder.query({
      query: ({
        searchTerm = "",
        category = "",
        minPrice = 0,
        maxPrice = 50000,
      }) =>
        `/products?search=${searchTerm}&categories=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      providesTags: ["Product"],
    }),
    viewSearchProducts: builder.query({
      query: (searchTerm = "") => `/products?search=${searchTerm}`,
      providesTags: ["Product"],
    }),

    viewUserProductById: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: ["Product"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useViewUserCategoryQuery,
  useViewUserProductsQuery,
  useViewUserProductByIdQuery,
  useViewSearchProductsQuery
} = userService;
