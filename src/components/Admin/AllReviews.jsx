import { Button, Col, Input, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  useDeleteReviewsMutation,
  useSingleProductAllReviewsAdminQuery,
} from "../../features/reviewSlice";
import Loading from "../utils/Loading";
import Sidebar from "./Sidebar";

const AllReviews = () => {
  const [totalData, setTotalData] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState();

  const {
    isLoading: getIsLoading,
    data: getData,
    isSuccess: getIsSuccess,
    error: getError,
    isError: getIsError,
  } = useSingleProductAllReviewsAdminQuery({ productId, pageNumber });

  const { allReviews } = getData || {};
  const totalReview = allReviews?.reviews.length;

  useEffect(() => {
    setTotalData(totalReview);
  }, [totalReview]);

  const [deleteReviews, { isLoading, data, isSuccess, isError, error }] =
    useDeleteReviewsMutation();

  const handleClick = () => {
    setProductId(search);
  };
  const handleDelete = ({ _id }) => {
    deleteReviews({ productId, _id });
  };
  let content;
  if (getIsLoading || isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <p>{data?.message}</p>;
  } else if (getIsError || isError) {
    content = (
      <p>{getIsError ? getError?.data.message : error?.data.message}</p>
    );
  }
  const columns = [
    { title: "User Id", dataIndex: "user", key: "user", width: 210 },
    { title: "Name", dataIndex: "name", key: "name", width: 210 },
    { title: "Rating", dataIndex: "ratings", key: "ratings", width: 210 },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: 210,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      width: 150,
      render: (_id) => (
        <>
          <Button
            style={{ minWidth: "100%" }}
            type="primary"
            danger
            onClick={() => handleDelete({ _id })}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="order-main">
        <Sidebar />
        <div className="all-order">
          <h2>ALL REVIEW</h2>
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
          <div>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "15px",
              }}
            >
              <Col xs={20} sm={16} md={12}>
                <div style={{ display: "flex" }}>
                  <Input
                    style={{ borderRadius: "0" }}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Product Id"
                  />
                  <div>
                    <Button
                      style={{ borderRadius: "0" }}
                      type="primary"
                      onClick={handleClick}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          {getIsSuccess && (
            <div>
              <Table
                pagination={{
                  pageSize: 10,
                  total: totalData,
                  onChange: (page) => {
                    setPageNumber(page);
                  },
                  position: ["bottomCenter"],
                }}
                columns={columns}
                dataSource={getData?.allReviews?.reviews?.map((item) => item)}
                scroll={{ x: true, y: true }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllReviews;
