import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaBoxOpen, FaTags, FaShoppingCart, FaUsers } from "react-icons/fa";
import Card from "./Card";
import BarChart from "./Chart/BarChart";
import OrderDetailsChart from "./Chart/OrderDetailsChart";
import { Loader } from "../../../components/common";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { useGetDashboardCountsQuery } from "../../../api/adminService";
import "./style.css";

const Dashboard: React.FC = () => {
  const { data: dashboardCounts, isLoading } = useGetDashboardCountsQuery("");


  return (
    <Container
      fluid
      className="main-dashboard-container overflow-auto px-2 px-md-4"
    >
      {isLoading && <Loader />}
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
            <p className="opacity-50 fs-6 fw-medium">
              Welcome to GrociaHub Dashboard
            </p>
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
        <Col md={6} lg={3}>
          <Card
            icon={<FaBoxOpen size={25} />}
            heading={dashboardCounts?.counts?.productsCount}
            subHeading="Total Products"
          />
        </Col>
        <Col md={6} lg={3}>
          <Card
            icon={<FaTags size={25} />}
            heading={dashboardCounts?.counts?.dealsAndOfferCount}
            subHeading="Active Offers"
          />
        </Col>
        <Col md={6} lg={3}>
          <Card
            icon={<FaShoppingCart size={25} />}
            heading={dashboardCounts?.counts?.ordersCount}
            subHeading="Total Orders"
          />
        </Col>
        <Col md={6} lg={3}>
          <Card
            icon={<FaUsers size={25} />}
            heading={dashboardCounts?.counts?.usersCount}
            subHeading="Total Users"
          />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <BarChart />
        </Col>
        <Col lg={4}>
          <OrderDetailsChart />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
