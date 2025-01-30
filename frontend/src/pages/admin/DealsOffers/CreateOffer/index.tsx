import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRoutesConstants } from "../../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { redirectAdminRoutes } from "../../../../routes/admin/adminRoutesConstants";
import { useFormik } from "formik";
import {
  TextInput,
  SelectField,
  TextArea,
  MultiSelect,
} from "../../../../components/admin";
import { Button } from "../../../../components/common";
import { offerSchema } from "../../../../schema/admin/DealsOffers";
import {
  useViewAllProductQuery,
  useAddOfferMutation,
} from "../../../../api/adminService";
import { Loader } from "../../../../components/common";
import { toast } from "react-toastify";

const CreateOffer: React.FC = () => {
  const { data: allProducts, isLoading: isGetLoading } = useViewAllProductQuery("");
  const [addOffer, { isLoading: isAddLoading,}] =
    useAddOfferMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      discountType: "",
      discountValue: "",
      products: [],
      isActive: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: offerSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          isActive: values.isActive === "active", 
        };
        await addOffer(payload).unwrap();
        toast.success("Offer Created Successfully");
        navigate(redirectAdminRoutes.dealsAndOffers.view);
      } catch (err) {
        console.error("Error adding offer:", err);
      }
    },
    
  });

  const discountTypes = [
    { value: "percentage", label: "Percentage(%)" },
    { value: "fixed", label: "Fixed Amount" },
  ];

  const isActivees = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const products = allProducts?.products?.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <Container
      fluid
      className="main-OfferManagement-container dash-container px-2 px-md-4"
    >
    {isGetLoading || isAddLoading && <Loader/>}
      <Row className="my-2">
        <Col md={5} className="d-flex align-items-center mt-3 mt-md-0">
          <Link
            to={userRoutesConstants.home}
            className="text-decoration-none text-custom-primary d-md-none"
          >
            <IoIosArrowRoundBack size={28} className="me-2" />
          </Link>
          <h1 className="fw-bold fs-3 m-0 mt-md-3">Add Offer</h1>
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
            to={redirectAdminRoutes.dealsAndOffers.view}
            className="text-decoration-none text-custom-primary"
          >
            Manage Offers
          </Link>
          <span> | </span>
          <span>Add Offer</span>
        </Col>
      </Row>

      <div className="bg-white shadow-sm border rounded my-5 p-4 addproduct-container m-auto">
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={12}>
              <TextInput
                name="title"
                label="Offer Title"
                placeholder="Enter Offer Title"
                formik={formik}
              />
            </Col>
            <Col md={12}>
              <TextArea
                name="description"
                label="Offer Description"
                placeholder="Enter Offer Description"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <SelectField
                name="discountType"
                label="Discount Type"
                options={discountTypes}
                placeholder="Select Discount Type"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <TextInput
                name="discountValue"
                label="Discount Value"
                placeholder="Enter Discount Value"
                type="number"
                formik={formik}
              />
            </Col>
            <Col md={12}>
              <MultiSelect
                name="products"
                label="Select Products"
                options={products}
                placeholder="Select Products"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <SelectField
                name="isActive"
                label="isActive"
                options={isActivees}
                placeholder="Select status"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <TextInput
                type="date"
                name="startDate"
                label="Start Date"
                placeholder="Select Start Date"
                formik={formik}
              />
            </Col>
            <Col md={6}>
              <TextInput
                type="date"
                name="endDate"
                label="End Date"
                placeholder="Select End Date"
                formik={formik}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end align-items-center gap-3 mt-3">
            <button className="text-muted border bg-secondary-subtle p-custom rounded fw-medium px-4">
              Cancel
            </button>
            <Button
              btnLabel="Add Offer"
              btnStyle="bg-custom-primary border-0 text-light p-custom fw-medium rounded d-flex justify-content-center"
            />
          </div>
        </form>
      </div>

      {/* Show loader when adding offer */}
      {isAddLoading && <Loader />}
    </Container>
  );
};

export default CreateOffer;
