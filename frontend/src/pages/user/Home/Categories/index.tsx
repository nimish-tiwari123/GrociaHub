import { Container, Row, Col } from "react-bootstrap";
import { Button, CategorySkeleton } from "../../../../components/common";
import { categoriesColor } from "../../../../constants/userConstants";
import { useViewUserCategoryQuery } from "../../../../api/userService";
import "./style.css";

const Categories = () => {
  const { data, isLoading } = useViewUserCategoryQuery("");
type categoryType ={
  name: string,
  image:string,
  totalProducts:number
}
  return (
    <Container>
      <Row className=" pt-5 pb-4">
        <Col md={6}>
          <h2>Explore Categories</h2>
        </Col>
        <Col md={6} className="d-flex view-all-btn mt-1 mt-md-auto">
          <Button
            btnLabel="View All Categories"
            btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 mb-3 mb-lg-0 rounded"
          />
        </Col>
      </Row>
      {(isLoading) && (
        <Row className="d-xl-flex category-home-row">
          {Array.from({ length: 6 }).map((_, index: number) => (
            <Col md={4} lg={2} key={index} className="col-6 p-1 p-md-2">
              <CategorySkeleton />
            </Col>
          ))}
        </Row>
      )}
      <Row className="d-xl-flex category-home-row">
        {data?.categories?.slice(0,6).map((item:categoryType, index:number) => (
          <Col key={index} className="col-6" sm={4} md={3} lg={2}>
            <div
              style={{
                backgroundColor: categoriesColor[index] || "transparent",
              }}
              className="rounded-2 p-3 mt-3"
            >
              <img
                src={item.image}
                alt="category"
                className="home-category m-auto d-block w-75"
              />
              <h5 className="text-center  fs-6">
                {item.name.length > 20
                  ? `${item.name.slice(0, 20)}...`
                  : item.name}
              </h5>
              <p className="text-center opacity-75 fs-7">
                Products
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
