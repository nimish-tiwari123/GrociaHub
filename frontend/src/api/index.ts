import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.31.84:9000/api" }),
  tagTypes: ["Category"],

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
    forgotPassword: build.mutation({
      query: (body) => ({
        url: `/users/forgot-password`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation({
      query: ({ body, token }) => ({
        url: `/users/reset-password?token=${token}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = api;

export default api;
