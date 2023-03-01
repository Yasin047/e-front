import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const reviewSlice = createApi({
  reducerPath: "Review",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),
  tagTypes: ["REVIEW"],
  endpoints: (builder) => ({
    singleProductAllReviews: builder.query({
      query: (productId) => `/product-reviews/${productId}`,
      providesTags: ["REVIEW"],
    }),
    singleProductAllReviewsAdmin: builder.query({
      query: ({ productId, pageNumber }) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: `/product-reviews-admin/${productId || ""}?page=${
            pageNumber || ""
          }`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["REVIEW"],
    }),
    createReviews: builder.mutation({
      query: ({ ratings, comment, productId }) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/product-createreview",
          method: "POST",
          body: { ratings, comment, productId },
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["REVIEW"],
    }),
    deleteReviews: builder.mutation({
      query: ({ productId, _id }) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/product-deletereview",
          method: "POST",
          body: { productId, _id },
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["REVIEW"],
    }),
  }),
});

export const {
  useSingleProductAllReviewsQuery,
  useSingleProductAllReviewsAdminQuery,
  useCreateReviewsMutation,
  useDeleteReviewsMutation,
} = reviewSlice;
