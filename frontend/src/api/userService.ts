import api from "./index.ts";

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    viewUserCategory: builder.query({
      query: () => `/categories`,
    }),
  }),
  overrideExisting: false,
});

export const { useViewUserCategoryQuery } = userService;
