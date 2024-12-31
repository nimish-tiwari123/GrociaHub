import React from "react";
import "./style.css";

const CategorySkeleton: React.FC = () => {
  return (
    <div className="card category-skeleton">
      {/* Top Image Skeleton */}
      <div className="skeleton-image"></div>

      {/* Name Skeleton */}
      <div className="card-body">
        <div className="skeleton-name"></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
