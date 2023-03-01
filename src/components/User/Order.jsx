import { Button, Col, Row } from "antd";
import React from "react";
import { MdLibraryAddCheck, MdLocalShipping, MdPayment } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const Navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart || {};
  const cartTotalAmount = JSON.parse(localStorage.getItem("cartTotalAmount"));
  const shippingCharge = JSON.parse(localStorage.getItem("shippingCharge"));
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const { name, phone, address, country } = shippingInfo || {};

  return (
    <div style={{ margin: "0 10%" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          color: "gray",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 3%",
          paddingTop: "30px",
        }}
      >
        <div>
          <MdLocalShipping color="orangered" size={25} />
        </div>
        <div
          style={{
            width: "45%",
            borderBottom: "2px solid gray",
          }}
        ></div>
        <div>
          <MdLibraryAddCheck color="orangered" size={25} />
        </div>
        <div style={{ width: "45%", borderBottom: "2px solid gray" }}></div>
        <div>
          <MdPayment size={25} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          color: "gray",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        <div>Shipping Details</div>
        <div style={{ marginRight: "30px" }}>Confirm Order</div>
        <div style={{ marginRight: "15px" }}>Payment</div>
      </div>
      <Row>
        <Col xs={24} sm={24} md={14}>
          <div className="order-border">
            <div>
              <h2>Shopping Info</h2>
              <div
                style={{
                  textIndent: "15px",
                  padding: "15px 0",
                }}
              >
                <h4>Name: {name ? name : ""}</h4>
                <h4>Phone: {phone ? phone : ""}</h4>
                <h4>
                  Address: {address ? address : ""} {country ? country : ""}
                </h4>
              </div>
            </div>
            <div
              style={{
                padding: "15px 0",
              }}
            >
              <h2>Your Cart Items</h2>
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid gray",
                  borderBottom: "1px solid gray",
                  padding: "10px",
                  marginTop: "30px",
                }}
              >
                <h3>Image</h3>
                <h3>Name</h3>
                <h3>Price</h3>
              </div>
              {cartItems?.map((item) => {
                return (
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid gray",
                      padding: "20px",
                    }}
                    key={item._id}
                  >
                    <img
                      style={{ width: "13%" }}
                      src={item.images[0].url?.[0]}
                      alt=""
                    />
                    <h3>{item.productName}</h3>
                    <h3>{item.productPrice}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={10}>
          <div className="order-summery">
            <h2 style={{ textAlign: "center" }}>Order Summery</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
                padding: "10px 0",
                fontWeight: "500",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                }}
              >
                <span>Subtotal</span>
                <span>${cartTotalAmount}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                }}
              >
                <span>Shipping Charges</span>
                <span>${shippingCharge}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 0",
                fontWeight: "bold",
              }}
            >
              <span>Total</span>
              <span>${`${cartTotalAmount + shippingCharge}`}</span>
            </div>
            <div>
              <Button
                onClick={() => Navigate("/user/payment")}
                style={{
                  width: "100%",
                  background: "#3DB67E",
                  borderRadius: "0",
                  color: "white",
                }}
              >
                Proceed To Payment
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
