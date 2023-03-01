import { Button, Col, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../features/productSlice";
import { setProduct } from "../../features/setProductSlice";
import Loading from "../utils/Loading";
import Sidebar from "./Sidebar";

const AllProducts = () => {
  const [totalData, setTotalData] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoading: getLoading,
    data: getData,
    isSuccess: getIsSuccess,
    isError: getIsError,
    error: getError,
  } = useGetAllProductQuery(pageNumber);
  const [
    deleteProduct,
    {
      isLoading: deleteLoading,
      data: deleteData,
      isSuccess: deleteIsSuccess,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteProductMutation();

  const { allProduct, totalProduct } = getData || {};

  useEffect(() => {
    setTotalData(totalProduct);
  }, [totalProduct]);

  const handleRemoveItem = ({ _id }) => {
    deleteProduct({ _id });
  };
  const handleEditItem = (item) => {
    dispatch(setProduct(item));
    Navigate("/admin/edit-product");
  };

  let content;
  if (getLoading || deleteLoading) {
    content = <Loading />;
  } else if (getIsError || deleteIsError) {
    content = (
      <p>{getIsError ? getError?.data.message : deleteError?.data.message}</p>
    );
  } else if (deleteIsSuccess) {
    content = <p>{deleteData?.message}</p>;
  }
  return (
    <>
      <div className="order-main">
        <Sidebar />
        <div className="all-order">
          <h2>ALL PRODUCT</h2>
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
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#3DB67E",
              padding: "15px",
            }}
          >
            <Col xs={10} sm={7} md={7} lg={7} xl={7} xxl={7}>
              <div
                style={{
                  textAlign: "start",
                }}
                className="admin-font-head"
              >
                Product ID
              </div>
            </Col>
            <Col xs={3} sm={4} md={4} lg={4} xl={4} xxl={4}>
              <div className="admin-font-head">Name</div>
            </Col>
            <Col xs={3} sm={4} md={4} lg={4} xl={4} xxl={4}>
              <div className="admin-font-head">Stock</div>
            </Col>
            <Col xs={2} sm={4} md={4} lg={4} xl={4} xxl={4}>
              <div className="admin-font-head">Price</div>
            </Col>
            <Col xs={6} sm={5} md={5} lg={5} xl={5} xxl={5}>
              <div
                style={{
                  textAlign: "center",
                }}
                className="admin-font-head"
              >
                Actions
              </div>
            </Col>
          </Row>
          {getIsSuccess
            ? allProduct?.map((item) => {
                const { _id } = item;
                return (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "15px",
                      borderBottom: "1px solid rgb(233, 229, 229",
                    }}
                    key={item._id}
                  >
                    <Col xs={10} sm={7} md={7} lg={7} xl={7} xxl={7}>
                      <div
                        className="product-id"
                        style={{
                          textAlign: "start",
                        }}
                      >
                        {item._id}
                      </div>
                    </Col>
                    <Col xs={3} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <div className="admin-font">{item.productName}</div>
                    </Col>
                    <Col xs={3} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <div
                        style={{
                          marginLeft: "8px",
                        }}
                        className="admin-font"
                      >
                        {item.productStock}
                      </div>
                    </Col>
                    <Col xs={2} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <div
                        style={{
                          marginLeft: "5px",
                        }}
                        className="admin-font"
                      >
                        {item.productPrice}
                      </div>
                    </Col>
                    <Col xs={6} sm={5} md={5} lg={5} xl={5} xxl={5}>
                      <div
                        style={{
                          textAlign: "end",
                        }}
                        className="admin-font"
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "7px",
                          }}
                        >
                          <Button
                            style={{ width: "80%" }}
                            type="primary"
                            onClick={() => handleEditItem(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            style={{ width: "80%" }}
                            type="primary"
                            danger
                            onClick={() => handleRemoveItem({ _id })}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                );
              })
            : ""}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "19px 0",
            }}
          >
            <Pagination
              pageSize={10}
              total={totalData}
              onChange={(page) => setPageNumber(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
