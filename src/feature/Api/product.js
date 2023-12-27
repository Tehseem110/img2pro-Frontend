import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../../constants/ApiEndpoints";
import Cookies from "js-cookie";
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    reducerPath: "productApi",

    getAllProduct: builder.query({
      query: (filter) => {
        return {
          url: `${USERS_URL}?${filter}`,
          method: "GET",
        };
      },
    }),

  }),
});

export const { useGetAllProductQuery} =  productApiSlice;