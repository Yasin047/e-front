import { Button } from "antd";
import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("cartItem");
    localStorage.removeItem("shippingCharge");
    localStorage.removeItem("shippingInfo");
    localStorage.removeItem("cartTotalAmount");
    localStorage.removeItem("cartTotalQuantity");
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <AiFillCheckCircle size={60} color="orangered" />
        <h2>Your Order has been Placed successfully</h2>
        <Button
          style={{
            width: "100%",
            background: "#3DB67E",
            borderRadius: "0",
            color: "white",
          }}
          onClick={() => Navigate("/user/all-order")}
        >
          View Order
        </Button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
