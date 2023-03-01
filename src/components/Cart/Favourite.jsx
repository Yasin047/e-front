import { Button, Col, Row } from "antd";
import React from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import { removeToFavouriteCart } from "../../features/favouriteSlice";

const Favourite = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const favouriteProduct = useSelector((state) => state.favouriteProduct);
  const { favouriteItem } = favouriteProduct || {};

  const handleProduct = async (item) => {
    await dispatch(addToCart(item));
    Navigate("/cart");
  };
  const handleRemoveItem = async (item) => {
    await dispatch(removeToFavouriteCart(item));
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          margin: "25px 0",
          fontWeight: "bold",
        }}
      >
        Favourite Product
      </h1>
      {favouriteItem.length >= 1 ? (
        <>
          <div className="cart-favourite">
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
              <Col xs={5} sm={6} md={6}>
                <div className="fav-font">Product</div>
              </Col>
              <Col xs={5} sm={6} md={6}>
                <div className="fav-font">Price</div>
              </Col>
              <Col xs={6} sm={6} md={6}>
                <div className="fav-font">Stock Status</div>
              </Col>
              <Col xs={8} sm={6} md={6}>
                <div className="fav-font">Action</div>
              </Col>
            </Row>
            {favouriteItem?.map((item) => {
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
                  <Col xs={5} sm={6} md={6}>
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
                  <Col xs={5} sm={6} md={6}>
                    <div className="fav-font-item">{item.productPrice}</div>
                  </Col>
                  <Col xs={6} sm={6} md={6}>
                    <div style={{ color: "green" }} className="fav-font-item">
                      {item.productStock > 0 ? "InStock" : "OutOfStock"}
                    </div>
                  </Col>
                  <Col xs={8} sm={6} md={6}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "7px",
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => handleProduct(item)}
                        className="fav-font-btn"
                      >
                        Add To Cart
                      </Button>
                      <Button
                        type="primary"
                        danger
                        className="fav-font-btn"
                        onClick={() => handleRemoveItem(item)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Col>
                </Row>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", color: "gray" }}>
          <h3>Your favourite cart is currently empty</h3>
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
      )}
    </>
  );
};

export default Favourite;
