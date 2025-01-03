import { Container, Row, Col } from "react-bootstrap";
import { home1, home2 } from "../../../../assets/banner";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "../../../../components/common";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { userRoutesConstants } from "../../../../routes/user/userRoutesConstants";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <Container className="my-5 py-4">
      <Row>
        <Col lg={6}>
          <div className="home-banner1 mt-3">
            <Row>
              <Col className="col-md-7 py-5 ps-md-5 p-4">
                <button className="free-delivery-btn border-0 text-light rounded-1 px-2 py-1 fs-7">
                  Free Delivery
                </button>
                <h3 className="fw-bold mt-3">Free delivery over &#8377;99 </h3>
                <p className="opacity-75">
                  Shop &#8377;99 product and get free delivery anywhre.
                </p>
                <Button
                  btnLabel="Shop Now"
                  btnStyle="bg-custom-primary text-light py-2 px-3 rounded-1 border-0"
                  rightIcon={<IoIosArrowRoundForward size={24} />}
                  onClick={()=>navigate(userRoutesConstants.newProducts)}

                />
              </Col>
              <Col className="col-5 d-none d-md-block">
                <img src={home1} alt="Banner1" className="h-100" />
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={6}>
          <div className="home-banner2 mt-3">
            <Row>
              <Col className="col-md-7 py-5 ps-md-5 p-4">
                <button className="bg-custom-primary border-0 text-light rounded-1 px-3 py-1 fs-7">
                  60% off
                </button>
                <h3 className="fw-bold mt-3">Organic Food </h3>
                <p className="opacity-75">
                  Enjoy exclusive savings of up to 60% on your first order!
                </p>
                <Button
                  btnLabel="Shop Now"
                  btnStyle="bg-custom-primary text-light py-2 px-3 rounded-1 border-0"
                  rightIcon={<IoIosArrowRoundForward size={24} />}
                  onClick={()=>navigate(userRoutesConstants.newProducts)}
                />
              </Col>
              <Col className="col-5 position-relative d-none d-md-block">
                <img
                  src={home2}
                  alt="Banner2"
                  className="w-100 position-absolute bottom-0 end-0 me-2 pe-1"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
