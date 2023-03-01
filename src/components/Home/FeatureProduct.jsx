import { Col, Rate, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../../features/productSlice";
import Loading from "../utils/Loading";
const FeatureProduct = () => {
  const { isLoading, data, isSuccess, isError, error } = useGetProductQuery({});
  const { getProduct } = data || {};

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content =
      getProduct.length > 0
        ? getProduct?.map((item) => {
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
                      <div>
                        <Rate
                          disabled
                          allowHalf
                          value={item.ratings}
                          style={{
                            fontSize: "14px",
                            color: "rgb(236, 101, 11)",
                          }}
                        />
                      </div>
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
        : "Product not found...";
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        <span
          style={{
            borderBottom: "3px solid gray",
            fontWeight: "bold",
          }}
        >
          Featured Product
        </span>
      </h1>
      <div className="feature-main">
        <Row gutter={[16, 16]}>{content}</Row>
      </div>
    </div>
  );
};

export default FeatureProduct;
