import React from "react";
import { Modal, Button } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
interface LogoutModalProps {
  show: boolean;
  handleClose: () => void;
  handleLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  show,
  handleClose,
  handleLogout,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="position-relative p-4">
        <button
          className="opacity-50 position-absolute top-0 end-0 m-2 border-0 bg-transparent"
          onClick={handleClose}
        >
          <IoMdClose size={24} />
        </button>
        <Modal.Title className="fw-bold">Log Out?</Modal.Title>
        <p className="fw-medium opacity-50 my-4 fs-5">
          Are you sure you want to log out?
        </p>{" "}
        <div className="d-flex justify-content-center gap-3 my-4">
          <button
            className="bg-custom-secondary py-2 px-4 border rounded fw-medium"
            onClick={handleClose}
          >
            Cancel
          </button>
          <Button variant="danger" className="py-2 px-4" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
