import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteItem: localStorage.getItem("favouriteItem")
    ? JSON.parse(localStorage.getItem("favouriteItem"))
    : [],
};

const favouriteSlice = createSlice({
  name: "favouriteProduct",
  initialState,
  reducers: {
    addToFavouriteCart: (state, action) => {
      const itemIndex = state.favouriteItem.findIndex(
        (item) => item._id === action.payload._id
      );
      console.log(action);
      if (itemIndex === -1) {
        state.favouriteItem.push(action.payload);
      }
      localStorage.setItem(
        "favouriteItem",
        JSON.stringify(state.favouriteItem)
      );
    },
    removeToFavouriteCart: (state, action) => {
      const removeItem = state.favouriteItem.filter(
        (item) => item._id !== action.payload._id
      );
      state.favouriteItem = removeItem;
      localStorage.setItem(
        "favouriteItem",
        JSON.stringify(state.favouriteItem)
      );
    },
  },
});
export const { addToFavouriteCart, removeToFavouriteCart } =
  favouriteSlice.actions;
export default favouriteSlice.reducer;
