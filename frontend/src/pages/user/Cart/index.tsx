import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { image1, image2 } from "../../../assets/categories";
import Header from "./Header";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./style.css";
import { Button } from "../../../components/common";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <Header />
      <Container className="my-5">
        <Row>
          <Col lg={9} md={12}>
            <div className="p-4 border rounded-3 cart-main-container m-auto">
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  className="ps-3 text-center text-md-start"
                >
                  <span className="fs-6 fw-bold opacity-50">Product</span>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={8}
                  className="text-center text-md-start"
                >
                  <Row>
                    <Col xs={3}>
                      <span className="fs-6 fw-bold opacity-50">Price</span>
                    </Col>
                    <Col xs={3}>
                      <span className="fs-6 fw-bold opacity-50">Quantity</span>
                    </Col>
                    <Col xs={3}>
                      <span className="fs-6 fw-bold opacity-50">Sub Total</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  className="text-center text-md-start"
                >
                  <img
                    src={image1}
                    alt="Product"
                    className="cart-img img-fluid"
                  />
                  <span className="ms-3 fw-medium d-block d-md-inline">
                    Orange
                  </span>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={8}
                  className="text-center text-md-start"
                >
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <span className="fw-medium">&#8377; 500</span>
                    </Col>
                    <Col xs={3}>
                      <div className="product-quantity">
                        <button
                          className="quantity-btn rounded-circle border fs-5"
                          onClick={decreaseQuantity}
                        >
                          -
                        </button>
                        <span className="quantity-number mx-2 fw-medium">
                          {quantity}
                        </span>
                        <button
                          className="quantity-btn rounded-circle border fs-5"
                          onClick={increaseQuantity}
                        >
                          +
                        </button>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className="fw-bold">
                        &#8377; <span>{quantity * 100}</span>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <button className="delete-btn text-danger ms-5 border-0 bg-transparent">
                        <RiDeleteBin6Line size={20} className="mb-1" />
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />
              <Row className="align-items-center">
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  className="text-center text-md-start"
                >
                  <img
                    src={image2}
                    alt="Product"
                    className="cart-img img-fluid"
                  />
                  <span className="ms-3 fw-medium d-block d-md-inline">
                    Bhaji Methi
                  </span>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={8}
                  className="text-center text-md-start"
                >
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <span className="fw-medium">&#8377; 500</span>
                    </Col>
                    <Col xs={3}>
                      <div className="product-quantity">
                        <button
                          className="quantity-btn rounded-circle border fs-5"
                          onClick={decreaseQuantity}
                        >
                          -
                        </button>
                        <span className="quantity-number mx-2 fw-medium">
                          {quantity}
                        </span>
                        <button
                          className="quantity-btn rounded-circle border fs-5"
                          onClick={increaseQuantity}
                        >
                          +
                        </button>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className="fw-bold">
                        &#8377; <span>{quantity * 100}</span>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <button className="delete-btn text-danger ms-5 border-0 bg-transparent">
                        <RiDeleteBin6Line size={20} className="mb-1" />
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={3} md={12} className="mt-4 mt-lg-0">
            <div className="border px-3 py-4 rounded-3 text-center text-md-start">
              <span className="fw-medium fs-5">Total: </span>
              <span className="fw-bold fs-5">&#8377; 2000</span>
              <div>
                <Button
                  btnLabel="Checkout to Proceed"
                  btnStyle="bg-custom-primary border-0 text-light fw-medium py-3 mt-4 rounded-2 w-100 d-flex justify-content-center"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
