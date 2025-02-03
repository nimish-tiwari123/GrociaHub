import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SearchField, CategoryCard } from "../../../components/admin";
import { Button, NoData } from "../../../components/common";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
import { Link, useNavigate } from "react-router-dom";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useCategoryManagement } from "./useCategoryManagement";
import { CategorySkeleton } from "../../../components/common";
import "./style.css";

type categoryType = {
  _id: string;
  name: string;
  image: string;
};

const CategoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const {
    categories,
    searchTerm,
    isLoading,
    handleSearchChange,
    handleDelete,
  } = useCategoryManagement();

  const handleAddCategory = () => {
    navigate(redirectAdminRoutes.categoryManagement.add);
  };

  const handleEdit = (categoryId: string) => {
    navigate(`${redirectAdminRoutes.categoryManagement.edit}${categoryId}`);
  };

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
            Category Management
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
        <Col
          lg={8}
          md={4}
          className="d-flex justify-content-end align-items-center mt-3 mt-md-0"
        >
          <Button
            btnLabel="+ Add Category"
            btnStyle="bg-custom-primary border-0 text-light fw-medium rounded p-2 "
            onClick={handleAddCategory}
          />
        </Col>
      </Row>
      {(isLoading) && (
        <Row className="mt-3 px-2 px-md-1">
          {Array.from({ length: 12 }).map((_, index: number) => (
            <Col md={4} lg={2} key={index} className="col-6 p-1 p-md-2">
              <CategorySkeleton />
            </Col>
          ))}
        </Row>
      )}

      <Row className="mt-3 px-2 px-md-1">
        {categories?.length === 0 ? (
          <NoData />
        ) : (
          categories.map((category: categoryType, index: number) => (
            <Col md={4} lg={2} key={index} className="col-6 p-1 p-md-2">
              <CategoryCard
                image={category.image}
                name={category.name}
                onEdit={() => handleEdit(category._id)}
                onDelete={() => handleDelete(category._id)}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default CategoryManagement;
