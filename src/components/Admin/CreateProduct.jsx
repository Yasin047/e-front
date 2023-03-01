import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Upload } from "antd";
import React, { useState } from "react";
import { useCreateProductMutation } from "../../features/productSlice";
import Loading from "../utils/Loading";
import Sidebar from "./Sidebar";

const { TextArea } = Input;

const CreateProduct = () => {
  const [
    createProduct,
    {
      isLoading: createLoading,
      data: createData,
      isSuccess: createIsSuccess,
      isError: createIsError,
      error: createError,
    },
  ] = useCreateProductMutation();

  const [images, setImages] = useState([]);
  const [input, setInput] = useState({
    productName: "",
    discountPrice: "",
    productPrice: "",
    productDescription: "",
    productStock: "",
    productCategory: "",
  });

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

    await createProduct(formData);
    setInput({
      productName: "",
      discountPrice: "",
      productPrice: "",
      productDescription: "",
      productStock: "",
      productCategory: "",
    });
    setImages([]);
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
    onRemove: (file) => {
      const index = images.indexOf(file);
      const newFileList = images.slice();
      newFileList.splice(index, 1);
      setImages(newFileList);
    },
    beforeUpload: (file) => {
      setImages([...images, file]);
      return false;
    },
    fileList: images,
  };

  let content;
  if (createLoading) {
    content = <Loading />;
  }
  if (createIsSuccess) {
    content = <p>{createData?.message}</p>;
  } else if (createIsError) {
    content = <p>{createError?.data}</p>;
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
              <h2>CREATE PRODUCT</h2>
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
                  ADD PRODUCT
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
