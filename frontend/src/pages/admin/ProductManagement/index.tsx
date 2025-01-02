import { Container, Row, Col } from "react-bootstrap";
import React, { ReactNode, useState } from "react";
import { SearchField, Pagination } from "../../../components/admin";
import { Button, CustomTable, TableSkeleton } from "../../../components/common";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal, ProductModal } from "../../../Modals";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
import { image1, image2, image3 } from "../../../assets/categories";
import { useViewProductsQuery } from "../../../api/adminService";
const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productData, isLoading, isFetching } = useViewProductsQuery(searchTerm);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Current Page:", page);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleEdit = () => {};

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
  };
  const handleAddProduct = () => {
    navigate(redirectAdminRoutes.productManagement.add);
  };
  type ColumnType = {
    key: string;
    header: string;
    type: "checkbox" | "text" | "product" | "toggler";
    togglerHandler?: (value: boolean, row: DataType) => void;
  };

  type DataType = {
    name:string;
    category:{
      name:string;
    }
    index: string;
    product: string;
    images: string;
    price: string;
    stock: string;
    stockStatus: String;
    createdAt: string;
    quantity:string;
    status:Boolean;
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
      togglerHandler: (value, row) => {
        row.status = value;
        console.log("Toggled:", row);
      },
    },
    { key: "created", header: "Created", type: "text" },
  ];

  const actions: ActionType[] = [
    {
      label: "View",
      onClick: (row) => handleOpenModal(),
      icon: <MdOutlineRemoveRedEye />,
    },
    {
      label: "Edit",
      onClick: (row) => navigate(redirectAdminRoutes.productManagement.edit),
      icon: <MdOutlineEdit />,
    },
    {
      label: "Delete",
      onClick: (row) => setShowDeleteModal(true),
      icon: <RiDeleteBinLine />,
    },
  ];

  const toggleStatus = (row: DataType) => {
    const togglerColumn = columns.find((col) => col.type === "toggler");
    if (togglerColumn?.togglerHandler) {
      togglerColumn.togglerHandler(!row.status, row);
    }
  };

  // data.forEach((row) => toggleStatus(row));

  const product = {
    name: "Oranges Gaga",
    category: "Fruits",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis.",
    price: 200,
    discountPrice: 100,
    stockQuantity: 5000,
    createdDate: "14/08/2024",
    images: [image1, image2, image3],
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  function convertProductsToCustomFormat(products:DataType[]) {
    return products?.map((product , index: number) => ({
      index: String(index + 1).padStart(2, "0"),
      product: product.name || "Unknown Product",
      category: product.category?.name || "Unknown Category",
      image: product.images?.[0] || "https://via.placeholder.com/50",
      price: `₹${product.price}`,
      stock: String(product.quantity),
      status: product.stockStatus === "inStock",
      created: new Date(product.createdAt).toLocaleDateString("en-GB"),
    }));
  }

  const convertedData = convertProductsToCustomFormat(productData?.products);
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
          <h1 className="fw-bold fs-3 m-0 mt-md-3">Manage Product</h1>
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
          <span>Manage Product</span>
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
          <button className="d-flex align-items-center justify-content-center rounded border bg-white text-danger me-3 p-2">
            <RiDeleteBin5Fill size={16} />
          </button>
          <Button
            btnLabel="+ Add Product"
            btnStyle="bg-custom-primary border-0 text-light fw-medium rounded p-2 "
            onClick={handleAddProduct}
          />
        </Col>
      </Row>
      <Row className="mt-3 px-2 px-md-1">
        <Col>
          <div className="bg-white p-3 custom-shadow rounded border custom-shadow mb-3">
            {isLoading || isFetching ? (
              <TableSkeleton />
            ) : (
              <CustomTable
                columns={columns}
                data={convertedData}
                actions={actions}
              />
            )}

            <div className="mt-5 mb-3 d-flex justify-content-center">
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
        subheading={`Are you sure you want to delete the product "${name}"? This action cannot be undone.`}
        onDelete={handleConfirmDelete}
        onCancel={handleCancel}
      />
      <ProductModal
        show={showModal}
        handleClose={handleCloseModal}
        product={product}
      />
    </Container>
  );
};

export default ProductManagement;
