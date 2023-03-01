import { Carousel, Col, Rate, Row } from "antd";
import { AiOutlineShopping } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";

import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../../features/cartSlice";
import { addToFavouriteCart } from "../../features/favouriteSlice";
import { useGetSingleProductQuery } from "../../features/productSlice";

import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Navbar from "../Home/Navbar";
import Loading from "../utils/Loading";
import Reviews from "./Reviews";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productId = useLocation().pathname.split("/")[2];

  const { isLoading, data, isSuccess, isError, error } =
    useGetSingleProductQuery(productId);
  const { singleProduct } = data || {};
  const {
    productName,
    productDescription,
    numberOfReviews,
    discountPrice,
    productPrice,
    productStock,
    images,
    ratings,
  } = singleProduct || {};

  const handleProduct = async (singleProduct) => {
    if (productStock === 0) {
      toast.error("Out of stock!", {
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
      await dispatch(addToCart(singleProduct));
    }
  };
  const handleFavouriteProduct = async (singleProduct) => {
    if (productStock === 0) {
      toast.error("Out of stock!", {
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
      await dispatch(addToFavouriteCart(singleProduct));
    }
  };

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <>
        <Col
          xs={{ span: 12 }}
          sm={{ span: 8 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
          xl={{ span: 6 }}
          xxl={{ span: 5 }}
          className="product-carousel"
        >
          <div>
            <Carousel autoplay>
              {images[0].url?.map((items, index) => {
                return <img key={index} src={items} alt="" />;
              })}
            </Carousel>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 16 }}
          md={{ span: 16 }}
          lg={{ span: 14 }}
          xl={{ span: 18 }}
        >
          <div style={{ marginLeft: "2%" }}>
            <h2 style={{ fontWeight: "600" }}>{productName}</h2>
            <div style={{ display: "flex", gap: "5px", fontWeight: "600" }}>
              <div>
                <Rate
                  disabled
                  allowHalf
                  value={ratings}
                  style={{ fontSize: "14px", color: "rgb(236, 101, 11)" }}
                />
              </div>
              <div>({numberOfReviews} Reviews)</div>
            </div>
            {discountPrice >= 1 ? (
              <div
                style={{
                  textDecoration: "line-through",
                  fontSize: "12px",
                  color: "gray",
                }}
                className="product-discount"
              >
                ${productPrice}
              </div>
            ) : null}
            <div style={{ color: "#d85b29" }} className="product-price">
              ${productPrice - (productPrice * discountPrice) / 100}
            </div>
            <div style={{ fontWeight: "bold", color: "green" }}>
              {productStock > 0 ? "InStock" : "OutOfStock"}
            </div>
            <div style={{ margin: "10px 0", width: "100%" }}>
              <span style={{ fontWeight: "700", fontSize: "16px" }}>
                Description:
              </span>
              <p style={{ fontWeight: "500" }}>{productDescription}</p>
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                display: "flex",
                gap: "15px",
              }}
            >
              <div
                className="product-details"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 7px",
                  cursor: "pointer",
                }}
                onClick={() => handleFavouriteProduct(singleProduct)}
              >
                <span>
                  <AiOutlineShopping size={20} />
                </span>
                <span>Add to wishlist</span>
              </div>
              <div
                className="product-details"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 7px",
                  cursor: "pointer",
                }}
                onClick={() => handleProduct(singleProduct)}
              >
                <span>
                  <MdFavoriteBorder size={20} />
                </span>
                <span>Add to Cart</span>
              </div>
            </div>
          </div>
        </Col>
      </>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <>
      <Header />
      <Navbar />
      <div>
        <ToastContainer />
        <div>
          <h1
            style={{ textAlign: "center", padding: "30px", fontWeight: "bold" }}
          >
            Product Details
          </h1>
        </div>
        <div className="product-details-container">
          <Row gutter={[48, 40]}>{content}</Row>
        </div>
      </div>
      <div style={{ margin: "50px 0" }}>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
          Add a Review
        </h1>
        <Reviews productId={productId} />
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
