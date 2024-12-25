import { Container, Row, Col } from "react-bootstrap";
import { Button } from "../../../../components/common";
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
    { name: "Fruits", img: image4, totalProducts: 20 },
    { name: "Fruits", img: image5, totalProducts: 20 },
    { name: "Fruits", img: image6, totalProducts: 20 },
    { name: "Fruits", img: image7, totalProducts: 20 },
    { name: "Fruits", img: image3, totalProducts: 20 },
    { name: "Fruits", img: image2, totalProducts: 20 },
    { name: "Fruits", img: image3, totalProducts: 20 },
    { name: "Fruits", img: image4, totalProducts: 20 },
    { name: "Fruits", img: image5, totalProducts: 20 },
  ];
  return (
    <Container>
      <Row className="my-5">
        {CategoriesImg.map((item, index) => (
          <Col key={index} className="col-6" sm={4} md={3} lg={2}>
            <div className="rounded-2 p-3 mt-3 border">
              <img
                src={item.img}
                alt="category"
                className="w-75 m-auto d-block"
              />
              <h5 className="text-center">{item.name}</h5>
              <p className="text-center opacity-75 fs-7">
                {item.totalProducts} Products
              </p>
              <Button
                btnLabel="View Products"
                btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-1 m-auto fs-7 rounded-pill"
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
