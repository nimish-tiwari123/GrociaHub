import { Container, Row, Col } from "react-bootstrap";

import "./style.css";
import { Button } from "../../../../components/common";
import { userRoutesConstants } from "../../../../routes/user/userRoutesConstants";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="header-container-img p-0">
      <div className="header-container">
        <Row className="h-100 w-100 m-0 bg-img-hero">
          <Col md={6}>
            <div className="h-100 d-flex flex-column justify-content-center gap-3 px-3 px-lg-5 mx-lg-5 custom-w-75">
              <h1 className="fw-bold text-Vdark display-5 text-shadow mt-heading">
                Don’t miss our daily amazing deals.
              </h1>
              <p className="fs-5 opacity-75">
                Save up to 60% off on your first order
              </p>
              <div className="d-flex">
                <Button
                  btnLabel="Explore New Products"
                  btnStyle="bg-custom-primary border-0 text-light fw-medium p-3 rounded"
                  onClick={() => navigate(userRoutesConstants.newProducts)}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Header;
