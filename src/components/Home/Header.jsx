import { Col, Row } from "antd";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";

const Header = () => {
  return (
    <div
      style={{
        background: "#1C2431",
      }}
    >
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          padding: "15px 0",
          color: "white",
        }}
      >
        <Row>
          <Col xs={24} sm={10} md={14}>
            <div className="logo icons-hover">
              <span style={{ fontSize: "45px", fontWeight: "bold" }}>Act</span>
              <span style={{ fontWeight: 700 }}>MART & GROCERY</span>
            </div>
          </Col>
          <Col sm={14} md={10}>
            <div className="email">
              <span style={{ marginTop: "5px", fontSize: "18px" }}>
                <AiOutlineMail />
              </span>
              <span>Email :</span>
              <span style={{ fontSize: "12px", fontWeight: "500" }}>
                yasinmahmud0047@gmail.com
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
