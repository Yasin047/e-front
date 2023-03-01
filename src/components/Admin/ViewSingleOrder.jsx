import { Button, Col, Row, Select } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAdminUpdateOrderMutation,
  useGetUserSingleOrderQuery,
} from "../../features/orderSlice";
import Loading from "../utils/Loading";
import Sidebar from "./Sidebar";
const ViewSingleOrder = () => {
  const [status, setOrderStatus] = useState("");
  const id = useParams();
  const _id = id.id;
  const { isLoading, data, isSuccess, isError, error } =
    useGetUserSingleOrderQuery(_id);
  const [
    adminUpdateOrder,
    {
      isLoading: updateIsLoading,
      data: updateData,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useAdminUpdateOrderMutation();

  let content;
  if (updateIsLoading || isLoading) {
    content = <Loading />;
  } else if (updateIsSuccess) {
    content = <p>{updateData?.message}</p>;
  } else if (updateIsError || isError) {
    content = (
      <p>{updateIsError ? updateError?.data?.message : error?.data?.message}</p>
    );
  }
  const { order } = data || {};
  const {
    orderItems,
    orderStatus: productOrderStatus,
    paymentInfo,
    shippingCharge,
    shippingInfo,
    totalAmount,
    totalPrice,
    _id: orderId,
  } = order || {};
  const onChange = (value) => {
    setOrderStatus(value);
  };
  const handleClick = async () => {
    await adminUpdateOrder({ status, _id });
  };
  return (
    <>
      {isSuccess && (
        <div className="order-main">
          <div>
            <Sidebar />
          </div>
          <div style={{ margin: "0 auto" }}>
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
                    #{orderId}
                  </span>
                </div>
                <h2 style={{ fontWeight: "bold" }}>Shipping Info</h2>
                <div>
                  <span style={{ fontWeight: "bold" }}>Name: </span>
                  <span style={{ fontWeight: "500" }}>
                    {shippingInfo?.name}
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Phone: </span>
                  <span style={{ fontWeight: "500" }}>
                    {shippingInfo?.phone}
                  </span>
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
                  <span style={{ fontWeight: "500" }}>
                    {productOrderStatus}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  {productOrderStatus === "Processing" ? (
                    <Select
                      style={{ width: "100%", borderRadius: "0" }}
                      placeholder="Select a category"
                      onChange={onChange}
                      options={[
                        {
                          value: "Shipped",
                          label: "Shipped",
                        },
                      ]}
                    />
                  ) : (
                    <Select
                      style={{ width: "100%", borderRadius: "0" }}
                      placeholder="Select a category"
                      onChange={onChange}
                      options={[
                        {
                          value: "Delivered",
                          label: "Delivered",
                        },
                      ]}
                    />
                  )}
                  <Button type="primary" danger onClick={handleClick}>
                    Update Status
                  </Button>
                  {content && (
                    <div
                      style={{
                        textAlign: "center",
                        margin: "10px 0 0 0",
                        color: "red",
                      }}
                    >
                      <h3>{content}</h3>
                    </div>
                  )}
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
              <Col xs={20} sm={16} md={16}>
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
              <Col xs={20} sm={16} md={16}>
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
                      <span>${totalAmount}</span>
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
        </div>
      )}
    </>
  );
};

export default ViewSingleOrder;
