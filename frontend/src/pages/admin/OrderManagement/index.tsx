import { Container, Row, Col } from "react-bootstrap";
import React, { ReactNode, useState } from "react";
import { SearchField, Pagination } from "../../../components/admin";
import { CustomTable } from "../../../components/common";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal } from "../../../Modals";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuArrowRightLeft } from "react-icons/lu";
import { image1, image2, image3 } from "../../../assets/categories";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { TbShoppingCartX } from "react-icons/tb";
import { FaRegFilePdf } from "react-icons/fa6";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";

const OrderManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
  };
 
  type ColumnType = {
    key: string;
    header: string;
    type: "checkbox" | "text" | "status" | "action";
    statusStyles?: (status: string) => void;
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
  
  const columns: ColumnType[] = [
    { key: "checkbox", header: "", type: "checkbox" },
    { key: "index", header: "S. No.", type: "text" },
    { key: "customerName", header: "Customer Name", type: "text" },
    { key: "orderId", header: "Order Id", type: "text" },
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
  const data: DataType[] = [
    {
      index: "01",
      customerName: "Sumit Chouhan",
      orderId: "123456CDFbr",
      orderDate: "14/08/2024", 
      totalAmount: "₹677",  
      status: "Pending",         
    },
    {
      index: "02",
      customerName: "Raja Prajapati",
      orderId: "123456CDFbr",
      orderDate: "14/08/2024",
      totalAmount: "₹789",
      status: "Completed",
    },
    {
      index: "03",
      customerName: "Aavesh Khanna",
      orderId: "123456CDFbr",
      orderDate: "14/08/2024",
      totalAmount: "₹999",
      status: "Cancelled",
    },
    {
      index: "04",
      customerName: "Sapna Trivedi",
      orderId: "123456CDFbr",
      orderDate: "14/08/2024",
      totalAmount: "₹125",
      status: "Pending",
    },
    {
      index: "05",
      customerName: "Prashant Yadav",
      orderId: "123456CDFbr",
      orderDate: "14/08/2024",
      totalAmount: "₹5",
      status: "Completed",
    },
    {
      index: "06",
      customerName: "Nimish Obroy",
      orderId: "123456CDFbr",
      orderDate: "14/08/2024",
      totalAmount: "₹2000",
      status: "Cancelled",
    },
  ];
  
  
  const actions: ActionType[] = [
    {
      label: "View Details",
      onClick: (row) => navigate(redirectAdminRoutes.orderManagement.viewOrder),
      icon: <MdOutlineRemoveRedEye />,
    },
    
    {
      label: "Update Status",
      onClick: (row) => setShowDeleteModal(true),
      icon: <MdOutlineEdit />,
    },
    {
        label: "Cancel Order",
        onClick: (row) => handleOpenModal(),
        icon: <TbShoppingCartX />,
      },
      
      {
        label: "Download",
        onClick: (row) => setShowDeleteModal(true),
        icon: <FaRegFilePdf />,
      },
  ];

  const offer = {
    title: "Holiday Mega Sale - 25% Off!",
    status: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis.",
    discountType: "fixed",
    discountValue: 100,
    startDate: "14/08/2024",
    endDate: "14/08/2024",

    products: [
      {
        name: "Oragne",
        category: "Fruits",
        productImg: image1,
      },
      {
        name: "Apple",
        category: "Fruits",
        productImg: image2,
      }, {
        name: "Kiwi",
        category: "Fruits",
        productImg: image3,
      },
    ],
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
        <Col
          lg={8}
          md={4}
          className="d-flex justify-content-end align-items-center mt-3 mt-md-0"
        >
          <button className="d-flex align-items-center justify-content-center rounded border bg-white text-danger me-3 p-2">
                    <RiDeleteBin5Fill size={16} />
                  </button>
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
