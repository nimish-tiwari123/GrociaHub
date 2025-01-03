import { Container, Row, Col } from "react-bootstrap";
import { Button, CategorySkeleton } from "../../../../components/common";

import "./style.css";
import { useViewUserCategoryQuery } from "../../../../api/userService";
const Categories = () => {
  const { data, isLoading } = useViewUserCategoryQuery("");
  type categoryType = {
    image: string;
    name: string;
    totalProducts: string;
  };
  return (
    <Container>
      <Row className="my-5">
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <Col key={index} className="col-6" sm={4} md={3} lg={2}>
              <CategorySkeleton />
            </Col>
          ))}
        {data?.categories?.map((item: categoryType, index: number) => (
          <Col key={index} className="col-6" sm={4} md={3} lg={2}>
            <div className="rounded-2 p-3 mt-3 border category-card">
              <img
                src={item.image}
                alt="category"
                className="w-75 m-auto d-block category-admin-img"
              />
              <h5 className="text-center fs-6">{item.name}</h5>
              <p className="text-center opacity-75 fs-7">
                {item.totalProducts} Products
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
