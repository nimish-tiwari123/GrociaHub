import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { image1, image2, image3 } from "../../../assets/categories";
import "./style.css";
import { Button } from "../../../components/common";
import { MdDeliveryDining } from "react-icons/md";
import { SiOrganicmaps } from "react-icons/si";
import { MdCurrencyRupee } from "react-icons/md";
const ViewProduct = () => {
  const [activeImg, setActiveImg] = useState<string>(image1);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleImg = (imgUrl: string) => {
    setActiveImg(imgUrl);
    console.log(imgUrl, activeImg);
  };

  return (
    <Container fluid>
      <Container className="my-4">
        <div className="custom-breadcrumb d-flex">
          <Link to="/" className="breadcrumb-link text-decoration-none">
            Home
          </Link>
          <span className="breadcrumb-separator mx-2">/</span>
          <span className="breadcrumb-active">Product</span>
        </div>
      </Container>

      <Container className="rounded-3 mb-5 p-0 p-md-5 position-relative product-view-container">
        <button className="btn btn-primary position-absolute top-0 end-0 mt-5 me-2 m-md-4 fs-7 btn-sm ">
          10% off
        </button>
        <Row>
          <Col md={6}>
            <h2 className="fs-3 fw-bold m-0">Fresh Organic Oranges (1kg)</h2>
            <p className="opacity-50">Fruits & Vegetables</p>
            <Row className="mt-2 mt-md-4 pt-3">
              <Col className="col-3 col-md-2 ">
                <div className="d-flex flex-column gap-4">
                  <img
                    src={image1}
                    alt="product"
                    className={`w-100 rounded-2 cursor-pointer ${
                      activeImg == image1 ? "active-border" : "border"
                    }`}
                    onClick={() => handleImg(image1)}
                  />
                  <img
                    src={image2}
                    alt="product"
                    className={`w-100 rounded-2 cursor-pointer ${
                      activeImg == image2 ? "active-border" : "border"
                    }`}
                    onClick={() => handleImg(image2)}
                  />
                  <img
                    src={image3}
                    alt="product"
                    className={`w-100 rounded-2 cursor-pointer ${
                      activeImg == image3 ? "active-border" : "border"
                    }`}
                    onClick={() => handleImg(image3)}
                  />
                </div>
              </Col>
              <Col className="col-9 col-md-10">
                <img
                  src={activeImg}
                  alt="product"
                  className="w-100 border rounded-2"
                />
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Container className="p-2 p-md-5 mt-4">
              <div>
                <span className="discount-price fs-5 fw-medium opacity-50">
                  &#8377;3000
                </span>
                <span className="price ms-2 fs-4 fw-bold text-custom-primary">
                  &#8377;2000
                </span>
              </div>
              <div className="mt-3">
                <button className="stock-status-btn text-custom-primary rounded-pill py-2 px-3 border-0 fw-medium fs-7">
                  IN STOCK
                </button>
              </div>
              <p className="opacity-50 mt-3">
                Enjoy the natural sweetness of freshly picked organic apples.
                Perfect for snacking, baking, or adding to your favorite dishes.
                Grown without harmful pesticides, ensuring a healthy and
                delicious experience.
              </p>
              <div className="row mb-4">
                <div className="product-quantity col-lg-4 col-md-6 mt-3">
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
                <div className="col-lg-8 col-md-6 mt-3"><Button
                  btnLabel="Add To Cart"
                  btnStyle="bg-custom-primary border-0 text-light px-5 fw-medium py-2 rounded-pill fs-7"
                /></div>
              </div>
              <div className="product-service-card mt-5 rounded bg-custom-secondary p-3">
                <div className="d-flex my-3">
                  <MdDeliveryDining size={40} className="opacity-75"/> <span className="ms-3 fs-7 fw-medium">Free Shipping apply to all orders over &#8377;100</span>
                </div>
                <div className="d-flex my-3">
                  <SiOrganicmaps size={40} className="opacity-75"/> <span className="ms-3 fs-7 fw-medium">Guranteed 100% Organic from natural farmas</span>
                </div>
                <div className="d-flex my-3">
                  <MdCurrencyRupee size={40} className="opacity-75"/> <span className="ms-3 fs-7 fw-medium">1 Day Returns if you change your mind</span>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ViewProduct;
