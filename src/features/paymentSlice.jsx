import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Cookies from "js-cookie";

export const paymentSlice = createApi({
  reducerPath: "Payment",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://helpful-vest-fawn.cyclic.app/api",
  }),
  tagTypes: ["PAYMENT"],
  endpoints: (builder) => ({
    getPublishableKey: builder.query({
      query: () => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/config",
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["PAYMENT"],
    }),
    clientSecretIntent: builder.mutation({
      query: ({ amount }) => {
        const token =
          Cookies.get("token") !== undefined
            ? "Bearer " + JSON.parse(Cookies.get("token")).token
            : null;
        return {
          url: "/create-payment-intent",
          method: "POST",
          body: { amount },
          headers: {
            Authorization: token,
          },
        };
      },
      providesTags: ["PAYMENT"],
    }),
  }),
});
export const { useGetPublishableKeyQuery, useClientSecretIntentMutation } =
  paymentSlice;
