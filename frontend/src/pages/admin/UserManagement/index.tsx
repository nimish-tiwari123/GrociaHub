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
const UserManagement: React.FC = () => {
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
    userName: string;
    emailAddress: string;
    mobileNumber: string;
    registrationDate: string;
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
    { key: "userName", header: "User", type: "text" },
    { key: "emailAddress", header: "Email Address", type: "text" },
    { key: "mobileNumber", header: "Mobile Number", type: "text" },
    { key: "registrationDate", header: "Registration Date", type: "text" },
    {
      key: "status",
      header: "Status",
      type: "status",
      statusStyles: (status: string) => {
        let buttonClass = "";
        let buttonText = "";

        switch (status) {
         
          case "Active":
            buttonClass = "status-success-btn";
            buttonText = "Active";
            break;
          case "Blocked":
            buttonClass = "status-danger-btn";
            buttonText = "Blocked";
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
      userName: "Sumit Chouhan",
      emailAddress: "sumitc2034@...",
      mobileNumber: "8899002211",
      registrationDate: "14/08/2024",
      status: "Active",
    },
    {
      index: "02",
      userName: "Raja Prajapati",
      emailAddress: "12345CDFbr",
      mobileNumber: "8899002211",
      registrationDate: "14/08/2024",
      status: "Blocked",
    },
    {
      index: "03",
      userName: "Aavesh Khanna",
      emailAddress: "12345CDFbr",
      mobileNumber: "8899002211",
      registrationDate: "14/08/2024",
      status: "Blocked",

    },
    {
      index: "04",
      userName: "Sapna Trivedi",
      emailAddress: "12345CDFbr",
      mobileNumber: "8899002211",
      registrationDate: "14/08/2024",
      status: "Active",

    },
    {
      index: "05",
      userName: "Prashant Yadav",
      emailAddress: "12345CDFbr",
      mobileNumber: "8899002211",
      registrationDate: "14/08/2024",
      status: "Blocked",

    },
    {
      index: "06",
      userName: "Nimish Obroy",
      emailAddress: "12345CDFbr",
      mobileNumber: "8899002211",
      registrationDate: "14/08/2024",
      status: "Active",

    },
  ];
  
  const actions: ActionType[] = [
    {
      label: "View",
      onClick: (row) => handleOpenModal(),
      icon: <MdOutlineRemoveRedEye />,
    },
    
    {
      label: "Change Status",
      onClick: (row) => setShowDeleteModal(true),
      icon: <LuArrowRightLeft />,
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
          <h1 className="fw-bold fs-3 m-0 mt-md-3">Manage Users</h1>
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
          <span>Users</span>
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
        <select className="p-2 bg-white fw-medium border rounded">
          <option value="Active">Active</option>
          <option value="Active">Blocked</option>

        </select>
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

export default UserManagement;
