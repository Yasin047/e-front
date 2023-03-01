import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const userSlice = createApi({
  reducerPath: "Login",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://helpful-vest-fawn.cyclic.app/api",
  }),
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/user-login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["USER"],
    }),
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/user-create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["USER"],
    }),
    forgotPassword: builder.mutation({
      query: (user) => ({
        url: "/user-forgotpassword",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["USER"],
    }),
    verifyToken: builder.mutation({
      query: ({ token }) => ({
        url: "/user-verifytoken",
        body: { token },
        method: "POST",
      }),
      providesTags: ["POSTS"],
    }),
    resetPassword: builder.mutation({
      query: ({ password, email }) => ({
        url: "/user-resetpassword",
        method: "POST",
        body: { password, email },
      }),
      invalidatesTags: ["USER"],
    }),
    getAllUser: builder.query({
      query: (pageNumber) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: `/get-alluser?page=${pageNumber || ""}`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["USER"],
    }),
    getSingleUser: builder.query({
      query: (_id) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: `/user-details/${_id}`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["USER"],
    }),
    userRole: builder.mutation({
      query: ({ _id, role }) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/user-role",
          method: "POST",
          body: { _id, role },
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["USER"],
    }),
    userDelete: builder.mutation({
      query: ({ _id }) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/user-delete",
          method: "POST",
          body: { _id },
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["USER"],
    }),
    userUpdate: builder.mutation({
      query: (formData) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/user-updateprofile",
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["USER"],
    }),
    getWeeklyUser: builder.query({
      query: () => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/weekly-users",
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["USER"],
    }),
    getWeeklyIncome: builder.query({
      query: () => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/monthly-income",
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useVerifyTokenMutation,
  useResetPasswordMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUserRoleMutation,
  useUserDeleteMutation,
  useUserUpdateMutation,
  useGetWeeklyUserQuery,
  useGetWeeklyIncomeQuery,
} = userSlice;
