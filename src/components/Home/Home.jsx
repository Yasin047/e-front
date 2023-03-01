import React from "react";
import Carousels from "../Carousel/Carousels";
import FeatureProduct from "./FeatureProduct";
import Footer from "./Footer";
import Header from "./Header";
import "./Home.css";
import Navbar from "./Navbar";
const Home = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Carousels />
      <FeatureProduct />
      <Footer />
    </div>
  );
};

export default Home;
