import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};
const setProductSlice = createSlice({
  name: "setProductSlice",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = setProductSlice.actions;
export default setProductSlice.reducer;
