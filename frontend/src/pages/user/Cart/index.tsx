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
          <Col md={9}>
            <div className="p-4 border rounded-3 cart-main-container m-auto">
              <Row>
                <Col md={4} className="ps-5">
                  <span className="fs-6 fw-bold opacity-50 ms-5 ps-4">
                    Product
                  </span>
                </Col>
                <Col md={8}>
                  <Row>
                    <Col md={4}>
                      <span className="fs-6 fw-bold opacity-50">Price</span>
                    </Col>
                    <Col md={4}>
                      <span className="fs-6 fw-bold opacity-50">Quantity</span>
                    </Col>
                    <Col md={4}>
                      <span className="fs-6 fw-bold opacity-50">Sub Total</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <img src={image1} alt="Product" className="cart-img" />
                  <span className="ms-3 fw-medium">Orange</span>
                </Col>
                <Col md={8}>
                  <Row className="h-100">
                    <Col md={4} className="d-flex align-items-center">
                      <span className="fw-medium">&#8377; 500</span>
                    </Col>
                    <Col md={4} className="d-flex align-items-center">
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
                    <Col md={4} className="d-flex align-items-center">
                      <div className="fw-bold">
                        &#8377; <span>{quantity * 100}</span>
                      </div>
                      <button className="delete-btn text-danger ms-5 border-0 bg-transparent">
                        <RiDeleteBin6Line size={20} className="mb-1" />
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={4}>
                  <img src={image2} alt="Product" className="cart-img" />
                  <span className="ms-3 fw-medium">Bhaji Methi</span>
                </Col>
                <Col md={8}>
                  <Row className="h-100">
                    <Col md={4} className="d-flex align-items-center">
                      <span className="fw-medium">&#8377; 500</span>
                    </Col>
                    <Col md={4} className="d-flex align-items-center">
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
                    <Col md={4} className="d-flex align-items-center">
                      <div className="fw-bold">
                        &#8377; <span>{quantity * 100}</span>
                      </div>
                      <button className="delete-btn text-danger ms-5 border-0 bg-transparent">
                        <RiDeleteBin6Line size={20} className="mb-1" />
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
             
            </div>
          </Col>
          <Col md={3}>
            <div className="border px-3 py-4 rounded-3">
              <span className="fw-medium fs-5"> Total: </span>{" "}
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
