import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { redirectAdminRoutes } from "../../routes/admin/adminRoutesConstants";
import "./style.css";

interface Product {
  productImg: string;
  name: string;
  category: string;
}

interface Offer {
  title: string;
  status: boolean;
  description: string;
  discountType: string;
  discountValue: string;
  startDate: string;
  endDate: string;
  products: Product[]; 
}

interface OfferModalProps {
  show: boolean;
  handleClose: () => void;
  offer: Offer;
}

const OfferModal: React.FC<OfferModalProps> = ({ show, handleClose, offer }) => {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Offer View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <div className="mt-2">
            <h2 className="fs-4 fw-bold">{offer.title}</h2>
            <h5 className="opacity-75 fs-6 fw-medium mt-2">
              {offer.status ? (
                <span className="bg-success-subtle rounded-pill text-success py-1 px-3 fw-medium fs-7">
                  Active
                </span>
              ) : (
                <span className="bg-danger-subtle rounded-pill text-danger py-1 px-3 fw-medium fs-7">
                  Not Active
                </span>
              )}
            </h5>
            <p className="opacity-75 fs-7 mt-3">{offer.description}</p>
            <Row>
              <Col md={6}>
                <div className="my-2">
                  Discount Type:
                  <span className="fw-bold"> {offer.discountType}</span>
                </div>
                <div className="my-2">
                  Discount Value:
                  <span className="fw-bold"> {offer.discountValue}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="my-2">
                  Start Date:
                  <span className="fw-bold"> {offer.startDate}</span>
                </div>
                <div className="my-2">
                  End Date:
                  <span className="fw-bold"> {offer.endDate}</span>
                </div>
              </Col>
            </Row>
            <h3 className="fs-4 mt-4 mb-2 fw-bold">Offer Products</h3>
            <Row className="mb-4 ps-3">
              {offer.products.map((item, index) => (
                <Col md={6} lg={4} key={index}>
                  <Row className="offer-products-container p-2 w-100 rounded">
                    <Col className="col-5">
                      <img
                        src={item.productImg}
                        alt={`${item.name} Image`}
                        className="w-100"
                      />
                    </Col>
                    <Col className="col-7 d-flex justify-content-center flex-column">
                      <div>
                        <h5 className="fw-bold m-0">{item.name}</h5>
                        <p className="m-0 opacity-75">{item.category}</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={() =>
            navigate(redirectAdminRoutes.productManagement.edit)
          }
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OfferModal;
