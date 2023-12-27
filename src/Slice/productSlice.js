import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProduct: [],
  brands: [],
  categories: [],
  cart: {},
  orders: [],
  oneOrder: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProduct = action.payload.data;
      state.categories = action.payload.categories;
      state.brands = action.payload.brands;
    },
    removeAllProducts: (state) => {
      state.allProduct = [];
      state.brands = [];
      state.categories = [];
    },

  

  },
});

export const {
  setAllProducts,
  removeAllProducts,

} = productSlice.actions;
export default productSlice.reducer;