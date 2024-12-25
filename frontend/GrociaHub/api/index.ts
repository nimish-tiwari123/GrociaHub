import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: `/users/`,
        method: "POST",
        body,
      }),
    }),
    login: build.mutation({
      query: (body) => ({
        url: `/users/login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = api;

export default api;
