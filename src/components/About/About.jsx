import { Col, Row } from "antd";
import React from "react";
import Welcome from "../../Assets/welcome.jpg";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Navbar from "../Home/Navbar";

const About = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Row justify={"center"} gutter={[20]}>
        <Col
          sm={{ span: 24 }}
          md={{ span: 13 }}
          lg={{ span: 11 }}
          xl={{ span: 12 }}
        >
          <div className="welcome-div">
            <div className="welcome-img">
              <img src={Welcome} alt="" />
            </div>
          </div>
        </Col>
        <Col
          sm={{ span: 24 }}
          md={{ span: 11 }}
          lg={{ span: 11 }}
          xl={{ span: 10 }}
        >
          <div
            style={{
              paddingTop: "40px",
              width: "70%",
              margin: "0 auto",
              textAlign: "center",
            }}
            className="about-span"
          >
            <h1>Welcome to Act</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate id est laborum.
            </p>
            <p>
              lus ferri velit sanctus cu, sed at soleat accusata. Dictas prompta
              et Ut placerat legendos interpre.Donec vitae sapien ut libero
              venenatis faucibus. Nullam quis ante Etiam sit amet orci eget.
              Quis commodo odio aenean sed adipiscing. Turpis massa tincidunt
              dui ut ornare lectus. Auctor elit sed vulputate mi sit amet.
              Commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate id est laborum.
            </p>
          </div>
        </Col>
      </Row>
      <div
        style={{ margin: "0 40px", padding: "40px 0" }}
        className="about-span"
      >
        <h1>What We Provide?</h1>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="about-container">
              <img
                src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg"
                alt=""
              />
              <span>Best Prices & Offers</span>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="about-container">
              <img
                src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-2.svg"
                alt=""
              />
              <span>Best For Trust & Quality</span>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="about-container">
              <img
                src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-3.svg"
                alt=""
              />
              <span>Fast Delivery System</span>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="about-container">
              <img
                src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-4.svg"
                alt=""
              />
              <span>Easy Returns Service</span>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="about-container">
              <img
                src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-5.svg"
                alt=""
              />
              <span>100% satisfication</span>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="about-container">
              <img
                src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-6.svg"
                alt=""
              />
              <span>Great Daily Deal</span>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default About;
