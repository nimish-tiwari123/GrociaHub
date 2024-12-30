import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { redirectAdminRoutes } from "../../../../routes/admin/adminRoutesConstants";
import { TextInput } from "../../../../components/admin";
import { ImageUpload } from "../../../../components/admin";
import { Button, Loader } from "../../../../components/common";
import { IoIosArrowRoundBack } from "react-icons/io";
import useAddCategory from "./useAddCategory";

const AddCategory: React.FC = () => {
  const { formik, isLoading } = useAddCategory();

  return (
    <Container
      fluid
      className="main-CategoryManagement-container dash-container px-2 px-md-4"
    >
      {isLoading && <Loader/>}
      <Row className="my-2">
        <Col md={5}>
          <h1 className="fw-bold fs-3 m-0 mt-3">
            <Link
              to={redirectAdminRoutes.categoryManagement.view}
              className="text-decoration-none text-custom-primary d-md-none"
            >
              <IoIosArrowRoundBack size={28} className="me-2" />
            </Link>
            Add Category
          </h1>
        </Col>
        <Col
          md={7}
          className="d-md-flex align-items-center justify-content-end pt-4 gap-lg-2 gap-md-1 d-none"
        >
          <Link
            to={redirectAdminRoutes.categoryManagement.view}
            className="text-decoration-none text-custom-primary"
          >
            Category Management
          </Link>
          <span> | </span>
          <span>Add Category</span>
        </Col>
      </Row>
      <div className="pb-5 pt-4 px-3 px-md-4 rounded bg-white add-category-container m-auto mt-4 mt-md-5 border">
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            type="text"
            name="name"
            label="Category Name"
            placeholder="Enter Category"
            formik={formik}
          />

          <ImageUpload
            label="Category Image"
            name="image"
            formik={formik}
          />
          <Button
            btnLabel="Add Category"
            btnStyle="bg-custom-primary border-0 text-light p-custom fw-medium rounded w-100 d-flex justify-content-center mt-4"
          />
        </form>
      </div>
    </Container>
  );
};

export default AddCategory;
