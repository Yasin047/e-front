import { Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  addToCart,
  clearCart,
  decreasedItemFromCart,
  getTotals,
  removeItemFromCart,
} from "../../features/cartSlice";
import { setShippingCharge } from "../../features/shippingSlice";

const Cart = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart || {};
  const cartTotalAmount = JSON.parse(localStorage.getItem("cartTotalAmount"));
  useEffect(() => {
    if (cartTotalAmount < 1000) {
      dispatch(setShippingCharge(80));
    } else if (cartTotalAmount >= 1000) {
      dispatch(setShippingCharge(0));
    }
  }, [dispatch, cartTotalAmount]);

  const handleIncreasedItem = async (item) => {
    if (item.productStock === item.cartQuantity) {
      toast.error("You are reached maximum!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      await dispatch(addToCart(item));
    }
  };
  const handleDecresedItem = async (item) => {
    await dispatch(decreasedItemFromCart(item));
  };
  const handleRemoveItem = async (item) => {
    await dispatch(removeItemFromCart(item));
  };
  const handleClearCart = async () => {
    await dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  return (
    <div className="cart-favourite">
      <ToastContainer />
      <h1 style={{ textAlign: "center", margin: "25px 0", fontWeight: "bold" }}>
        Cart Product
      </h1>
      {cartItems.length >= 1 ? (
        <>
          <Row
            style={{
              background: "rgb(236, 101, 11)",
              textAlign: "center",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col xs={8} sm={8} md={8}>
              <div className="fav-font">Product</div>
            </Col>
            <Col xs={8} sm={8} md={8}>
              <div className="fav-font">Quantity</div>
            </Col>
            <Col xs={8} sm={8} md={8}>
              <div className="fav-font">Sub-total</div>
            </Col>
          </Row>
          {cartItems?.map((item) => {
            return (
              <Row
                style={{
                  textAlign: "center",
                  marginTop: "5px",
                  borderBottom: "1px solid rgb(233, 229, 229",
                }}
                className="cart-fav"
                key={item._id}
              >
                <Col xs={8} sm={8} md={8}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="fav-img fav-font-item">
                      <img src={item.images[0].url[0]} alt="" />
                      {item.productName}
                    </div>
                  </div>
                </Col>
                <Col xs={8} sm={8} md={8}>
                  <div className="fav-font-item">
                    <Button
                      style={{
                        borderRadius: "0",
                      }}
                      type="primary"
                      onClick={() => handleDecresedItem(item)}
                    >
                      -
                    </Button>
                    <span style={{ margin: "0 5px" }}>{item.cartQuantity}</span>
                    <Button
                      style={{
                        borderRadius: "0",
                      }}
                      type="primary"
                      onClick={() => handleIncreasedItem(item)}
                    >
                      +
                    </Button>
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <Button
                      style={{
                        width: "95px",
                        height: "32px",
                        borderRadius: "0",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                      danger
                      type="primary"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </Button>
                  </div>
                </Col>
                <Col xs={8} sm={8} md={8}>
                  <div style={{ color: "green" }} className="fav-font-item">
                    <h3>{item.productPrice * item.cartQuantity}</h3>
                  </div>
                </Col>
              </Row>
            );
          })}
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Col xs={18} sm={18} md={18} lg={17}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <span>Total Price</span>
                <span style={{ marginRight: "10px" }}>
                  ${cart.cartTotalAmount}
                </span>
              </div>
              <div
                style={{
                  marginTop: "25px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="primary"
                    style={{
                      width: "90%",
                      borderRadius: "0",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                    onClick={() => Navigate("/user/shipping")}
                  >
                    Check Out
                  </Button>
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{
                      width: "90%",
                      borderRadius: "0",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                    danger
                    type="primary"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div style={{ textAlign: "center", color: "gray" }}>
            <h3>Your cart is currently empty</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
              onClick={() => Navigate("/product")}
            >
              <span>
                <HiOutlineArrowNarrowLeft />
              </span>
              <span>Start Shopping</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
