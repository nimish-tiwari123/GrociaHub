import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <Container fluid className="cart-container-img p-0">
      <div className="cart-header-container d-flex flex-column justify-content-center align-items-center">
        <h1 className="fw-bold text-Vdark display-5 text-shadow text-center">
          Shopping Cart
        </h1>
        <div className="custom-breadcrumb d-flex">
          <Link to="/" className="breadcrumb-link text-decoration-none">Home</Link>
          <span className="breadcrumb-separator mx-2">/</span>
          <span className="breadcrumb-active">Cart</span>
        </div>
      </div>
    </Container>
  );
};

export default Header;
