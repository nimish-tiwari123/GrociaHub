import { Container, Row, Col } from "react-bootstrap";

import "./style.css";
const Header = () => {
  return (
    <Container fluid className="header-container-img p-0">
     <div className="header-container">
     <Row className="h-100 w-100 m-0 bg-img-hero">
        <Col md={6}>
          <div className="h-100 d-flex flex-column justify-content-center gap-3 px-3 px-lg-5 mx-lg-5 custom-w-75">
            <h1 className="fw-bold text-Vdark display-5 text-shadow mt-heading">
              Don’t miss our daily amazing deals.
            </h1>
            <p className="fs-5 opacity-75">
              Save up to 60% off on your first order
            </p>
            <div className="d-flex w-100">
              <input
                type="text"
                placeholder="Enter your email address"
                className="bg-white border-0 input-focus py-2 py-lg-3 px-3 w-100 rounded-start"
              />
              <button className="bg-custom-primary border-0 text-light px-2 px-lg-3  rounded-end fw-medium">
                Subscribe
              </button>
            </div>
          </div>
        </Col>
      </Row>
     </div>
    </Container>
  );
};

export default Header;
