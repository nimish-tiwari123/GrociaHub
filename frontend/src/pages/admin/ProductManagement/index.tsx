import { Container, Row, Col } from "react-bootstrap";
import React, { ReactNode } from "react";
import { SearchField, Pagination } from "../../../components/admin";
import { Button, CustomTable, TableSkeleton } from "../../../components/common";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal, ProductModal } from "../../../Modals";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine, RiDeleteBin5Fill } from "react-icons/ri";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
import useProduct from "./useProduct";
import "./style.css";

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();

  const {
    searchTerm,
    currentPage,
    selectedProduct,
    showDeleteModal,
    showModal,
    productData,
    isLoading,
    isFetching,
    deleteLoading,
    isUpdating,
    totalPages,
    handleSearchChange,
    handlePageChange,
    handleAddProduct,
    handleDeleteConfirm,
    toggleStatus,
    setShowDeleteModal,
    setShowModal,
    setSelectedProduct,
    convertProductsToCustomFormat,
  } = useProduct();

  type ColumnType = {
    key: string;
    header: string;
    type: "checkbox" | "text" | "product" | "toggler";
    togglerHandler?: (value: boolean, row: DataType) => void;
  };

  type DataType = {
    _id: string;
    id: string;
    name: string;
    category: {
      name: string;
    };
    index: string;
    product: string;
    images: string;
    price: string;
    stock: string;
    isActive: Boolean;
    createdAt: string;
    quantity: string;
    status: Boolean;
  };

  type ActionType = {
    label: string;
    onClick: (row: DataType) => void;
    icon: ReactNode;
  };
  const columns: ColumnType[] = [
    { key: "checkbox", header: "", type: "checkbox" },
    { key: "index", header: "S. No.", type: "text" },
    { key: "product", header: "Product", type: "product" },
    { key: "price", header: "Price", type: "text" },
    { key: "stock", header: "Stock", type: "text" },
    {
      key: "status",
      header: "Status",
      type: "toggler",
      togglerHandler: (value, row) => toggleStatus(row, value),
    },
    { key: "created", header: "Created", type: "text" },
  ];

  const actions: ActionType[] = [
    {
      label: "View",
      onClick: (row) =>{
        setShowModal(true)
        setSelectedProduct(row)
      }
      ,
      icon: <MdOutlineRemoveRedEye />,
    },
    {
      label: "Edit",
      onClick: () => navigate(redirectAdminRoutes.productManagement.edit),
      icon: <MdOutlineEdit />,
    },
    {
      label: "Delete",
      onClick: (row) => {
        setSelectedProduct(row);
        setShowDeleteModal(true);
      },
      icon: <RiDeleteBinLine />,
    },
  ];

  const convertedData = convertProductsToCustomFormat(
    productData?.products || []
  );

  return (
    <Container
      fluid
      className="main-ProductManagement-container dash-container px-2 px-md-4"
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
            Manage Product
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
        <Col lg={4}>
          <SearchField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search..."
          />
        </Col>

        <Col md={8} className="d-flex justify-content-end align-items-center mt-3 mt-lg-0">
          <Button
            btnLabel="+ Add Product"
            btnStyle="bg-custom-primary border-0 text-light fw-medium rounded p-2"
            onClick={handleAddProduct}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <div className="bg-white p-3 custom-shadow rounded border mb-3">
            {isLoading || isFetching || deleteLoading || isUpdating ? (
              <TableSkeleton />
            ) : (
              <CustomTable
                columns={columns}
                data={convertedData}
                actions={actions}
              />
            )}
            <div className="my-4 d-flex justify-content-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </Col>
      </Row>

      <DeleteModal
        show={showDeleteModal}
        heading="Delete Product"
        subheading={`Are you sure you want to delete the product "${selectedProduct?.product}"?`}
        onDelete={() => handleDeleteConfirm(selectedProduct?.id || "")}
        onCancel={() => setShowDeleteModal(false)}
      />

      <ProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        productId={selectedProduct?.id}
      />
    </Container>
  );
};

export default ProductManagement;
