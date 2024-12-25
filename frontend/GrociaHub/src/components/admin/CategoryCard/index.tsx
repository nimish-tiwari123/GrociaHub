// components/CategoryCard.tsx
import { FC } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Card, Button } from "react-bootstrap";

interface CategoryCardProps {
  image: string;
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CategoryCard: FC<CategoryCardProps> = ({ image, name, onEdit, onDelete }) => {
  return (
    <div className="position-relative bg-white rounded border">
      <img src={image} alt={name} className="w-75 d-block m-auto mt-4"/>
      <h5 className="text-center mt-2 mb-3">{name}</h5>
    
      <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
        <Button
          className="d-flex align-items-center p-2 shadow-sm text-primary rounded-circle bg-white border"
          onClick={onEdit}
          aria-label="Edit"
        >
          <FiEdit2 />
        </Button>
        <Button
          className="d-flex align-items-center p-2 shadow-sm text-danger rounded-circle bg-white border"
          onClick={onDelete}
          aria-label="Delete"
        >
          <FiTrash2 />
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
