import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAdminAllOrderQuery } from "../../features/orderSlice";
import Loading from "../utils/Loading";
import Sidebar from "./Sidebar";

const AllOrders = () => {
  const Navigate = useNavigate();
  const [totalData, setTotalData] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    isLoading: getLoading,
    data: getData,
    isSuccess: getIsSuccess,
    isError: getIsError,
    error: getError,
  } = useGetAdminAllOrderQuery(pageNumber);

  const { orders, totalOrder } = getData || {};

  useEffect(() => {
    setTotalData(totalOrder);
  }, [totalOrder]);

  const columns = [
    { title: "Order Id", dataIndex: "_id", key: "_id", width: 210 },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: 210,
    },
    {
      title: "Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      width: 150,
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      width: 150,
      render: (_id) => (
        <>
          <Button
            type="primary"
            danger
            onClick={() => Navigate(`/admin/all-order/${_id}`)}
          >
            View Order
          </Button>
        </>
      ),
    },
  ];

  let content;
  if (getLoading) {
    content = <Loading />;
  } else if (getIsError) {
    content = <p>{getError?.data.message}</p>;
  }
  return (
    <>
      <div className="order-main">
        <Sidebar />
        <div className="all-order">
          <h2>ALL ORDER</h2>
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
                dataSource={orders?.map((item, _id) => item)}
                scroll={{ x: true, y: false }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
