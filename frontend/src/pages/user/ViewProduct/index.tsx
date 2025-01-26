import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useViewUserProductByIdQuery } from "../../../api/userService";
import { Button } from "../../../components/common";
import { MdDeliveryDining } from "react-icons/md";
import { SiOrganicmaps } from "react-icons/si";
import { MdCurrencyRupee } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCartStore } from "../../../store/useCartStore";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useViewUserProductByIdQuery(id);
  const [activeImg, setActiveImg] = useState<string>(
    data?.product?.images[0] || ""
  );
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  useEffect(() => {
    setActiveImg(data?.product?.images[0]);
  }, [data]);

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
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (data) {
      const product = {
        image: data.product.images[0],
        name: data.product.name,
        category: data.product.category.name,
        weight: data.product.unit,
        rating: 4, // Assuming 4 stars or adjust based on your data
        price: data.product.price,
        discountPrice: data.product.discount,
        quantity,
      };

      addToCart(product);
      toast.success("Product added in cart");
    }
  };

  const handleBuyNow = () => {
    console.log("Proceeding to checkout...");
  };

  if (isLoading || isFetching) {
    return (
      <Container fluid>
        <Container className="my-4">
          <div className="custom-breadcrumb d-flex">
            <Skeleton width={80} />
            <span className="breadcrumb-separator mx-2">/</span>
            <Skeleton width={60} />
          </div>
        </Container>
        <Container className="rounded-3 mb-5 p-0 p-md-5 position-relative product-view-container">
          <Row>
            <Col md={6}>
              <Skeleton height={200} />
            </Col>
            <Col md={6}>
              <Skeleton height={150} />
              <Skeleton count={3} height={20} />
              <Skeleton height={40} />
              <Skeleton width={120} height={40} />
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

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
       
        <Row>
          <Col md={6}>
            <h2 className="fs-3 fw-bold m-0">{data?.product?.name}</h2>
            <p className="opacity-50">{data?.product?.category?.name}</p>
            <Row className="mt-2 mt-md-4 pt-3">
              <Col className="col-3 col-md-2 ">
                <div className="d-flex flex-column gap-4">
                  {data?.product?.images?.map((img:string, index:number) => (
                    <img
                      key={index}
                      src={img}
                      alt="product"
                      className={`w-100 rounded-2 cursor-pointer  ${
                        activeImg === img ? "success-border" : "border"
                      }`}
                      onClick={() => handleImg(img)}
                    />
                  ))}
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
                <span className="discount-price fs-5 fw-medium opacity-50 text-decoration-line-through">
                  {data?.product?.discount == 0 ? (
                    ""
                  ) : (
                    <span>&#8377;{data?.product?.discount}</span>
                  )}
                </span>

                <span className="price ms-2 fs-4 fw-bold text-custom-primary">
                  &#8377;{data?.product?.price}
                </span>
              </div>
              <div className="mt-3">
                <button className="stock-status-btn text-custom-primary rounded-pill py-2 px-3 border-0 fw-medium fs-7">
                  {data?.product?.stockStatus.toUpperCase()}
                </button>
              </div>
              <p className="opacity-75 mt-3">{data?.product?.description}</p>
              <div className="row mb-4">
                <div className="product-quantity col-lg-12 col-md-12 mt-3">
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
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <Button
                    btnLabel="Add To Cart"
                    btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 rounded-pill fs-7"
                    onClick={handleAddToCart}
                  />
                  <Button
                    btnLabel="Buy Now"
                    btnStyle="btn btn-primary border-0 text-light px-3 fw-medium py-2 rounded-pill fs-7"
                    onClick={handleBuyNow}
                  />
                </div>
              </div>
              <div className="product-service-card mt-5 rounded bg-custom-secondary p-3">
                <div className="d-flex my-3">
                  <MdDeliveryDining size={40} className="opacity-75" />
                  <span className="ms-3 fs-7 fw-medium">
                    Free Shipping apply to all orders over &#8377;100
                  </span>
                </div>
                <div className="d-flex my-3">
                  <SiOrganicmaps size={40} className="opacity-75" />
                  <span className="ms-3 fs-7 fw-medium">
                    Guaranteed 100% Organic from natural farms
                  </span>
                </div>
                <div className="d-flex my-3">
                  <MdCurrencyRupee size={40} className="opacity-75" />
                  <span className="ms-3 fs-7 fw-medium">
                    1 Day Returns if you change your mind
                  </span>
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
