import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { userRoutesConstants } from "../../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  redirectAdminRoutes,
} from "../../../../routes/admin/adminRoutesConstants";
import {
  TextInput,
  SelectField,
  TextArea,
  MultiImageUpload,
} from "../../../../components/admin";
import { Button, Loader } from "../../../../components/common";
import { useAddProduct } from "./useAddProduct";
import { units, stockStatuses } from "../../../../constants/admin/product";
import "./style.css";

const AddProduct: React.FC = () => {
  const {
    formik,
    isActive,
    setIsActive,
    isLoadingAdd,
    isLoadingFetch,
    categoryData,
  } = useAddProduct();

  
  const transformedArray = categoryData?.categories?.map(
    (item: { name: any; _id: any }) => ({
      label: item.name,
      value: item._id,
    })
  );

  return (
    <Container
      fluid
      className="main-ProductManagement-container dash-container px-2 px-md-4"
    >
      {(isLoadingAdd || isLoadingFetch) && <Loader />}
      <Row className="my-2">
        <Col md={5} className="d-flex align-items-center mt-3 mt-md-0">
          <Link
            to={redirectAdminRoutes.productManagement.view}
            className="text-decoration-none text-custom-primary d-lg-none"
          >
            <IoIosArrowRoundBack size={28} className="me-2" />
          </Link>
          <h1 className="fw-bold fs-3 m-0 mt-md-3">Add Product</h1>
        </Col>
        <Col
          md={7}
          className="d-lg-flex align-items-center justify-content-end gap-lg-2 gap-md-1 d-none"
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
          <span>Add Product</span>
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
                options={transformedArray}
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
              <Row>
                <Col className="col-7">
                  <TextInput
                    name="stockQuantity"
                    label="Stock Quantity"
                    placeholder="Enter Stock Quantity"
                    type="number"
                    formik={formik}
                  />
                </Col>
                <Col className="col-5 ps-0">
                <SelectField
                name="unit"
                label="Unit"
                options={units}
                placeholder="Select unit"
                formik={formik}
              />
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <SelectField
                name="stockStatus"
                label="Stock Status"
                options={stockStatuses}
                placeholder="Select Stock Status"
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
            <Col md={12} className="mt-3">
              <div className="d-flex align-items-center cursor-pointer">
                <label htmlFor="isActive" className=" me-3 fw-medium">
                  Is Active (Product Live):
                </label>
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                  className="cursor-pointer"
                />
              </div>
              {isActive && (
                <p className="text-success fs-7 mt-1 fw-medium">
                  The product will be live once you save it.
                </p>
              )}
              {!isActive && (
                <p className="text-muted fs-7 mt-1 fw-medium">
                  Check the toggle to make the product live.
                </p>
              )}
            </Col>
          </Row>

          <div className="d-flex justify-content-end align-items-center gap-3 mt-3">
            <button className="text-muted border bg-secondary-subtle p-custom rounded fw-medium px-4">
              Cancel
            </button>
            <Button
              btnLabel="Add Product"
              btnStyle="bg-custom-primary border-0 text-light p-custom fw-medium rounded d-flex justify-content-center"
            />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddProduct;
