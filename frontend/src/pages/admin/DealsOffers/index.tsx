import { Container, Row, Col } from "react-bootstrap";
import React, { ReactNode, useState } from "react";
import { SearchField, Pagination } from "../../../components/admin";
import { Button, CustomTable } from "../../../components/common";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal, OfferModal } from "../../../Modals";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
import { image1, image2, image3 } from "../../../assets/categories";
const DealsOffers: React.FC = () => {
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
  const handleCreateOffer = () => {
    navigate(redirectAdminRoutes.dealsAndOffers.createOffer);
  };
  type ColumnType = {
    key: string;
    header: string;
    type: "checkbox" | "text" | "toggler" | "action";
    togglerHandler?: (value: boolean, row: DataType) => void;
  };

  type DataType = {
    index: string;
    offerTitle: string;
    startDate: string;
    endDate: string;
    discountType: string;
    status: boolean;
  };

  type ActionType = {
    label: string;
    onClick: (row: DataType) => void;
    icon: ReactNode;
  };

  const columns: ColumnType[] = [
    { key: "checkbox", header: "", type: "checkbox" },
    { key: "index", header: "S. No.", type: "text" },
    { key: "offerTitle", header: "Offer Title", type: "text" },
    { key: "startDate", header: "Start Date", type: "text" },
    { key: "endDate", header: "End Date", type: "text" },
    { key: "discountType", header: "Discount Type", type: "text" },
    {
      key: "status",
      header: "Status",
      type: "toggler",
      togglerHandler: (value, row) => {
        row.status = value;
        console.log("Toggled:", row);
      },
    },
  ];

  const data: DataType[] = [
    {
      index: "01",
      offerTitle: "Holiday Mega Sale",
      startDate: "14/08/2024",
      endDate: "14/08/2024",
      discountType: "Percentage(%)",
      status: false,
    },
    {
      index: "02",
      offerTitle: "Holiday Mega Sale",
      startDate: "14/08/2024",
      endDate: "14/08/2024",
      discountType: "Fixed",
      status: true,
    },
    {
      index: "03",
      offerTitle: "Holiday Mega Sale",
      startDate: "14/08/2024",
      endDate: "14/08/2024",
      discountType: "Percentage(%)",
      status: false,
    },
    {
      index: "04",
      offerTitle: "Holiday Mega Sale",
      startDate: "14/08/2024",
      endDate: "14/08/2024",
      discountType: "Fixed",
      status: true,
    },
    {
      index: "05",
      offerTitle: "Holiday Mega Sale",
      startDate: "14/08/2024",
      endDate: "14/08/2024",
      discountType: "Percentage(%)",
      status: false,
    },
    {
      index: "06",
      offerTitle: "Holiday Mega Sale",
      startDate: "14/08/2024",
      endDate: "14/08/2024",
      discountType: "Fixed",
      status: true,
    },
  ];

  const actions: ActionType[] = [
    {
      label: "View",
      onClick: (row) => handleOpenModal(),
      icon: <MdOutlineRemoveRedEye />,
    },
    {
      label: "Edit",
      onClick: (row) => navigate("/"),
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

  // Example usage
  data.forEach((row) => toggleStatus(row));

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
          <h1 className="fw-bold fs-3 m-0 mt-md-3">Discount & Offers</h1>
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
          <span>Discount & Offers</span>
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
            btnLabel="+ Create Offer"
            btnStyle="bg-custom-primary border-0 text-light fw-medium rounded p-2 "
            onClick={handleCreateOffer}
          />
        </Col>
      </Row>
      <Row className="mt-3 px-2 px-md-1">
        <Col>
          <div className="bg-white p-3 custom-shadow rounded border mb-3">
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
      <OfferModal
        show={showModal}
        handleClose={handleCloseModal}
        offer={offer}
      />
    </Container>
  );
};

export default DealsOffers;
