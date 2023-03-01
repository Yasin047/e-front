import { Col, Row } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend as chartLegend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip as chartTooltip,
} from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useGetAdminAllOrderQuery } from "../../features/orderSlice";
import { useGetAllProductQuery } from "../../features/productSlice";
import {
  useGetAllUserQuery,
  useGetWeeklyIncomeQuery,
  useGetWeeklyUserQuery,
} from "../../features/userSlice";
import Loading from "../utils/Loading";
import Sidebar from "./Sidebar";
ChartJS.register(
  ArcElement,
  chartTooltip,
  chartLegend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const {
    isLoading: getProductLoading,
    data: getProductData,
    isError: getProductIsError,
    error: getProductError,
  } = useGetAllProductQuery();

  const {
    isLoading: getOrderLoading,
    data: getOrderData,
    isError: getOrderIsError,
    error: getOrderError,
  } = useGetAdminAllOrderQuery();

  const {
    isLoading: getUserLoading,
    data: getUserData,
    isError: getUserIsError,
    error: getUserError,
  } = useGetAllUserQuery();

  const { allUser } = getUserData || {};
  const { orders } = getOrderData || {};
  const { allProduct } = getProductData || {};

  const productStock = allProduct?.map((item) => item.productStock);
  const totalProduct = productStock?.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  const earning = orders?.map((item) => item.totalPrice);

  const totalEarning = earning?.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  let content;
  if (getProductLoading || getOrderLoading || getUserLoading) {
    content = <Loading />;
  } else if (getProductIsError || getOrderIsError || getUserIsError) {
    content = (
      <p>
        {getProductIsError
          ? getProductError?.data?.message
          : getOrderIsError
          ? getOrderError?.data?.message
          : getUserError?.data?.message}
      </p>
    );
  }

  let outOfStock = 0;
  allProduct &&
    allProduct?.forEach((item) => {
      if (item.productStock === 0) {
        outOfStock += 1;
      }
    });

  const data = {
    labels: ["InStock", "Out of Stock"],
    datasets: [
      {
        data: [totalProduct - outOfStock, outOfStock],
        backgroundColor: ["#6800B4", "#00A6B4"],
        hoverBackgroundColor: ["#35014F", "#4B5000"],
      },
    ],
  };

  const { data: getWeeklyUsers } = useGetWeeklyUserQuery();

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }

  const { info } = getWeeklyUsers || {};
  const items = info?.map((item) => {
    return item;
  });

  const array = items?.sort(compare);
  const newData = array?.map((item) => {
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      days: DAYS[item._id - 1],
      user: item.total,
    };
  });

  const { data: incomeData } = useGetWeeklyIncomeQuery();

  const { incomeInfo } = incomeData || {};
  const incomeItem = incomeInfo?.map((item) => {
    return item;
  });

  const arrayOfIcome = incomeItem?.sort(compare);
  const incomeStatData = arrayOfIcome?.map((item) => {
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      days: DAYS[item._id - 1],
      sales: item.total,
    };
  });

  const Navigate = useNavigate();
  return (
    <div style={{ background: "#202533" }} className="order-main">
      <Sidebar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Dashboard</h2>
        <div
          style={{
            background: "#3DB67E",
            color: "white",
            padding: "15px",
            marginTop: "15px",
            width: "100%",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <span>Total Earning</span>
          <div>${totalEarning}</div>
        </div>
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
        <Row gutter={[16, 16]} className="dashboard-circle">
          <Col>
            <div
              className="dashboard-item"
              style={{
                background: "red",
              }}
              onClick={() => Navigate("/admin/all-product")}
            >
              <div>Product</div>
              <div>{totalProduct}</div>
            </div>
          </Col>
          <Col>
            <div
              className="dashboard-item"
              style={{
                background: "rgb(50, 189, 142)",
              }}
              onClick={() => Navigate("/admin/all-order")}
            >
              <div>Orders</div>
              <div>{orders?.length}</div>
            </div>
          </Col>
          <Col>
            <div
              className="dashboard-item"
              style={{
                background: "black",
              }}
              onClick={() => Navigate("/admin/all-user")}
            >
              <div>
                <div>Users</div>
                <div>{allUser?.length}</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2%",
            margin: "50px 0 ",
            padding: "30px 0",
          }}
        >
          <Col
            style={{
              border: "1px solid white",
              maxHeight: "430px",
              padding: "10px",
              margin: "2% 0",
            }}
            xs={24}
            sm={24}
            md={22}
            lg={18}
            xl={11}
          >
            <div className="bar-chart">
              <h2 style={{ color: "white" }}>Last 7days Sales</h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeStatData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="days" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
          <Col
            style={{
              border: "1px solid white",
              maxHeight: "430px",
              padding: "10px",
              margin: "2% 0",
            }}
            xs={24}
            sm={24}
            md={22}
            lg={18}
            xl={11}
          >
            <div className="bar-chart">
              <h2 style={{ color: "white" }}>Last 7days Traffic</h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={newData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="days" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="user"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>

        <div className="doughnut">
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
