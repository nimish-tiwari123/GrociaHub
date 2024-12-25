import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <Container fluid className="category-container-img p-0">
      <div className="category-header-container d-flex flex-column justify-content-center align-items-center">
        <h1 className="fw-bold text-Vdark display-5 text-shadow text-center">
       Categories
        </h1>
        <div className="custom-breadcrumb d-flex">
          <Link to="/" className="breadcrumb-link text-decoration-none">Home</Link>
          <span className="breadcrumb-separator mx-2">/</span>
          <span className="breadcrumb-active">Categories</span>
        </div>
      </div>
    </Container>
  );
};

export default Header;