import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { SearchField, CategoryCard } from "../../../components/admin";
import { Button } from "../../../components/common";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
} from "../../../assets/categories";
import "./style.css";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
import { Link, useNavigate } from "react-router-dom";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";

const CategoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleEdit = () => {
    navigate(redirectAdminRoutes.categoryManagement.editCategory);
  };

  const handleDelete = () => {
    alert("Delete action clicked!");
  };
  const handleAddCategory = () => {
    navigate(redirectAdminRoutes.categoryManagement.addCategory);
  };
  const CategoriesImg = [
    { name: "Fruits", img: image1 },
    { name: "Fruits", img: image2 },
    { name: "Fruits", img: image3 },
    { name: "Fruits", img: image4 },
    { name: "Fruits", img: image5 },
    { name: "Fruits", img: image6 },
    { name: "Fruits", img: image7 },
    { name: "Fruits", img: image3 },
  ];
  return (
    <Container
      fluid
      className="main-CategoryManagement-container dash-container px-2 px-md-4"
    >
    
      <Row className="my-2">
        <Col md={5}>
          <h1 className="fw-bold fs-3 m-0 mt-3">
            <Link
              to={userRoutesConstants.home}
              className="text-decoration-none text-custom-primary d-md-none"
            >
              <IoIosArrowRoundBack size={28} className="me-2" />
            </Link>
            <h1 className="fw-bold fs-3 m-0 mt-3">Category Management</h1>
          </h1>
        </Col>
        <Col
          md={7}
          className="d-md-flex align-items-center justify-content-end gap-lg-2 gap-md-1 d-none"
        >
          <Link
            to={userRoutesConstants.home}
            className="text-decoration-none text-custom-primary"
          >
            Home
          </Link>
          <span> | </span>
          <span>Category Management</span>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={4} md={8}>
          <SearchField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search..."
          />
        </Col>
        <Col lg={8} md={4} className="d-flex justify-content-end align-items-center mt-3 mt-md-0">
          <Button
            btnLabel="+ Add Category"
           btnStyle="bg-custom-primary border-0 text-light fw-medium rounded p-2 "
            onClick={handleAddCategory}
          />
        </Col>
      </Row>
      <Row className="mt-3 px-2 px-md-1">
        {CategoriesImg.map((category, index) => (
          <Col md={4} lg={2} key={index} className="col-6 p-1 p-md-2">
            <CategoryCard
              image={category.img}
              name={category.name}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryManagement;
