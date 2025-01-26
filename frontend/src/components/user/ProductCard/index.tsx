import { useState, useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartStore } from "../../../store/useCartStore";
import "./style.css";

// Define types
interface Category {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  category: Category;
  discount: number;
  images: [string];
  quantity: number;
  rating: number;
  stockStatus: string;
  unit: string;
   image: string;
  weight: number;
  discountPrice: number;
}
interface ProductCardProps {
  productData: Product; 
}

const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
  const navigate = useNavigate();
  const addToCart:any = useCartStore((state) => state.addToCart);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const userId = localStorage.getItem("userId");

  // Check if the product is already in the cart
  const checkProductInCart = () => {
    const cart = Array.isArray(JSON.parse(localStorage.getItem("cart") || "[]"))
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];
    return cart.some(
      (item: Product) =>
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

  

  return (
    <div className="border mt-3 rounded p-3 cursor-pointer">
      <img
        src={productData.images[0]}
        alt={productData.name}
        className="product-image w-100"
      />
      <p className="m-0 opacity-75 fs-7">{productData.category.name}</p>
      <p className="product-name">{productData.name}</p>
     
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
      <button
        className="p-2 rounded view-product-btn w-100 mt-3 text-custom-primary fw-medium"
        onClick={() => navigate(`/view-product/${productData._id}`)}
      >
        View
      </button>
    </div>
  );
};

export default ProductCard;
