import { Container, Row, Col } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import Header from "./Header";
import { Button } from "../../../components/common";
import { noCart } from "../../../assets";
import { useCartStore } from "../../../store/useCartStore";
import "./style.css";

const Cart: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const deleteFromCart = useCartStore((state) => state.deleteFromCart);
  const addToCart = useCartStore((state) => state.addToCart);

  const increaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 0;
    addToCart(updatedCart[index]);
  };

  const decreaseQuantity = (index: number) => {
    if (cart[index].quantity > 1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity -= 2;
      addToCart(updatedCart[index]);
    }
  };

  const removeItem = (index: number) => {
    deleteFromCart(cart[index].name);
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <Container className="my-5">
        {cart.length === 0 ? (
          <div className="text-center">
            <img
              src={noCart}
              style={{ maxWidth: "400px" }}
              className="m-auto d-block"
              alt="No Cart Items"
            />
            <h1 className="fs-4 text-custom-primary">
              No Cart Item Added Yet.
            </h1>
          </div>
        ) : (
          <Row>
            <Col lg={9} md={12}>
              <div className="p-4 border rounded-3 cart-main-container">
                <Row className="mb-3">
                  <Col xs={12} md={4} className="text-center text-md-start">
                    <span className="fs-6 fw-bold opacity-50">Product</span>
                  </Col>
                  <Col xs={12} md={8} className="text-center text-md-start">
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
                  <Row key={index} className="align-items-center mb-3">
                    <Col xs={12} md={4} className="text-center text-md-start">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="cart-img img-fluid"
                      />
                      <span className="ms-3 fw-medium d-block d-md-inline">
                        {item.name}
                      </span>
                    </Col>
                    <Col xs={12} md={8} className="text-center text-md-start">
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
                            &#8377; {item.quantity * item.price}
                          </div>
                        </Col>
                        <Col xs={3}>
                          <button
                            className="delete-btn text-danger ms-5 border-0 bg-transparent"
                            onClick={() => removeItem(index)}
                          >
                            <RiDeleteBin6Line size={20} />
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
            <Col lg={3} md={12} className="mt-4 mt-lg-0">
              <div className="border px-3 py-4 rounded-3">
                <span className="fw-medium fs-5">Total: </span>
                <span className="fw-bold fs-5">&#8377; {calculateTotal()}</span>
                <Button
                  btnLabel="Checkout to Proceed"
                  btnStyle="bg-custom-primary border-0 text-light fw-medium py-3 mt-4 rounded-2 w-100 d-flex justify-content-center align-items-center"
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;
