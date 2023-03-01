import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFacebook, BsGithub, BsYoutube } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Navbar from "../Home/Navbar";
const Contact = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="contact-container">
        <div className="contact">
          <div className="us">Contact us :</div>
          <div className="social-ad">
            <AiOutlineMail color="green" />
            <span>Email:</span> yasinmahmud0047@gmail.com
          </div>
          <div className="social-ad">
            <IoLocationOutline color="green" />
            <span>Address:</span> 2200 Mymensingh Sadar,Bangladesh
          </div>
          <div className="social">
            <span>You can also find us from here :</span>
            <div className="social-icons">
              <div className="facebook">
                <BsFacebook />
              </div>
              <div className="github">
                <BsGithub />
              </div>
              <div className="youtube">
                <BsYoutube />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
