import { Container, Row, Col } from "react-bootstrap";
import React, { ReactNode, useState } from "react";
import { SearchField, Pagination } from "../../../components/admin";
import { CustomTable } from "../../../components/common";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal } from "../../../Modals";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { TbShoppingCartX } from "react-icons/tb";
import { FaRegFilePdf } from "react-icons/fa6";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
import { useViewOrdersQuery } from "../../../api/adminService";
const OrderManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: orderData,
    isLoading,
    isFetching,
  } = useViewOrdersQuery({ searchTerm, currentPage, pageSize });
  const navigate = useNavigate();

   const handlePageChange = (page: number) => {
     setCurrentPage(page);
   };
 
   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     setSearchTerm(event.target.value);
     setCurrentPage(1);
   };
 

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  type DataType = {
    index: string;
    customerName: string;
    orderId: string;
    orderDate: string;
    totalAmount: string;
    status: string;
  };

  type ActionType = {
    label: string;
    onClick: (row: DataType) => void;
    icon: ReactNode;
  };

  const columns: any = [
    { key: "index", header: "S. No.", type: "text" },
    { key: "orderId", header: "Order Id", type: "text" },
    { key: "customerName", header: "Customer Name", type: "text" },
    { key: "orderDate", header: "Order Date", type: "text" },
    { key: "totalAmount", header: "Total Amount", type: "text" },

    {
      key: "status",
      header: "Status",
      type: "status",
      statusStyles: (status: string) => {
        let buttonClass = "";
        let buttonText = "";

        switch (status) {
          case "Completed":
            buttonClass = "status-success-btn";
            buttonText = "Completed";
            break;
          case "Pending":
            buttonClass = "status-warning-btn";
            buttonText = "Pending";
            break;
          case "Cancelled":
            buttonClass = "status-danger-btn";
            buttonText = "Cancelled";
            break;
          default:
            buttonClass = "status-default-btn";
            buttonText = "Unknown";
        }

        return (
          <button
            className={`status-btn ${buttonClass} border-0 py-1 px-3 rounded-pill fw-medium`}
          >
            {buttonText}
          </button>
        );
      },
    },
  ];
  const data: DataType[] =
  orderData?.orders.map((order: any, index: number) => ({
    index: String(index + 1).padStart(2, "0"),
    customerName: order.user.name,
    orderId: order._id,
    orderDate: formatDate(order.createdAt),
    totalAmount: order.totalPrice || "N/A",
    status: order.status,
  })) || [];
  
  const actions: ActionType[] = [
    {
      label: "View Details",
      onClick: () => navigate(redirectAdminRoutes.orderManagement.view),
      icon: <MdOutlineRemoveRedEye />,
    },

    {
      label: "Update Status",
      onClick: () => setShowDeleteModal(true),
      icon: <MdOutlineEdit />,
    },
    {
      label: "Cancel Order",
      onClick: () => console.log("Order Cancel"),
      icon: <TbShoppingCartX />,
    },

    {
      label: "Download",
      onClick: () => setShowDeleteModal(true),
      icon: <FaRegFilePdf />,
    },
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
          <h1 className="fw-bold fs-3 m-0 mt-md-3">Order Management</h1>
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
          <span>Order Management</span>
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
      </Row>
      <Row className="mt-3 px-2 px-md-1">
        <Col>
          <div className="bg-white p-3 custom-shadow rounded border custom-shadow mb-3">
            <CustomTable columns={columns} data={data} actions={actions} />
            <div className="mt-5 mb-3 d-flex justify-content-center">
              <Pagination
                currentPage={currentPage}
                totalPages={orderData?.pagination?.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </Col>
      </Row>
      <DeleteModal
        show={showDeleteModal}
        heading="Delete Offer"
        subheading={`Are you sure you want to delete the Offer "${name}"? This action cannot be undone.`}
        onDelete={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default OrderManagement;
