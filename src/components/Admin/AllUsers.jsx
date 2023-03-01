import { Button, Select, Table } from "antd";
import { useEffect, useState } from "react";
import {
  useGetAllUserQuery,
  useUserDeleteMutation,
  useUserRoleMutation,
} from "../../features/userSlice";
import Loading from "../utils/Loading";
import Sidebar from "./Sidebar";

const AllUser = () => {
  const [totalData, setTotalData] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [role, setRole] = useState("");

  const {
    isLoading: getLoading,
    data: getData,
    isSuccess: getIsSuccess,
    isError: getIsError,
    error: getError,
  } = useGetAllUserQuery(pageNumber);
  const [
    userDelete,
    {
      isLoading: deleteLoading,
      data: deleteData,
      isSuccess: deleteIsSuccess,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useUserDeleteMutation();
  const [userUpdate, { isLoading, data, isSuccess, isError, error }] =
    useUserRoleMutation();
  const { allUser, totalUser } = getData || {};

  useEffect(() => {
    setTotalData(totalUser);
  }, [totalUser]);

  const handleRemoveItem = async ({ _id }) => {
    await userDelete({ _id });
  };
  const onChange = (value) => {
    setRole(value);
  };
  const handleClick = async ({ _id }) => {
    await userUpdate({ _id, role });
  };
  const columns = [
    { title: "Id", dataIndex: "_id", key: "_id", width: 210 },
    { title: "Email", dataIndex: "email", key: "email", width: 210 },
    { title: "Name", dataIndex: "name", key: "name", width: 210 },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (role) => (
        <>
          <Select
            style={{ width: "100%" }}
            defaultValue={role}
            onChange={onChange}
            options={[
              {
                value: "admin",
                label: "Admin",
              },
              {
                value: "user",
                label: "User",
              },
            ]}
          />
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 150,
      render: (_id, record) => (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Button type="primary" onClick={() => handleClick({ _id })}>
              Update Role
            </Button>
            <Button
              style={{ minWidth: "100%" }}
              type="primary"
              danger
              onClick={() => handleRemoveItem({ _id })}
            >
              Delete User
            </Button>
            {/* {JSON.stringify(record)} */}
          </div>
        </>
      ),
    },
  ];

  let content;
  if (getLoading || deleteLoading || isLoading) {
    content = <Loading />;
  } else if (getIsError || deleteIsError || isError) {
    content = (
      <p>
        {getIsError
          ? getError?.data?.message
          : deleteIsError
          ? deleteError?.data?.message
          : error?.data?.message}
      </p>
    );
  } else if (deleteIsSuccess || isSuccess) {
    content = <p>{deleteIsSuccess ? deleteData?.message : data?.message}</p>;
  }

  return (
    <>
      <div className="order-main">
        <Sidebar />
        <div className="all-order">
          <h2>ALL USER</h2>
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
                dataSource={allUser?.map((item) => item)}
                scroll={{ x: true, y: true }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default AllUser;
