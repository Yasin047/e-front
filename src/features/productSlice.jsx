import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const productSlice = createApi({
  reducerPath: "Product",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),
  tagTypes: ["PRODUCT"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ pageNumber, productCategory, key }) =>
        `/product-get?page=${pageNumber || ""}&filteredBy=${
          productCategory || ""
        }&key=${key || ""}`,
      providesTags: ["PRODUCT"],
    }),
    getSingleProduct: builder.query({
      query: (_id) => `/product-single/${_id}`,
      invalidatesTags: ["PRODUCT"],
    }),
    getAllProduct: builder.query({
      query: (pageNumber) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: `/allproduct-get?page=${pageNumber || ""}`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["PRODUCT"],
    }),
    createProduct: builder.mutation({
      query: (formData) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/product-create",
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["PRODUCT"],
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
    deleteProduct: builder.mutation({
      query: ({ _id }) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/product-delete",
          method: "POST",
          body: { _id },
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["PRODUCT"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetSingleProductQuery,
  useGetAllProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
