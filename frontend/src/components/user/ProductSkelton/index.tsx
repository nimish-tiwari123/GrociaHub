import "./style.css";

const ProductSkeleton: React.FC = () => {
  return (
    <div className="product-skeleton-card border mt-3 rounded p-3">
      <div className="product-skeleton-image mb-2"></div>
      <div className="product-skeleton-text product-skeleton-category mb-1"></div>
      <div className="product-skeleton-text product-skeleton-name mb-2"></div>
      <div className="d-flex align-items-center mb-2">
        <div className="product-skeleton-star"></div>
        <div className="product-skeleton-star"></div>
        <div className="product-skeleton-star"></div>
        <div className="product-skeleton-star"></div>
        <div className="product-skeleton-star"></div>
        <span className="product-skeleton-text product-skeleton-rating ms-2"></span>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="product-skeleton-text product-skeleton-price"></div>
        <div className="product-skeleton-button"></div>
      </div>
      <div className="product-skeleton-text product-skeleton-view-button"></div>
    </div>
  );
};

export default ProductSkeleton;
