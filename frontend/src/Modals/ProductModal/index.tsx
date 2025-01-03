import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { redirectAdminRoutes } from "../../routes/admin/adminRoutesConstants";
import { useViewProductByIdQuery } from "../../api/adminService";
import { Loader } from "../../components/common";

interface ProductModalProps {
  show: boolean;
  handleClose: () => void;
  productId: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
  show,
  handleClose,
  productId,
}) => {
  const { data, isLoading } = useViewProductByIdQuery(productId);
  console.log(data?.product);
  const [mainImage, setMainImage] = useState(data?.product?.images[0]);
  useEffect(() => {
    setMainImage(data?.product?.images[0]);
  }, [data]);
  const navigate = useNavigate();
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      {isLoading && <Loader />}
      <Modal.Header closeButton>
        <Modal.Title>Product View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="position-relative">
          {data?.product?.stockStatus == "inStock" ? (
            <button className="bg-success-subtle text-success fs-7 fw-medium py-1 px-3 rounded-pill border-0 position-absolute end-0 me-4">
              {data?.product?.stockStatus}
            </button>
          ) : (
            <button className="bg-danger-subtle text-danger fs-7 fw-medium py-1 px-3 rounded-pill border-0 position-absolute end-0 me-4">
              {data?.product?.stockStatus}
            </button>
          )}
          <Row>
            <Col md={5}>
              <img
                src={mainImage}
                alt={data?.product?.name}
                className="rounded border w-100"
                style={{ height: "300px", objectFit: "contain" }}
              />
              <div className="d-flex mt-3 gap-3">
                {data?.product?.images?.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${data?.product?.name}-${index}`}
                    style={{
                      width: "88px",
                      height: "88px",
                    }}
                    className={`cursor-pointer rounded ${
                      mainImage == data?.product?.images[index]
                        ? `success-border`
                        : `border`
                    }`}
                    onClick={() => setMainImage(data?.product?.images[index])}
                  />
                ))}
              </div>
            </Col>
            <Col md={7}>
              <div className="mt-2">
                <h2 className="fs-4 fw-bold">{data?.product?.name}</h2>
                <h5 className="opacity-75 fs-6 fw-medium">
                  {data?.product?.category?.name}
                </h5>
                <p className="opacity-75 fs-7">{data?.product?.description}</p>
                <div className="d-flex align-items-center">
                  <h5 className="me-2 text-muted text-decoration-line-through fs-6 opacity-75">
                    ₹{data?.product?.price}
                  </h5>
                  <h5 className="text-success fw-bold">
                    ₹{data?.product?.discount}
                  </h5>
                </div>
                <div className="d-flex justify-content-between flex-wrap">
                  <p>
                    Stock Quantity:
                    <span className="fw-bold"> {data?.product?.quantity}</span>
                  </p>
                  <p>
                    Created at:
                    <span className="fw-bold">
                      {new Date(data?.product?.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </span>
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
