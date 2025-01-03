import React, { useState } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { redirectAdminRoutes } from "../../routes/admin/adminRoutesConstants";

interface Product {
  _id: string;
  id: string;
  name: string;
  category: {
    name: string;
  };
  index: string;
  product: string;
  images: string [];
  price: string;
  stock: string;
  isActive: Boolean;
  createdAt: string;
  quantity: string;
  status: Boolean;
  description: string;
  discount: string;
}

interface ProductModalProps {
  show: boolean;
  handleClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  show,
  handleClose,
  product,
}) => {
  const [mainImage, setMainImage] = useState(product?.images[0]);
  const navigate = useNavigate();
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Product View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col md={5}>
              <img
                src={mainImage}
                alt={product?.name}
                className="rounded border w-100"
              />
              <div className="d-flex mt-3 justify-content-between">
                {product?.images?.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name}-${index}`}
                    style={{
                      width: "88px",
                      height: "88px",
                    }}
                    className={`cursor-pointer rounded ${
                      mainImage == product.images[index]
                        ? `success-border`
                        : `border`
                    }`}
                    onClick={() => setMainImage(product.images[index])}
                  />
                ))}
              </div>
            </Col>
            <Col md={7}>
              <div className="mt-2">
                <h2 className="fs-4 fw-bold">{product?.name}</h2>
                <h5 className="opacity-75 fs-6 fw-medium">
                  {product?.category?.name}
                </h5>
                <p className="opacity-75 fs-7">{product?.description}</p>
                <div className="d-flex align-items-center">
                  <h5 className="me-2 text-muted text-decoration-line-through fs-6 opacity-75">
                    ₹{product?.price}
                  </h5>
                  <h5 className="text-success fw-bold">₹{product?.discount}</h5>
                </div>
                <div className="d-flex justify-content-between flex-wrap">
                  <p>
                    Stock Quantity:
                    <span className="fw-bold"> {product?.quantity}</span>
                  </p>
                  <p>
                    Created at:
                    <span className="fw-bold"> {product?.createdAt}</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={() => navigate(redirectAdminRoutes.productManagement.edit)}
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
