import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { userRoutesConstants } from "../../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { redirectAdminRoutes } from "../../../../routes/admin/adminRoutesConstants";
import { Table } from "react-bootstrap";
import { Button } from "../../../../components/common";
import jsPDF from "jspdf";
import { FaRegFilePdf } from "react-icons/fa6";
import "./style.css";

const ViewOrder: React.FC = () => {
  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4", // Ensure A4 page format
    });

    doc.html(document.getElementById("order-details")!, {
      callback: function (doc) {
        doc.save("OrderDetails.pdf");
      },
      x: 10,
      y: 10,
      width: 190, // Fit content within page width
      windowWidth: 900, // Match your page container width
    });
  };

  return (
    <Container
      fluid
      className="main-OfferManagement-container dash-container px-2 px-md-4"
    >
      <Row className="my-2">
        <Col md={5} className="d-flex align-items-center mt-3 mt-md-0">
          <Link
            to={userRoutesConstants.home}
            className="text-decoration-none text-custom-primary d-md-none"
          >
            <IoIosArrowRoundBack size={28} className="me-2" />
          </Link>
          <h1 className="fw-bold fs-3 m-0 mt-md-3">View Order</h1>
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
          <Link
            to={redirectAdminRoutes.orderManagement.viewAllOrders}
            className="text-decoration-none text-custom-primary"
          >
            Order Management
          </Link>
          <span> | </span>
          <span>View Order</span>
        </Col>
      </Row>
      <div className="order-details-container bg-white p-4 rounded-4 shadow-sm">
        <div className="details-card" id="order-details">
          <div className="section">
            <div className="d-flex justify-content-between">
              <h5 className="fw-bold">Customer Details</h5>
              <button
                className="border shadow-sm bg-white text-custom-primary rounded-pill py-2 px-3 fw-medium"
                onClick={handleDownload}
              >
                <FaRegFilePdf /> Download
              </button>
            </div>
            <p>
              <span className="opacity-75">Full Name:</span>{" "}
              <span className="fw-bold"> Nimish Obroy</span>
            </p>
            <p>
              <span className="opacity-75">Email Address:</span>{" "}
              <span className="fw-bold"> nimishOb2022@gmail.com</span>
            </p>
            <p>
              <span className="opacity-75">Mobile Number:</span>{" "}
              <span className="fw-bold"> +91 8877990011</span>
            </p>
            <p>
              <span className="opacity-75">Delivery Address:</span>{" "}
              <span className="fw-bold">
                {" "}
                Narmada Colony, Khategaon, Dewas (M.P.)
              </span>
            </p>
          </div>

          <div className="section">
            <h5 className="fw-bold">Order Details</h5>
            <p>
              <span className="opacity-75">Order ID:</span>{" "}
              <span className="fw-bold"> 786545thiDrtYUI</span>
            </p>
            <p>
              <span className="opacity-75">Order Date:</span>{" "}
              <span className="fw-bold"> 22/07/2025</span>
            </p>
            <p>
              <span className="opacity-75"> Order Status:</span>
              <span className="status-completed">● Completed</span>
            </p>
            <p>
              <span className="opacity-75">Total Amount:</span>{" "}
              <span className="fw-bold"> ₹6000</span>
            </p>
          </div>

          <div className="section">
            <h5 className="fw-bold">Product Details</h5>
            <Table responsive="sm" bordered>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price (Per Item)</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Oranges</td>
                  <td>02</td>
                  <td>₹500</td>
                  <td>₹1000</td>
                </tr>
                <tr>
                  <td>Apple</td>
                  <td>01</td>
                  <td>₹300</td>
                  <td>₹300</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        <div className="actions d-flex justify-content-end">
          <button className="me-3 border rounded p-2 bg-secondary-subtle fw-medium">
            Cancel Order
          </button>
          <Button
            btnLabel="Update Status"
            btnStyle="bg-custom-primary border-0 text-light fw-medium rounded p-2 "
          />
        </div>
      </div>
    </Container>
  );
};

export default ViewOrder;
