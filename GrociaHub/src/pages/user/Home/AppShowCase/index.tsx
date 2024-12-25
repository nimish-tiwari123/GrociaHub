import { Container, Row, Col } from "react-bootstrap";
import { projectShowcase, download1, download2 } from "../../../../assets/home";
import "./style.css";
const AppShowCase = () => {
  return (
    <Container fluid className="AppShowCase-container-img p-0 d-none d-md-block">
      <div className="AppShowCase-container">
       <Container>
       <Row className="h-100 w-100 m-0">
          <Col md={6}>
            <div className="h-100 d-flex flex-column justify-content-center ">
              <h1 className="fw-bold text-Vdark display-5 text-shadow mt-heading">
                Shop Faster With GrociaHub App
              </h1>
              <p className="fs-5 opacity-75">Available on both IOS & Android</p>
              <div className="d-flex w-50">
                <img src={download1} alt="Download" className="py-1 w-50" />
                <img src={download2} alt="Download" className="w-50"/>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <img src={projectShowcase} alt="Project Show" className="w-100 mt-5" />
          </Col>
        </Row>
       </Container>
      </div>
    </Container>
  );
};

export default AppShowCase;
