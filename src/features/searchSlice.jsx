import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload;
    },
  },
});

export const { setKey } = searchSlice.actions;
export default searchSlice.reducer;
