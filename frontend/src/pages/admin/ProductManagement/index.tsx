import { Container, Row, Col } from "react-bootstrap";
import React, { ReactNode, useState } from "react";
import { SearchField, Pagination } from "../../../components/admin";
import { Button, CustomTable } from "../../../components/common";
import { Link, useNavigate } from "react-router-dom";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Current Page:", page);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleEdit = () => {};

  const handleDelete = () => {
    alert("Delete action clicked!");
  };
  const handleAddProduct = () => {};
  type ColumnType = {
    key: string;
    header: string;
    type: "checkbox" | "text" | "product" | "toggler";
    togglerHandler?: (value: boolean, row: DataType) => void;
  };

  type DataType = {
    index: string;
    product: string;
    category: string;
    image: string;
    price: string;
    stock: string;
    status: boolean;
    created: string;
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

  const data: DataType[] = [
    {
      index: "01",
      product: "Oranges Gaga",
      category: "Fruits",
      image: "https://via.placeholder.com/50",
      price: "₹400",
      stock: "7500",
      status: false,
      created: "14/08/2024",
    },
    {
      index: "02",
      product: "Red Strawberry",
      category: "Fruits",
      image: "https://via.placeholder.com/50",
      price: "₹400",
      stock: "7500",
      status: true,
      created: "14/08/2024",
    },
    {
      index: "03",
      product: "Gala Apple",
      category: "Fruits",
      image: "https://via.placeholder.com/50",
      price: "₹400",
      stock: "7500",
      status: false,
      created: "14/08/2024",
    },
    {
      index: "04",
      product: "Bhaji",
      category: "Vegetables",
      image: "https://via.placeholder.com/50",
      price: "₹400",
      stock: "7500",
      status: true,
      created: "14/08/2024",
    },
    {
      index: "05",
      product: "Peach",
      category: "Fruits",
      image: "https://via.placeholder.com/50",
      price: "₹400",
      stock: "7500",
      status: true,
      created: "14/08/2024",
    },
  ];

  const actions: ActionType[] = [
    {
      label: "View",
      onClick: (row) => console.log("View clicked for", row),
      icon: <MdOutlineRemoveRedEye />,
    },
    {
      label: "Edit",
      onClick: (row) => console.log("Edit clicked for", row),
      icon: <MdOutlineEdit />,
    },
    {
      label: "Delete",
      onClick: (row) => console.log("Delete clicked for", row),
      icon: <RiDeleteBinLine />,
    },
  ];

  // Example of how to use togglerHandler
  const toggleStatus = (row: DataType) => {
    const togglerColumn = columns.find((col) => col.type === "toggler");
    if (togglerColumn?.togglerHandler) {
      togglerColumn.togglerHandler(!row.status, row);
    }
  };

  // Example usage for toggling
  data.forEach((row) => toggleStatus(row));

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
            <h1 className="fw-bold fs-3 m-0 mt-3">Manage Product</h1>
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
            <RiDeleteBin5Fill size={24} />
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
            <CustomTable columns={columns} data={data} actions={actions} />
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
    </Container>
  );
};

export default ProductManagement;
