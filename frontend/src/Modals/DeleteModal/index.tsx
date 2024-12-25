// components/DeleteModal.tsx
import { FC } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

interface DeleteModalProps {
  show: boolean;
  heading: string;
  subheading: string;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  show,
  heading,
  subheading,
  onDelete,
  onCancel,
}) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
          <Modal.Body className="position-relative p-4">
            <button
              className="opacity-50 position-absolute top-0 end-0 m-2 border-0 bg-transparent"
              onClick={onCancel}
            >
              <IoMdClose size={24} />
            </button>
            <Modal.Title className="fw-bold">{heading}</Modal.Title>
            <p className="fw-medium opacity-50 my-4 fs-5">
              {subheading}
            </p>{" "}
            <div className="d-flex justify-content-end gap-3 mt-4">
              <button
                className="bg-custom-secondary py-2 px-4 border rounded fw-medium"
                onClick={onCancel}
              >
                Cancel
              </button>
              <Button variant="danger" className="py-2 px-4" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>

  );
};

export default DeleteModal;
