import { LuShoppingCart } from "react-icons/lu";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";

const ProductCard = ({ productData }) => {
const navigate = useNavigate();
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        stars.push(<FaStar key={i} className="opacity-25" />);
      }
    }
    return stars;
  };

  return (
    <div className="border mt-3 rounded p-3 cursor-pointer" onClick={()=>navigate(userRoutesConstants.viewProduct)}>
      <img
        src={productData.image}
        alt={productData.name}
        className="d-block w-75 m-auto"
      />
      <p className="m-0 opacity-75 fs-7">{productData.category}</p>
      <p className="fw-bold">
        {productData.name} {productData.weight}
      </p>
      <div className="d-flex align-items-center mb-2">
        {renderStars(productData.rating)}{" "}
        <span className="fs-7 opacity-50">({productData.rating})</span>
      </div>
      <div className="d-flex flex-card-bottom justify-content-between align-items-center">
        <div>
          <span className="text-custom-primary fw-bold">
            &#8377;{productData.price}
          </span>
          <span className="text-decoration-line-through opacity-50 ms-1">
            &#8377;{productData.discountPrice}
          </span>
        </div>
        <button className="text-custom-primary fs-7 border-0 px-2 py-1 rounded-1 bg-cart-btn">
          <LuShoppingCart /> Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
