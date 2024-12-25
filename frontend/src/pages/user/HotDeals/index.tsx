import { Container, Row, Col } from "react-bootstrap";
import { RiLoader4Fill } from "react-icons/ri";
import { Button } from "../../../components/common";
import { products } from "../../../constants/userConstants";
import { ProductCard } from "../../../components/user";
import Header from "./Header";

const HotDeals = () => {
  return (
    <div>
      <Header />
      <Container>
        <Row className=" pt-5 pb-4">
          <Col md={6}>
            <h2>Top Deals</h2>
          </Col>
        </Row>

        <Row>
          {products.map((item, index) => (
            <Col
              xl={2}
              lg={3}
              md={4}
              sm={6}
              className="col-6 p-2 p-md-auto py-0"
              key={index}
            >
              <ProductCard productData={item} />
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center">
          <Button
            btnLabel="Load More"
            btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 my-5 fs-7 rounded"
            rightIcon={<RiLoader4Fill/>}
          />
        </div>
      </Container>
    </div>
  );
};

export default HotDeals;
