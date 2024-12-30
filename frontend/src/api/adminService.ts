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
      query: ({ categoryId, body }) => ({
        url: `/categories/${categoryId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Category"],

    }),
  }),
  overrideExisting: false,
});

export const {
  useAddCategoryMutation,
  useViewCategoryQuery,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useViewCategoryByIdQuery
} = adminService;
