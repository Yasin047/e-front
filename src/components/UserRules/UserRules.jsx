import React from "react";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Navbar from "../Home/Navbar";
const UserRules = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="rules">
        <h2>Some Rules:</h2>
        <div className="rules-inner">
          1. You can easily return your product..But you have to give us the
          delivery charge...
        </div>
        <div className="rules-inner">
          2. You have to give dedivvery charge first for cash on Dedivvery..In
          Los Angeles City you have to give 70tk and outside jashore charge will
          be 120 tk
        </div>
        <div className="rules-inner">
          3. You can not buy the outofstock products...
        </div>
        <div className="rules-inner">
          4. You can buy any products from us...we are trying to our best for
          give the best quadivty of products...
        </div>
        <div className="rules-inner">
          5. You can find more new features in our buiseness in very soon...Our
          developers team always work for your good services...
        </div>
        <div className="rules-inner">
          6. At last thanks for visit our website...Have a good day !
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserRules;
