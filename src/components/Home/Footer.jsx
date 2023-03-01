import { Col, Row } from "antd";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { SlEarphonesAlt } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const Navigate = useNavigate();
  return (
    <div
      style={{
        background: "#1C2431",
        color: "white",
        width: "100%",
      }}
    >
      <div className="footer-inner-container">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={10} className="adress">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  textAlign: "start",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
                onClick={() => Navigate("/")}
                className="footer-link"
              >
                <div
                  style={{
                    fontSize: "45px",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  Act
                </div>
                <div style={{ fontWeight: 700 }}>MART & GROCERY</div>
              </div>
              <div className="address-icons">
                <div className="icons-color">
                  <IoLocationOutline />
                </div>
                <div>
                  <span>Address:</span> 2200 Mymensingh Sadar,Bangladesh
                </div>
              </div>
              <div className="address-icons">
                <div className="icons-color">
                  <AiOutlineMail />
                </div>
                <div>
                  <span>Email:</span> yasinmahmud0047@gmail.com
                </div>
              </div>
              <div className="address-icons">
                <div className="icons-color">
                  <SlEarphonesAlt />
                </div>
                <div>
                  <span>Call us: </span>
                  +8801723330047
                </div>
              </div>
              <div className="address-icons">
                <div className="icons-color">
                  <IoTimeOutline />
                </div>
                <div>
                  <span>Time:</span> 10:00 Am - 10:00 Pm (Everyday)
                </div>
              </div>
              <div>
                <h1>Install App</h1>
                <h5>From App Store or Google Play</h5>
                <div
                  style={{ display: "flex", marginBottom: "30px", gap: "10px" }}
                >
                  <div>
                    <img
                      src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/app-store.jpg"
                      style={{ width: "130px" }}
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/google-play.jpg"
                      style={{ width: "130px" }}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={8} sm={8} md={8} lg={4}>
            <div className="footer">
              <h2>Account</h2>
              <h4 onClick={() => Navigate("/login")}>Log In</h4>
              <h4 onClick={() => Navigate("/register")}>Registration</h4>
              <h4 onClick={() => Navigate("/forgotpassword")}>
                Forgot Password
              </h4>
            </div>
          </Col>
          <Col xs={8} sm={8} md={8} lg={4}>
            <div className="footer">
              <h2>Follow us</h2>
              <h4>Facebook</h4>
              <h4>Youtube</h4>
              <h4>Instagram</h4>
            </div>
          </Col>
          <Col xs={8} sm={8} md={8} lg={4}>
            <div className="footer">
              <h2>Rules</h2>
              <h4 onClick={() => Navigate("/user-rules")}>User Rules</h4>
              <h4 onClick={() => Navigate("/contact")}>Contact us</h4>
              <h4 onClick={() => Navigate("/about")}>About us</h4>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
