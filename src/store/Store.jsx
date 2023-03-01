import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import favouriteReducer from "../features/favouriteSlice";
import { orderSlice } from "../features/orderSlice";
import { paymentSlice } from "../features/paymentSlice";
import { productSlice } from "../features/productSlice";
import { reviewSlice } from "../features/reviewSlice";
import searchReducer from "../features/searchSlice";
import setProductReducer from "../features/setProductSlice";
import setUserReducer from "../features/setUserSlice";
import shippingReducer from "../features/shippingSlice";
import { userSlice } from "../features/userSlice";
const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [reviewSlice.reducerPath]: reviewSlice.reducer,
    [paymentSlice.reducerPath]: paymentSlice.reducer,
    cart: cartReducer,
    favouriteProduct: favouriteReducer,
    shippingInfo: shippingReducer,
    setUser: setUserReducer,
    key: searchReducer,
    product: setProductReducer,
  },
  middleware: getDefaultMiddleware().concat(
    userSlice.middleware,
    productSlice.middleware,
    orderSlice.middleware,
    reviewSlice.middleware,
    paymentSlice.middleware
  ),
});

export default store;
