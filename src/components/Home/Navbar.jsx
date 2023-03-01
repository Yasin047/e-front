import { Drawer } from "antd";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  AiFillHome,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { VscThreeBars } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTotals } from "../../features/cartSlice";
import UserData from "../User/UserData";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const Navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const favouriteProduct = useSelector((state) => state.favouriteProduct);

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const token =
    Cookies.get("token") !== undefined
      ? "Bearer " + JSON.parse(Cookies.get("token")).token
      : null;

  const isExist = token ? jwt_decode(token) : null;

  return (
    <div className="nav-inner-container">
      <div className="nav-container">
        <div className="nav">
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/product">Product</Link>
            <Link to="/user-rules">User Rules</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="icons">
            <div className="icons-hover">
              <SearchBar />
            </div>
            <div
              onClick={() => Navigate("/favourite")}
              style={{ position: "relative" }}
              className="icons-hover"
            >
              <AiOutlineHeart />
              <div className="addToCart">
                {favouriteProduct.favouriteItem.length}
              </div>
            </div>
            <div
              onClick={() => Navigate("/cart")}
              style={{ position: "relative" }}
              className="icons-hover"
            >
              <AiOutlineShoppingCart />
              <div className="addToCart">{cart.cartTotalQuantity}</div>
            </div>
            <AiOutlineUser
              className="icons-hover"
              onClick={() => Navigate("/login")}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="md-conatiner">
          <div className="md-icons">
            <Link to="/" className="drawer-item">
              <AiFillHome />
            </Link>
            <div
              style={{
                marginRight: "25px",
                marginTop: "5px",
                width: "5px",
              }}
              className="drawer-item"
            >
              <SearchBar />
            </div>
            <Link to="/favourite" className="drawer-item">
              <AiOutlineHeart />
              <div className="md-fav">
                {favouriteProduct.favouriteItem.length}
              </div>
            </Link>
            <Link to="/cart" className="drawer-item">
              <AiOutlineShoppingCart />
              <div className="md-cart">{cart.cartTotalQuantity}</div>
            </Link>
            {isExist?.role === "user" ? (
              <Link to="/user/profile" className="drawer-item">
                <AiOutlineUser />
              </Link>
            ) : (
              ""
            )}
            <span className="drawer-item" onClick={showDrawer}>
              <VscThreeBars />
            </span>
          </div>
        </div>
      </div>
      <div>
        <Drawer width={320} onClose={onClose} open={open}>
          <div className="drawer-inner">
            <div className="drawer-container">
              <Link to="/">Home</Link>
            </div>
            <div className="drawer-container">
              <Link to="/about">About</Link>
            </div>
            <div className="drawer-container">
              <Link to="/product">Product</Link>
            </div>
            <div className="drawer-container">
              <Link to="/user-rules">User Rules</Link>
            </div>
            <div className="drawer-container">
              <Link to="/contact">Contact</Link>
            </div>
            <div className="drawer-container">
              <Link to="/login">Login</Link>
            </div>
            <div className="drawer-container">
              <Link to="/register">Register</Link>
            </div>
          </div>
        </Drawer>
      </div>
      {isExist?.role === "admin" || isExist?.role === "user" ? (
        <div className="user-container">
          <div className="user-data">
            <UserData />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
