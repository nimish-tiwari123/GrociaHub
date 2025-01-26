import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { SearchField, Pagination } from "../../../components/admin";
import { CustomTable, NoData, TableSkeleton } from "../../../components/common";
import { Link } from "react-router-dom";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { useGetAllUsersQuery } from "../../../api/adminService";

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
  const pageSize = 5;

  const {
    data: userData,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery({ searchTerm, currentPage, pageSize });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleViewUser = (user: DataType) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleCloseModal = () => {
    setShowViewModal(false);
    setSelectedUser(null);
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
    userName: string;
    emailAddress: string;
    mobileNumber: string;
    registrationDate: string;
  };

  const columns: any = [
    { key: "index", header: "S. No.", type: "text" },
    { key: "emailAddress", header: "Email Address", type: "text" },
    { key: "userName", header: "User", type: "text" },
    { key: "mobileNumber", header: "Mobile Number", type: "text" },
    { key: "registrationDate", header: "Registration Date", type: "text" },
  ];

  const data: DataType[] =
    userData?.users.map((user: any, index: number) => ({
      index: String(index + 1).padStart(2, "0"),
      userName: user.name,
      emailAddress: user.email,
      mobileNumber: user.mobile || "N/A",
      registrationDate: formatDate(user.createdAt),
    })) || [];

  const actions = [
    {
      label: "View",
      onClick: (row: DataType) => handleViewUser(row),
      icon: <MdOutlineRemoveRedEye />,
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
      </Row>
      <Row className="mt-3 px-2 px-md-1">
        <Col>
          <div className="bg-white p-3 custom-shadow rounded border custom-shadow mb-3">
            {isLoading || isFetching ? (
              <TableSkeleton />
            ) : data.length === 0 ? (
              <NoData />
            ) : (
              <>
                <CustomTable columns={columns} data={data} actions={actions} />
                <div className="mt-2 mb-1 d-flex justify-content-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={userData?.pagination?.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>

      <Modal show={showViewModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>
                <strong>Name:</strong> {selectedUser.userName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.emailAddress}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedUser.mobileNumber}
              </p>
              <p>
                <strong>Registration Date:</strong>{" "}
                {selectedUser.registrationDate}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserManagement;
