import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const Loading = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 34,
      }}
    />
  );
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Loading;
