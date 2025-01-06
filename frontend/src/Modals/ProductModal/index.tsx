import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { redirectAdminRoutes } from "../../routes/admin/adminRoutesConstants";
import { useViewProductByIdQuery } from "../../api/adminService";

interface ProductModalProps {
  show: boolean;
  handleClose: () => void;
  productId?: string;
  skip: Boolean
}

const ProductModal: React.FC<ProductModalProps> = ({
  show,
  handleClose,
  productId,
  skip = true
}) => {
  const { data, isLoading } = useViewProductByIdQuery(productId, {skip:skip});
  const [mainImage, setMainImage] = useState<string | undefined>();

  useEffect(() => {
    if (data?.product?.images) {
      setMainImage(data.product.images[0]);
    }
  }, [data]);

  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Product View   {isLoading ? (
            <Skeleton width={100} height={30} className="ms-2" />
          ) : (
            <button
              className={`${
                data?.product?.stockStatus === "inStock"
                  ? "btn-success"
                  : "btn-danger"
              } fs-7 fw-medium py-1 px-3 rounded-2 border-0 ms-2 btn-sm btn`}
            >
              {data?.product?.stockStatus}
            </button>
          )}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="position-relative">
        
          <Row>
            <Col md={5}>
              {isLoading ? (
                <Skeleton height={300} className="rounded w-100" />
              ) : (
                <img
                  src={mainImage}
                  alt={data?.product?.name}
                  className="rounded border w-100"
                  style={{ height: "300px", objectFit: "contain" }}
                />
              )}
              <div className="d-flex mt-3 gap-3">
                {isLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton
                          key={index}
                          width={88}
                          height={88}
                          className="rounded"
                        />
                      ))
                  : data?.product?.images?.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${data?.product?.name}-${index}`}
                        style={{
                          width: "88px",
                          height: "88px",
                          objectFit:"contain"
                        }}
                        className={`cursor-pointer rounded ${
                          mainImage === image ? "success-border" : "border"
                        }`}
                        onClick={() => setMainImage(image)}
                      />
                    ))}
              </div>
            </Col>
            <Col md={7}>
              {isLoading ? (
                <>
                  <Skeleton width="70%" height={30} />
                  <Skeleton width="50%" height={20} className="mt-2" />
                  <Skeleton width="100%" height={80} className="mt-3" />
                  <Skeleton width="30%" height={25} className="mt-2" />
                  <Skeleton width="40%" height={25} className="mt-2" />
                  <Skeleton width="100%" height={25} className="mt-3" />
                </>
              ) : (
                <div className="mt-2">
                  <h2 className="fs-4 fw-bold">{data?.product?.name}</h2>
                  <h5 className="opacity-75 fs-6 fw-medium">
                    {data?.product?.category?.name}
                  </h5>
                  <p className="opacity-75 fs-7">{data?.product?.description}</p>
                  <div className="d-flex align-items-center">
                    <h5 className="me-2 text-muted text-decoration-line-through fs-6 opacity-75">
                      {(data?.product?.discount) ==0 ? "":`₹${data?.product?.discount}`}
                    </h5>
                    <h5 className="text-success fw-bold">
                      ₹{data?.product?.price}
                    </h5>
                  </div>
                  <div className="d-flex justify-content-between flex-wrap">
                    <p>
                      Stock Quantity:
                      <span className="fw-bold"> {data?.product?.quantity} {data?.product?.unit}</span>

                    </p>
                    <p>
                      Created at:
                      <span className="fw-bold">
                        {new Date(
                          data?.product?.createdAt
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              )}
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
          onClick={() => navigate(`${redirectAdminRoutes.productManagement.edit}${productId}`)}
          disabled={isLoading}
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
