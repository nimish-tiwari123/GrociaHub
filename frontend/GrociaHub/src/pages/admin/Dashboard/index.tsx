import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaBoxOpen, FaTags, FaShoppingCart, FaUsers } from "react-icons/fa";
import Card from "./Card";
import "./style.css";
import BarChart from "./Chart/BarChart";
import OrderDetailsChart from "./Chart/OrderDetailsChart";

const Dashboard: React.FC = () => {
  return (
    <Container fluid>
      <Row className="my-2">
        <h1 className="fw-bold fs-2 m-0">Dashboard</h1>
        <p className="opacity-50">Welcome to GrociaHub Dashboard</p>
      </Row>
      <Row>
        <Col md={3}>
          <Card
            icon={<FaBoxOpen size={25} />}
            heading="4,982"
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
            heading="4,981"
            subHeading="Total Users"
          />
        </Col>
      </Row>
      <Row>
        <Col md={7}>
          <BarChart />
        </Col>
        <Col md={5}>
        <OrderDetailsChart/>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
