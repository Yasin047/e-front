import { Button, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserAllOrderQuery } from "../../features/orderSlice";
import Loading from "../utils/Loading";

const ViewUserAllOrder = () => {
  const { isLoading, data, isError, error } = useGetUserAllOrderQuery();
  const { orders } = data || {};
  const Navigate = useNavigate();
  const columns = [
    { title: "Order Id", dataIndex: "_id", key: "_id", width: 210 },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: 210,
    },
    {
      title: "Items Qty",
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
            onClick={() => Navigate(`/user/order/${_id}`)}
          >
            View Details
          </Button>
        </>
      ),
    },
  ];
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <p>{error.data.message}</p>;
  }
  return (
    <div>
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
        <Table
          columns={columns}
          dataSource={orders}
          pagination={{
            position: ["bottomCenter"],
          }}
          scroll={{ x: true, y: true }}
        />
      </div>
    </div>
  );
};

export default ViewUserAllOrder;
