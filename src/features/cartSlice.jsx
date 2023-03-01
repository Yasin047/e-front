import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    decreasedItemFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const removeItem = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = removeItem;
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = removeItem;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { productPrice, cartQuantity } = cartItem;
          const itemTotal = productPrice * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
    },
  },
});

export const {
  addToCart,
  decreasedItemFromCart,
  removeItemFromCart,
  clearCart,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
