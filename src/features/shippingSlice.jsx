import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  shippingInfo: {},
  shippingCharge: 0,
};
const shippingSlice = createSlice({
  name: "shippingInfo",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    setShippingCharge: (state, action) => {
      state.shippingCharge = action.payload;
      localStorage.setItem(
        "shippingCharge",
        JSON.stringify(state.shippingCharge)
      );
    },
  },
});
export const { setAddress, setShippingCharge } = shippingSlice.actions;
export default shippingSlice.reducer;
