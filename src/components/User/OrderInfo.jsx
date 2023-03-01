import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import { useGetUserSingleOrderQuery } from "../../features/orderSlice";
import Loading from "../utils/Loading";
const OrderInfo = () => {
  const id = useParams();
  const { isLoading, data, isSuccess, isError, error } =
    useGetUserSingleOrderQuery(id.id);
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <p>{error?.data.message}</p>;
  }
  const { order } = data || {};
  const {
    orderItems,
    orderStatus,
    paymentInfo,
    shippingCharge,
    shippingInfo,
    totalAmount,
    totalPrice,
    _id,
  } = order || {};

  return (
    <>
      {content && (
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>{content}</h3>
        </div>
      )}

      {isSuccess && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "7px",
                fontSize: "16px",
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <h2 style={{ fontWeight: "bold" }}>OrderID:</h2>
                <span
                  style={{
                    marginTop: "7px",
                    fontWeight: "600",
                    color: "orangered",
                    fontSize: "17px",
                    marginLeft: "5px",
                  }}
                >
                  #{_id}
                </span>
              </div>
              <h2 style={{ fontWeight: "bold" }}>Shipping Info</h2>
              <div>
                <span style={{ fontWeight: "bold" }}>Name: </span>
                <span style={{ fontWeight: "500" }}>{shippingInfo?.name}</span>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Phone: </span>
                <span style={{ fontWeight: "500" }}>{shippingInfo?.phone}</span>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Address: </span>
                <span style={{ fontWeight: "500" }}>
                  {shippingInfo?.address}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Payment: </span>
                <span style={{ fontWeight: "500" }}>
                  {paymentInfo?.status === "succeeded" ? "paid" : "unpaid"}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Order Status: </span>
                <span style={{ fontWeight: "500" }}>{orderStatus}</span>
              </div>
            </div>
          </div>

          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <Col xs={20} sm={16} md={10}>
              <div
                style={{
                  padding: "15px 0",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                  }}
                >
                  Your Order Items
                </h2>
                <Row
                  style={{
                    borderTop: "1px solid gray",
                    borderBottom: "1px solid gray",
                    padding: "7px",
                  }}
                >
                  <Col span={8}>
                    <h3>Image</h3>
                  </Col>
                  <Col span={8}>
                    <h3>Name</h3>
                  </Col>
                  <Col span={4}>
                    <h3>Qty</h3>
                  </Col>
                  <Col style={{ textAlign: "center" }} span={4}>
                    <h3>Price</h3>
                  </Col>
                </Row>
                <div>
                  {orderItems?.map((item) => {
                    return (
                      <Row
                        style={{
                          borderBottom: "1px solid gray",
                          padding: "15px 0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={item._id}
                      >
                        <Col span={8}>
                          <img
                            style={{ width: "40%" }}
                            src={item.images[0].url?.[0]}
                            alt=""
                          />
                        </Col>
                        <Col span={8}>
                          <h3>{item.productName}</h3>
                        </Col>
                        <Col span={4}>
                          <h3>{item.cartQuantity}</h3>
                        </Col>
                        <Col style={{ textAlign: "center" }} span={4}>
                          <h3>{item.productPrice}</h3>
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <Col xs={20} sm={16} md={10}>
              <div>
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
                    <span>{totalAmount}</span>
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
                  <span>${`${totalPrice}`}</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default OrderInfo;
