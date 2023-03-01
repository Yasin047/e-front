import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { AiFillHome, AiOutlineHeart } from "react-icons/ai";
import { FaRegListAlt, FaShoppingCart } from "react-icons/fa";
import { GoAlert } from "react-icons/go";
import { HiUser } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/setUserSlice";

const UserData = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const favouriteProduct = useSelector((state) => state.favouriteProduct);
  const handleClick = () => {
    Navigate("/");
    dispatch(logoutUser());
  };
  const token =
    Cookies.get("token") !== undefined
      ? "Bearer " + JSON.parse(Cookies.get("token")).token
      : null;
  const isExist = token ? jwt_decode(token) : null;
  const [show, setShow] = useState(false);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        onClick={() => setShow(!show)}
        className="parent"
        style={{ fontSize: "60px" }}
      >
        <img src={isExist?.image} alt="" />
      </div>
      <div className={show ? null : "drop"}>
        {isExist?.role === "admin" ? (
          <div title="Dashboard" className="drop-down">
            <Link to="/admin/dashboard">
              <span>
                <MdDashboard />
              </span>
            </Link>
          </div>
        ) : (
          ""
        )}

        <div title="Home" className="drop-down">
          <Link to="/">
            <span>
              <AiFillHome />
            </span>
          </Link>
        </div>
        {isExist?.role === "user" ? (
          <Link to="/user/all-order" title="Orders" className="drop-down">
            <span>
              <FaRegListAlt />
            </span>
          </Link>
        ) : (
          ""
        )}
        <Link
          to="/cart"
          title={`Cart(${cart.cartTotalQuantity})`}
          className="drop-down"
        >
          <span>
            <FaShoppingCart />
          </span>
        </Link>
        <Link
          to="/favourite"
          title={`Favourite(${favouriteProduct.favouriteItem.length})`}
          className="drop-down"
        >
          <span>
            <AiOutlineHeart />
          </span>
        </Link>
        {isExist?.role === "user" ? (
          <Link to="/user/profile" title="Profile" className="drop-down">
            <span>
              <HiUser />
            </span>
          </Link>
        ) : (
          <Link to="/admin/profile" title="Profile" className="drop-down">
            <span>
              <HiUser />
            </span>
          </Link>
        )}
        <Link to="/report" title="Report us" className="drop-down">
          <span>
            <GoAlert />
          </span>
        </Link>
        <div onClick={handleClick} to="/" title="Logout" className="drop-down">
          <span>
            <IoMdExit />
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserData;
