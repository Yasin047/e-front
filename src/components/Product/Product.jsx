import { Col, Pagination, Rate, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../../features/productSlice";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Navbar from "../Home/Navbar";
import Loading from "../utils/Loading";
const Product = () => {
  const key = useSelector((state) => state.key.key);
  const [productCategory, setProductCategory] = useState("");
  const [product, setProduct] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, isSuccess, isError, error } = useGetProductQuery({
    pageNumber,
    key,
    productCategory,
  });

  const { getProduct, totalProduct } = data || {};
  useEffect(() => {
    setProduct(totalProduct);
  }, [totalProduct]);

  const category = getProduct?.map((item) => {
    return item.productCategory;
  });

  const newCategory = [...new Set(category)];
  const options = [];
  newCategory.forEach((item) => {
    options.push({
      value: item,
      label: item.toUpperCase(),
    });
  });
  let content;
  let loading;
  if (isLoading) {
    loading = <Loading />;
  }
  if (isSuccess) {
    content =
      getProduct.length > 0 ? (
        getProduct?.map((item) => {
          return (
            <Col key={item._id} xs={12} sm={8} md={8} lg={6} xl={6} xxl={4}>
              <div className="product-inner">
                <Link to={`/product/${item._id}`}>
                  <div className="product-img">
                    <img key={item._id} src={item.images[0].url[0]} alt="" />
                  </div>
                  <div className="product-name">{item.productName}</div>
                  <div className="product-reviews">
                    ({item.numberOfReviews} Reviews)
                  </div>
                  <div className="product-rating">
                    <Rate
                      disabled
                      allowHalf
                      value={item.ratings}
                      style={{ fontSize: "14px", color: "rgb(236, 101, 11)" }}
                    />
                  </div>
                  {item.discountPrice >= 1 ? (
                    <div className="product-discount">
                      {item.discountPrice}% discount
                    </div>
                  ) : null}
                  <div className="product-price">${item.productPrice}</div>
                </Link>
              </div>
            </Col>
          );
        })
      ) : (
        <div style={{ margin: "0 auto" }}>
          <h2>No product found...</h2>
        </div>
      );
  } else if (isError) {
    content = <p>{error}</p>;
  }
  const onChange = (value) => {
    setProductCategory(value);
  };

  return (
    <>
      <Header />
      <Navbar />
      <div
        className="product-category"
        style={{
          width: "90%",
          margin: "0 auto",
          padding: "20px 0",
        }}
      >
        <Row>
          <Col
            style={{ margin: "0 auto" }}
            xs={18}
            sm={14}
            md={12}
            lg={12}
            xl={10}
            xxl={8}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontWeight: "bold",
                  padding: "5px 0",
                }}
              >
                CHOOSE CATEGORIES
              </h2>
              <Select
                style={{ width: "100%" }}
                placeholder="Select a category"
                onChange={onChange}
                mode="tags"
                options={options}
              />
            </div>
          </Col>
        </Row>
      </div>
      {loading}
      <div className="product-inner-container">
        <Row gutter={[16, 16]}>{content}</Row>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "19px 0",
        }}
      >
        <Pagination
          pageSize={20}
          total={product}
          onChange={(page) => setPageNumber(page)}
        />
      </div>
      <Footer />
    </>
  );
};

export default Product;
