import { Button, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { MdLibraryAddCheck, MdLocalShipping, MdPayment } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { setAddress } from "../../features/shippingSlice";

const Shipping = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: Number(),
    country: "",
  });
  const handleChange = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleClick = async () => {
    if (
      !userInfo.name ||
      !userInfo.address ||
      !userInfo.phone ||
      !userInfo.country
    ) {
      toast.error("Please fill all the field!", {
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
      await dispatch(setAddress(userInfo));
      Navigate("/user/order");
    }
  };

  return (
    <div style={{ margin: "0 10%" }}>
      <ToastContainer />
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
          <MdLibraryAddCheck size={25} />
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
        <Col style={{ margin: "0 auto" }} xs={24} sm={24} md={16} lg={12}>
          <div
            style={{
              display: "flex",
              gap: "25px",
              flexDirection: "column",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                width: "200px",
                borderBottom: "2px solid gray",
                margin: "0 auto",
                paddingTop: "40px",
              }}
            >
              <h2
                style={{
                  color: "gray",
                  fontWeight: "650",
                }}
              >
                Shipping Details
              </h2>
            </div>
            <Input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <Input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <Input
              type="number"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <Input
              type="text"
              name="country"
              value={userInfo.country}
              onChange={handleChange}
              placeholder="Country"
            />
            <Button onClick={handleClick} type="primary">
              Continue
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Shipping;
