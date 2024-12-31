import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { userRoutesConstants } from "../../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { redirectAdminRoutes } from "../../../../routes/admin/adminRoutesConstants";
import { useFormik } from "formik";
import {
  TextInput,
  SelectField,
  TextArea,
  MultiImageUpload,
} from "../../../../components/admin";
import { Button } from "../../../../components/common";
import { productSchema } from "../../../../schema/admin/ProductManagement";
import "./style.css";

const EditProduct: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      category: "",
      productDescription: "",
      price: "",
      discountPrice: "",
      stockQuantity: "",
      stockStatus: "",
      images: [],
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "groceries", label: "Groceries" },
  ];

  const statuses = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  return (
    <Container
      fluid
      className="main-ProductManagement-container dash-container px-2 px-md-4"
    >
      <Row className="my-2">
        <Col md={5} className="d-flex align-items-center mt-3 mt-md-0">
          <Link
            to={userRoutesConstants.home}
            className="text-decoration-none text-custom-primary d-md-none"
          >
            <IoIosArrowRoundBack size={28} className="me-2" />
          </Link>
          <h1 className="fw-bold fs-3 m-0 mt-md-3">Edit Product</h1>
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
          <Link
            to={redirectAdminRoutes.productManagement.view}
            className="text-decoration-none text-custom-primary"
          >
            Manage Product
          </Link>
          <span> | </span>
          <span>Edit Product</span>
        </Col>
      </Row>

      <div className="bg-white shadow-sm border rounded my-5 p-4 addproduct-container m-auto">
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={6}>
              <TextInput
                name="productName"
                label="Product Name"
                placeholder="Enter Product Name"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <SelectField
                name="category"
                label="Category"
                options={categories}
                placeholder="Select Category"
                formik={formik}
              />
            </Col>
            <Col md={12}>
              <TextArea
                name="productDescription"
                label="Product Description"
                placeholder="Enter Description"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <TextInput
                name="price"
                label="Price"
                placeholder="Enter Price"
                type="number"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <TextInput
                name="discountPrice"
                label="Discount Price"
                placeholder="Enter Discount Price"
                type="number"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <TextInput
                name="stockQuantity"
                label="Stock Quantity"
                placeholder="Enter Stock Quantity"
                type="number"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <SelectField
                name="stockStatus"
                label="Stock Status"
                options={statuses}
                placeholder="Select Status"
                formik={formik}
              />
            </Col>
            <Col md={12}>
              <MultiImageUpload
                label="Product Images"
                name="images"
                formik={formik}
                maxImages={3}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end align-items-center gap-3 mt-3">
            <button className="text-muted border bg-secondary-subtle p-custom rounded fw-medium px-4">
              Cancel
            </button>
            <Button
              btnLabel="Update"
              btnStyle="bg-custom-primary border-0 text-light p-custom fw-medium rounded d-flex justify-content-center"
            />
          </div>
        </form>
      </div>
   
    </Container>
  );
};

export default EditProduct;
