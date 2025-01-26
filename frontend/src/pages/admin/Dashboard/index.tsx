import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaBoxOpen, FaTags, FaShoppingCart, FaUsers } from "react-icons/fa";
import Card from "./Card";
import BarChart from "./Chart/BarChart";
import OrderDetailsChart from "./Chart/OrderDetailsChart";
import {CustomTable,Loader} from "../../../components/common";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { useGetDashboardCountsQuery } from "../../../api/adminService";
import {  } from "../../../components/common";
import "./style.css";

const Dashboard: React.FC = () => {
  const {data : dashboardCounts, isLoading} = useGetDashboardCountsQuery("");
 
  const columns = [
    { key: "id", header: "S. No.", type: "text" },
    { key: "customerName", header: "Customer Name", type: "text" },
    { key: "orderId", header: "Order Id", type: "text" },
    { key: "orderDate", header: "Order Date", type: "text" },
    { key: "totalAmount", header: "Total Amount", type: "text" },
    {
      key: "orderStatus",
      header: "Order Status",
      type: "status",
      statusStyles: (status: string) => {
        let buttonClass = "";
        let buttonText = "";

        switch (status) {
          case "Pending":
            buttonClass = "status-warning-btn";
            buttonText = "Pending";
            break;
          case "Completed":
            buttonClass = "status-success-btn";
            buttonText = "Completed";
            break;
          case "Cancelled":
            buttonClass = "status-danger-btn";
            buttonText = "Cancelled";
            break;
          default:
            buttonClass = "status-default-btn";
            buttonText = "Unknown";
        }

        return (
          <button
            className={`status-btn ${buttonClass} border-0 py-1 px-3 rounded-pill fw-medium`}
          >
            {buttonText}
          </button>
        );
      },
    },
  ];

  const data = [
    {
      id: "01",
      customerName: "Sumit Chouhan",
      orderId: "123456CDfbr",
      orderDate: "14/08/2024",
      totalAmount: "₹677",
      orderStatus: "Pending",
    },
    {
      id: "02",
      customerName: "Raja Prajapati",
      orderId: "123456CDfbr",
      orderDate: "14/08/2024",
      totalAmount: "₹789",
      orderStatus: "Completed",
    },
    {
      id: "03",
      customerName: "Aavesh Khanna",
      orderId: "123456CDfbr",
      orderDate: "14/08/2024",
      totalAmount: "₹999",
      orderStatus: "Cancelled",
    },
    {
      id: "04",
      customerName: "Sapna Trivedi",
      orderId: "123456CDfbr",
      orderDate: "14/08/2024",
      totalAmount: "₹125",
      orderStatus: "Pending",
    },
  ];

  return (
    <Container
      fluid
      className="main-dashboard-container overflow-auto px-2 px-md-4"
    >
      {isLoading && <Loader/>}
      <Row className="my-2">
        <Col md={5}>
          <h1 className="fw-bold fs-3 m-0 mt-3">
            <Link
              to={userRoutesConstants.home}
              className="text-decoration-none text-custom-primary d-md-none"
            >
              <IoIosArrowRoundBack size={28} className="me-2" />
            </Link>
            <h1 className="fw-bold fs-3 m-0 mt-3">Dashboard</h1>
            <p className="opacity-50 fs-6 fw-medium">Welcome to GrociaHub Dashboard</p>
          </h1>
        </Col>
        <Col
          md={7}
          className="d-md-flex align-items-center justify-content-end gap-lg-2 gap-md-1 d-none"
        >
          <Link
            to={userRoutesConstants.home}
            className="text-decoration-none text-custom-primary"
          >
            Home
          </Link>
          <span> | </span>
          <span>Dashboard</span>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Card
            icon={<FaBoxOpen size={25} />}
            heading={dashboardCounts?.counts?.productsCount}
            subHeading="Total Products"
          />
        </Col>
        <Col md={3}>
          <Card
            icon={<FaTags size={25} />}
            heading="482"
            subHeading="Active Offers & Discounts"
          />
        </Col>
        <Col md={3}>
          <Card
            icon={<FaShoppingCart size={25} />}
            heading="8,890"
            subHeading="Orders Today"
          />
        </Col>
        <Col md={3}>
          <Card
            icon={<FaUsers size={25} />}
           heading={dashboardCounts?.counts?.usersCount}

            subHeading="Total Users"
          />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <BarChart />
        </Col>
        <Col md={4}>
          <OrderDetailsChart />
        </Col>
      </Row>
    
    </Container>
  );
};

export default Dashboard;
