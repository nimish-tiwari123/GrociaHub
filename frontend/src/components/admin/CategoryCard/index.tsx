// components/CategoryCard.tsx
import { FC, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { Button } from "react-bootstrap";
import { DeleteModal } from "../../../Modals";
import "./style.css";

interface CategoryCardProps {
  image: string;
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CategoryCard: FC<CategoryCardProps> = ({
  image,
  name,
  onEdit,
  onDelete,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete();
  };
  return (
    <div className="position-relative bg-white rounded border">
      <img
        src={image}
        alt={name}
        className="w-75 d-block m-auto mt-4 category-admin-img"
      />
      <h5 className="text-center mt-2 mb-3 fs-6">
        {name?.length > 20 ? `${name.slice(0, 20)}...` : name}
      </h5>

      <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
        <Button
          className="d-flex align-items-center justifycontent-center category-action-btn shadow-sm text-primary rounded-circle bg-white border"
          onClick={onEdit}
          aria-label="Edit"
          style={{ padding: "6px" }}
        >
          <MdOutlineModeEdit />
        </Button>
        <Button
          className="d-flex align-items-center justifycontent-center category-action-btn shadow-sm text-danger rounded-circle bg-white border"
          onClick={handleDeleteClick}
          aria-label="Delete"
          style={{ padding: "6px" }}
        >
          <FiTrash2 />
        </Button>
      </div>
      <DeleteModal
        show={showDeleteModal}
        heading="Delete Category"
        subheading={
          <>
            Are you sure you want to delete the category{" "}
            <span className="text-danger">"{name}"</span>? This action cannot be
            undone.
          </>
        }
        onDelete={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CategoryCard;
