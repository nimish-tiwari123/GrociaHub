import { Container, Row, Col } from "react-bootstrap";
import { Button } from "../../../../components/common";
import { products } from "../../../../constants/userConstants";
import { ProductCard, ProductSkeleton } from "../../../../components/user";
const FeaturedProducts = () => {
  return (
    <Container>
      <Row className=" pt-5 pb-4">
        <Col md={6}>
          <h2>Featured Products</h2>
        </Col>
        <Col md={6} className="d-flex view-all-btn mt-1 mt-md-auto">
          <Button
            btnLabel="View All Products"
            btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 mb-3 mb-lg-0 rounded"
          />
        </Col>
      </Row>

      {/* <Row>
        {Array.from({ length: 12 }).map((_, index) => (
          <Col
            xl={2}
            lg={3}
            md={4}
            sm={6}
            className="col-6 p-2 p-md-auto py-0"
            key={index}
          >
            <ProductSkeleton />
          </Col>
        ))}
      </Row> */}

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
    </Container>
  );
};

export default FeaturedProducts;
