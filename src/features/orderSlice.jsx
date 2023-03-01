import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";

export const orderSlice = createApi({
  reducerPath: "Order",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://helpful-vest-fawn.cyclic.app/api",
  }),
  tagTypes: ["ORDER"],
  endpoints: (builder) => ({
    getAdminAllOrder: builder.query({
      query: (pageNumber) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: `/getadminall-order?page=${pageNumber || ""}`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["ORDER"],
    }),
    adminUpdateOrder: builder.mutation({
      query: ({ _id, status }) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/update-order",
          method: "POST",
          body: { _id, status },
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["ORDER"],
    }),
    updateProduct: builder.mutation({
      query: (formData) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/product-update",
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["PRODUCT"],
    }),
    getUserAllOrder: builder.query({
      query: () => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/getall-order",
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["ORDER"],
    }),
    getUserSingleOrder: builder.query({
      query: (_id) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: `/getsingle-order/${_id}`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["ORDER"],
    }),
    createOrder: builder.mutation({
      query: ({ order }) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/create-order",
          method: "POST",
          body: { order },
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["ORDER"],
    }),
  }),
});

export const {
  useGetAdminAllOrderQuery,
  useAdminUpdateOrderMutation,
  useGetUserAllOrderQuery,
  useGetUserSingleOrderQuery,
  useCreateOrderMutation,
} = orderSlice;
