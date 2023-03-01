import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  token: null,
};

const setUserSlice = createSlice({
  name: "setUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      Cookies.set(
        "token",
        JSON.stringify({
          token: action.payload.token,
        })
      );
      state.token = action.payload.token;
    },
    logoutUser: (state, action) => {
      Cookies.remove("token");
      state.token = null;
    },
  },
});

export const { setUser, logoutUser } = setUserSlice.actions;
export default setUserSlice.reducer;
