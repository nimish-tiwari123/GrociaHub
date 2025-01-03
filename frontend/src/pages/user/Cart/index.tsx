import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import Header from "./Header";
import { Button } from "../../../components/common";
import { noCart } from "../../../assets";
import "./style.css";

// Define the ProductDataType
type ProductDataType = {
  image: string;
  name: string;
  price: number;
  quantity: number;
};

const Cart: React.FC = () => {
  const [cart, setCart] = useState<ProductDataType[]>([]);

  // Load cart data from localStorage on initial render
  useEffect(() => {
    const storedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as ProductDataType[];
    setCart(
      storedCart.map((item) => ({ ...item, quantity: item.quantity || 1 }))
    ); // Ensure quantity defaults to 1
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const increaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const removeItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Header />
      <Container className="my-5">
        {cart.length == 0 ? (
        <div>
          <img src={noCart} style={{maxWidth:"400px"}} className="m-auto d-block"/>
          <h1 className="fs-4 text-custom-primary text-center">No Cart Item Added Yet.</h1>
        </div>
        ) : (
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
                        <span className="fs-6 fw-bold opacity-50">
                          Quantity
                        </span>
                      </Col>
                      <Col xs={3}>
                        <span className="fs-6 fw-bold opacity-50">
                          Sub Total
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {cart.map((item, index) => (
                  <Row key={index} className="align-items-center">
                    <Col
                      xs={12}
                      sm={12}
                      md={4}
                      className="text-center text-md-start"
                    >
                      <img
                        src={item.image}
                        alt="Product"
                        className="cart-img img-fluid"
                      />
                      <span className="ms-3 fw-medium d-block d-md-inline">
                        {item.name}
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
                          <span className="fw-medium">
                            &#8377; {item.price}
                          </span>
                        </Col>
                        <Col xs={3}>
                          <div className="product-quantity">
                            <button
                              className="quantity-btn rounded-circle border fs-5"
                              onClick={() => decreaseQuantity(index)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="quantity-number mx-2 fw-medium">
                              {item.quantity}
                            </span>
                            <button
                              className="quantity-btn rounded-circle border fs-5"
                              onClick={() => increaseQuantity(index)}
                            >
                              +
                            </button>
                          </div>
                        </Col>
                        <Col xs={3}>
                          <div className="fw-bold">
                            &#8377; <span>{item.quantity * item.price}</span>
                          </div>
                        </Col>
                        <Col xs={3}>
                          <button
                            className="delete-btn text-danger ms-5 border-0 bg-transparent"
                            onClick={() => removeItem(index)}
                          >
                            <RiDeleteBin6Line size={20} className="mb-1" />
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
            <Col lg={3} md={12} className="mt-4 mt-lg-0">
              <div className="border px-3 py-4 rounded-3 text-center text-md-start">
                <span className="fw-medium fs-5">Total: </span>
                <span className="fw-bold fs-5">&#8377; {calculateTotal()}</span>
                <div>
                  <Button
                    btnLabel="Checkout to Proceed"
                    btnStyle="bg-custom-primary border-0 text-light fw-medium py-3 mt-4 rounded-2 w-100 d-flex justify-content-center"
                  />
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;
