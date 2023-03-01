import { Drawer } from "antd";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { IoMdExit } from "react-icons/io";
import { MdAdd, MdDashboard, MdPostAdd, MdRateReview } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/setUserSlice";

const style = {
  width: "130px",
  display: "flex",
  gap: "7px",
  alignItems: "center",
  cursor: "pointer",
};

const Sidebar = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const Location = useLocation().pathname.split("/")[2].toUpperCase();
  const handleClick = async () => {
    Navigate("/");
    await dispatch(logoutUser());
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ background: "#1b1f2c" }}>
      <div className="admin-drawer">
        <h2
          style={{
            margin: " auto",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {Location}
        </h2>
        <div>
          <span style={{ marginRight: "20px" }} onClick={showDrawer}>
            <VscThreeBars size={30} />
          </span>
        </div>
      </div>
      <div className="side-bar-link">
        <Link
          to="/"
          style={{
            display: "flex",
            flexDirection: "column",
            color: "gray",
            marginTop: "20px",
          }}
        >
          <span
            style={{ fontSize: "40px", fontWeight: "bold", color: "green" }}
          >
            Act
          </span>
          <span style={{ fontWeight: 600, color: "white" }}>
            MART & GROCERY
          </span>
        </Link>
        <Link to="/admin/dashboard" style={style}>
          <span>
            <MdDashboard size={20} />
          </span>
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/all-product" style={style}>
          <span>
            <MdPostAdd size={20} />
          </span>
          <span>All Products</span>
        </Link>
        <Link to="/admin/create-product" style={style}>
          <span>
            <MdAdd size={20} />
          </span>
          <span>Create Products</span>
        </Link>
        <Link to="/admin/all-user" style={style}>
          <span>
            <FaUserFriends size={20} />
          </span>
          <span>Users</span>
        </Link>
        <Link to="/admin/all-order" style={style}>
          <span>
            <GoChecklist size={23} />
          </span>
          <span>Orders</span>
        </Link>
        <Link to="/admin/all-review" style={style}>
          <span>
            <MdRateReview size={20} />
          </span>
          <span>Reviews</span>
        </Link>
        <Link onClick={handleClick} to="/" title="Logout" style={style}>
          <span>
            <IoMdExit size={20} />
          </span>
          <span>Logout</span>
        </Link>
      </div>
      <div>
        <Drawer placement="left" width={210} onClose={onClose} open={open}>
          <div className="drawer-link">
            <Link to="/" style={style}>
              <span>
                <AiFillHome size={20} />
              </span>
              <span>Home</span>
            </Link>
            <Link to="/admin/dashboard" style={style}>
              <span>
                <MdDashboard size={20} />
              </span>
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/all-product" style={style}>
              <span>
                <MdPostAdd size={20} />
              </span>
              <span>All Products</span>
            </Link>
            <Link to="/admin/create-product" style={style}>
              <span>
                <MdAdd size={20} />
              </span>
              <span>Create Products</span>
            </Link>
            <Link to="/admin/all-user" style={style}>
              <span>
                <FaUserFriends size={20} />
              </span>
              <span>Users</span>
            </Link>
            <Link to="/admin/all-order" style={style}>
              <span>
                <GoChecklist size={23} />
              </span>
              <span>Orders</span>
            </Link>
            <Link to="/admin/all-review" style={style}>
              <span>
                <MdRateReview size={20} />
              </span>
              <span>Reviews</span>
            </Link>
            <Link onClick={handleClick} to="/" title="Logout" style={style}>
              <span>
                <IoMdExit size={20} />
              </span>
              <span>Logout</span>
            </Link>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Sidebar;
