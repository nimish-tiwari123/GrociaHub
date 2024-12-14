import { Container, Row, Col } from "react-bootstrap";

import "./style.css";
const Header = () => {
  return (
    <Container fluid className="header-container">
      <Row className="h-100">
        <Col md={6}>
          <Container className="h-100 d-flex flex-column justify-content-center gap-3 ps-5 ms-5 w-75">
            <h1 className="fw-bold text-Vdark display-5">
              Don’t miss our daily amazing deals.
            </h1>
            <p className="fs-5 opacity-75">
              Save up to 60% off on your first order
            </p>
            <div className="d-flex w-100">
              <input
                type="text"
                placeholder="Enter your email address"
                className="bg-white border-0 outline fs-7 py-3 px-3 w-100"
              />
              <button className="bg-custom-primary border-0 text-light px-3">
                Subscribe
              </button>
            </div>
          </Container>
        </Col>
        <Col md={6} className="bg-img-hero"></Col>
      </Row>
    </Container>
  );
};

export default Header;
