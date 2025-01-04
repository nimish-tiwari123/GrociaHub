import { useState, useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { useCartStore } from "../../../store/useCartStore";
import "./style.css";

type ProductDataType = {
  image: string;
  name: string;
  category: string;
  weight: string;
  rating: number;
  price: number;
  discountPrice: number;
  quantity: number;
};

type ProductCardProps = {
  productData: ProductDataType;
};

const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Improved logic to handle cart checking
  const checkProductInCart = () => {
    const cart = Array.isArray(JSON.parse(localStorage.getItem("cart") || "[]"))
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];
    return cart.some(
      (item: ProductDataType) =>
        item.name === productData.name && item.weight === productData.weight
    );
  };

  useEffect(() => {
    // Check if the product is already in the cart
    setIsAddedToCart(checkProductInCart());
  }, [productData]); // Dependencies for only productData changes

  const handleAddToCart = () => {
    if (isAddedToCart) {
      toast.info("This product is already in the cart!");
      return;
    }

    const cart = Array.isArray(JSON.parse(localStorage.getItem("cart") || "[]"))
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];
    cart.push(productData);
    localStorage.setItem("cart", JSON.stringify(cart));

    addToCart(productData);
    setIsAddedToCart(true);
    toast.success("Product added to cart!");
  };

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
        {renderStars(productData.rating)}
        <span className="fs-7 opacity-50 ms-2">({productData.rating})</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="text-custom-primary fw-bold">
            &#8377;{productData.price}
          </span>
          <span className="text-decoration-line-through opacity-50 ms-1">
            &#8377;{productData.discountPrice}
          </span>
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
