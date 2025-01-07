import { useState, useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { useCartStore } from "../../../store/useCartStore";
import "./style.css";

// Type Definitions
type CategoryType = {
  _id: string;
  name: string;
  image: string;
};

type ProductDataType = {
  _id: string;
  name: string;
  category: CategoryType; // Referring to the Category type
  description: string;
  price: number;
  discount: number;
  images: string[]; // Array of image URLs
  quantity: number;
  rating: number;
  stockStatus: string;
  unit: string;
};

type ProductCardProps = {
  productData: ProductDataType;
};

const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const userId = localStorage.getItem("userId");

  // Check if the product is already in the cart
  const checkProductInCart = () => {
    const cart = Array.isArray(JSON.parse(localStorage.getItem("cart") || "[]"))
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];
    return cart.some(
      (item: ProductDataType) =>
        item.name === productData.name && item.unit === productData.unit
    );
  };

  useEffect(() => {
    setIsAddedToCart(checkProductInCart());
  }, [productData]);

  const handleAddToCart = () => {
    if (isAddedToCart) {
      toast.info("This product is already in the cart!");
      return;
    } else if (!userId) {
      toast.info("Please Login first!");
    } else {
      const cart = Array.isArray(
        JSON.parse(localStorage.getItem("cart") || "[]")
      )
        ? JSON.parse(localStorage.getItem("cart") || "[]")
        : [];
      cart.push(productData);
      localStorage.setItem("cart", JSON.stringify(cart));

      addToCart(productData);
      setIsAddedToCart(true);
      toast.success("Product added to cart!");
    }
  };

  // Render star ratings
  const renderStars = (rating: number) => {
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
    <div className="border mt-3 rounded p-3 cursor-pointer">
      {/* Product Image */}
      <img
        src={productData.images[0]}
        alt={productData.name}
        className="product-image w-100"
      />
      {/* Product Category */}
      <p className="m-0 opacity-75 fs-7">{productData.category.name}</p>
      {/* Product Name */}
      <p className="product-name">{productData.name}</p>
      {/* Product Rating */}
      {/* <div className="d-flex align-items-center mb-2">
        {renderStars(productData.rating)}
        <span className="fs-7 opacity-50 ms-2">({productData.rating})</span>
      </div> */}
      {/* Product Price and Discount */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="text-custom-primary fw-bold">
            &#8377;{productData.price}
          </span>
          {productData.discount > 0 && (
            <span className="text-decoration-line-through opacity-50 ms-1">
              &#8377;{productData.discount}
            </span>
          )}
        </div>
        <button
          className={`fs-7 border-0 px-2 py-1 rounded-1 ${
            isAddedToCart ? "bg-success text-white" : "bg-cart-btn"
          }`}
          onClick={handleAddToCart}
        >
          <LuShoppingCart /> {isAddedToCart ? "Added" : "Add"}
        </button>
      </div>
      {/* View Product Button */}
      <button
        className="p-2 rounded view-product-btn w-100 mt-3 text-custom-primary fw-medium"
        onClick={() => navigate(userRoutesConstants.viewProduct)}
      >
        View
      </button>
    </div>
  );
};

export default ProductCard;
