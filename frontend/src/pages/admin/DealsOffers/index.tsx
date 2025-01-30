import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { SearchField, Pagination } from "../../../components/admin";
import { Button, CustomTable } from "../../../components/common";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal, OfferModal } from "../../../Modals";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
import {
  useViewOffersQuery,
  useDeleteOfferMutation,
} from "../../../api/adminService";
import { toast } from "react-toastify";

const DealsOffers: React.FC = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOffer, { isLoading: deleteLoading }] = useDeleteOfferMutation();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [offerDataModal, setOfferDataModal] = useState<any>("");
  const pageSize = 5;
  console.log(offerDataModal);
  // Fetch data using API
  const {
    data: offerData,
    isLoading,
    error,
  } = useViewOffersQuery({
    searchTerm,
    currentPage,
    pageSize,
  });

  const totalPages = offerData?.totalPages || 1;
  const offers = offerData?.dealsAndOffers || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateOffer = () => {
    navigate(redirectAdminRoutes.dealsAndOffers.create);
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

  const columns: ColumnType[] = [
    { key: "index", header: "S. No.", type: "text" },
    { key: "offerTitle", header: "Offer Title", type: "text" },
    { key: "startDate", header: "Start Date", type: "text" },
    { key: "endDate", header: "End Date", type: "text" },
    { key: "discountValue", header: "Discount", type: "text" },

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

  const handleViewModal = (offerData: any) => {
    setShowModal(true);
    setOfferDataModal(offerData);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  const truncateTitle = (title: string, wordLimit: number) => {
    const words = title.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : title;
  };
  
  const data: DataType[] = offers?.map((offer: any, index: number) => ({
    index: (currentPage - 1) * pageSize + index + 1,
    id: offer._id,
    offerTitle: truncateTitle(offer.title, 3),
    startDate: formatDate(offer.startDate),
    endDate: formatDate(offer.endDate),
    discountType: offer.discountType,
    discountValue:
      offer.discountType === "percentage"
        ? `${offer.discountValue} %`
        : `₹ ${offer.discountValue}`,
    status: offer.status,
  }));

  const actions = [
    {
      label: "View",
      onClick: (row: any) => handleViewModal(row),
      icon: <MdOutlineRemoveRedEye />,
    },
    {
      label: "Edit",
      onClick: () => navigate("/"),
      icon: <MdOutlineEdit />,
    },
    {
      label: "Delete",
      onClick: (row: any) => {
        setOfferDataModal(row);
        setShowDeleteModal(true);
      },
      icon: <RiDeleteBinLine />,
    },
  ];
  const handleDeleteConfirm = async (id: string) => {
    console.log(id);
    try {
      const response = await deleteOffer(id).unwrap();
      toast.success(response?.message || "Offer deleted successfully");
      setShowDeleteModal(false);
      setCurrentPage(1);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to offer product");
    }
  };

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
            {isLoading || deleteLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">Failed to load offers.</p>
            ) : (
              <>
                <CustomTable columns={columns} data={data} actions={actions} />
                <div className="mt-5 mb-3 d-flex justify-content-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
      <DeleteModal
        show={showDeleteModal}
        heading="Delete Product"
        subheading={`Are you sure you want to delete the Offer "${offerDataModal?.offerTitle}"?`}
        onDelete={() => handleDeleteConfirm(offerDataModal?.id || "")}
        onCancel={() => setShowDeleteModal(false)}
      />

      <OfferModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        offer={offerDataModal}
      />
    </Container>
  );
};

export default DealsOffers;
