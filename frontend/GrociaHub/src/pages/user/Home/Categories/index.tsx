import { Container, Row, Col } from "react-bootstrap";
import { Button } from "../../../../components/common";
import { categoriesColor } from "../../../../constants/userConstants";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
} from "../../../../assets/categories";
import "./style.css";
const Categories = () => {
  const CategoriesImg = [
    { name: "Fruits", img: image1, totalProducts: 20 },
    { name: "Fruits", img: image2, totalProducts: 20 },
    { name: "Fruits", img: image3, totalProducts: 20 },
    { name: "Fruits", img: image4, totalProducts: 20 },
    { name: "Fruits", img: image5, totalProducts: 20 },
    { name: "Fruits", img: image6, totalProducts: 20 },
    { name: "Fruits", img: image7, totalProducts: 20 },
    { name: "Fruits", img: image3, totalProducts: 20 },
  ];
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

      <Row className="d-xl-flex category-home-row">
        {CategoriesImg.map((item, index) => (
          <Col key={index} className="col-6" sm={4} md={3} xl="auto">
            <div
              style={{
                backgroundColor: categoriesColor[index] || "transparent",
              }}
              className="rounded-2 p-3 mt-3"
            >
              <img
                src={item.img}
                alt="category"
                className="w-75 m-auto d-block"
              />
              <h5 className="text-center">{item.name}</h5>
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
