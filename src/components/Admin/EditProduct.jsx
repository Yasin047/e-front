import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateProductMutation } from "../../features/productSlice";
import Loading from "../utils/Loading";
import Sidebar from "./Sidebar";

const { TextArea } = Input;

const EditProduct = () => {
  const product = useSelector((state) => state.product.product);

  const [updateProduct, { isLoading, data, isSuccess, isError, error }] =
    useUpdateProductMutation();

  const [images, setImages] = useState([]);
  const [input, setInput] = useState({
    productName: "",
    discountPrice: "",
    productPrice: "",
    productDescription: "",
    productStock: "",
    productCategory: "",
  });

  useEffect(() => {
    if (product._id) {
      const {
        _id,
        productName,
        discountPrice,
        productPrice,
        productDescription,
        productStock,
        productCategory,
      } = product;
      setInput({
        _id,
        productName,
        discountPrice,
        productPrice,
        productDescription,
        productStock,
        productCategory,
      });
    }
  }, [product]);

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", input.productName);
    formData.append("discountPrice", input.discountPrice);
    formData.append("productPrice", input.productPrice);
    formData.append("productDescription", input.productDescription);
    formData.append("productStock", input.productStock);
    formData.append("productCategory", input.productCategory);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    if (product._id) {
      formData.append("_id", product._id);
      await updateProduct(formData);
    }
    // setInput({
    //   productName: "",
    //   discountPrice: "",
    //   productPrice: "",
    //   productDescription: "",
    //   productStock: "",
    //  productCategory:""
    // });
  };
  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const props = {
    beforeUpload: (file) => {
      setImages([...images, file]);
      return false;
    },
  };

  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isSuccess) {
    content = <p>{data?.message}</p>;
  } else if (isError) {
    content = <p>{error?.data.message}</p>;
  }

  return (
    <div>
      <div className="order-main">
        <Sidebar />
        <div className="all-order">
          <Row style={{ marginTop: "10px" }}>
            <Col
              style={{ margin: "0 auto" }}
              xs={{ span: 20 }}
              sm={{ span: 18 }}
              md={{ span: 14 }}
              xl={{ span: 10 }}
            >
              <h2>EDIT PRODUCT</h2>
              {content && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <h3>{content}</h3>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Input
                  name="productName"
                  onChange={handleChange}
                  placeholder="Product Name"
                  value={input.productName}
                />
                <Input
                  name="discountPrice"
                  onChange={handleChange}
                  placeholder="Discount Percent *optional"
                  value={input.discountPrice}
                />
                <Input
                  name="productPrice"
                  onChange={handleChange}
                  placeholder="Product Price"
                  value={input.productPrice}
                />
                <TextArea
                  name="productDescription"
                  onChange={handleChange}
                  value={input.productDescription}
                  rows={4}
                  placeholder="Product Description"
                />
                <Input
                  name="productCategory"
                  onChange={handleChange}
                  placeholder="Product Category"
                  value={input.productCategory}
                />
                <Input
                  name="productStock"
                  value={input.productStock}
                  onChange={handleChange}
                  placeholder="Stock"
                />
                <Upload multiple {...props}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                  style={{ width: "100%" }}
                  onClick={handleClick}
                  htmlType="submit"
                  type="primary"
                >
                  EDIT PRODUCT
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
