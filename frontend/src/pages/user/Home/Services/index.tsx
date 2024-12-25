import { Container, Row, Col } from "react-bootstrap";
import { IoIosPricetags } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
const Services = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col lg={4} className="my-3">
          <Row className="px-2 px-md-4">
            <Col className="col-3">
              <IoIosPricetags size={60} className="text-custom-primary" />
            </Col>
            <Col className="col-9">
              <div className="fs-5 fw-medium">Best Prices & Deals</div>
              <div className="fs-6 opacity-50">
                Don’t miss our daily amazing deals and prices
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={4} className="my-3">
          <Row className="px-2 px-md-4">
            <Col className="col-3">
              <RiRefund2Line size={60} className="text-custom-primary" />
            </Col>
            <Col className="col-9">
              <div className="fs-5 fw-medium">Refundable </div>
              <div className="fs-6 opacity-50">
                If your items have damage we agree to refund it
              </div>
            </Col>
          </Row>
        </Col>{" "}
        <Col lg={4} className="my-3">
          <Row className="px-2 px-md-4">
            <Col className="col-3">
              <TbTruckDelivery size={60} className="text-custom-primary" />
            </Col>
            <Col className="col-9">
              <div className="fs-5 fw-medium">Free delivery</div>
              <div className="fs-6 opacity-50">
                Do purchase over $50 and get free delivery anywhere
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
