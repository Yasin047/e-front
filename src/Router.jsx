import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import AllOrders from "./components/Admin/AllOrders";
import AllProducts from "./components/Admin/AllProducts";
import AllReviews from "./components/Admin/AllReviews";
import AllUsers from "./components/Admin/AllUsers";
import CreateProduct from "./components/Admin/CreateProduct";
import Dashboard from "./components/Admin/Dashboard";
import EditProduct from "./components/Admin/EditProduct";
import ViewSingleOrder from "./components/Admin/ViewSingleOrder";
import Forgotpassword from "./components/Authentication/Forgotpassword";
import Login from "./components/Authentication/Login";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Register from "./components/Authentication/Register";
import Resetpassword from "./components/Authentication/Resetpassword";
import UserProtectedRoute from "./components/Authentication/UserProtectedRoute";
import Cart from "./components/Cart/Cart";
import Favourite from "./components/Cart/Favourite";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import ProductDetails from "./components/Product/ProductDetails";
import ReportUs from "./components/Report/ReportUs";
import ConfirmOrder from "./components/User/ConfirmOrder";
import Order from "./components/User/Order";
import OrderInfo from "./components/User/OrderInfo";
import Payment from "./components/User/Payment";
import Shipping from "./components/User/Shipping";
import UserProfile from "./components/User/UserProfile";
import ViewUserAllOrder from "./components/User/ViewUserAllOrder";
import UserRules from "./components/UserRules/UserRules";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/report" element={<ReportUs />} />
      <Route path="/user-rules" element={<UserRules />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/resetpassword" element={<Resetpassword />} />
      <Route path="/user/*" element={<UserProtectedRoute />}>
        <Route path="profile" element={<UserProfile />} />
        <Route path="all-order" element={<ViewUserAllOrder />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="order" element={<Order />} />
        <Route path="payment" element={<Payment />} />
        <Route path="confirm-order" element={<ConfirmOrder />} />
        <Route path="order/:id" element={<OrderInfo />} />
      </Route>
      <Route path="/admin/*" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="all-product" element={<AllProducts />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="edit-product" element={<EditProduct />} />
        <Route path="create-product" element={<CreateProduct />} />

        <Route path="all-user" element={<AllUsers />} />
        <Route path="all-order" element={<AllOrders />} />
        <Route path="all-order/:id" element={<ViewSingleOrder />} />
        <Route path="all-review" element={<AllReviews />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Route>
  )
);

export default router;
