// src/hooks/useProduct.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useViewProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../api/adminService";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";

type DataType = {
  _id: string;
  id: string;
  name: string;
  category: {
    name: string;
  };
  index: string;
  product: string;
  images: string;
  price: string;
  stock: string;
  isActive: boolean;
  createdAt: string;
  quantity: string;
  status: boolean;
};

const useProduct = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const totalPages = 5; 

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useViewProductsQuery({searchTerm, currentPage, totalPages});
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddProduct = () => {
    navigate(redirectAdminRoutes.productManagement.add);
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      const response = await deleteProduct(id).unwrap();
      toast.success(response?.message || "Product deleted successfully");
      setShowDeleteModal(false);
      setCurrentPage(1);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete product");
    }
  };

  const toggleStatus = async (row: DataType, status: boolean) => {
    console.log(row)

    try {
      const updatedRow = { isActive: status };
      await updateProduct({ id: row.id, formData: updatedRow }).unwrap();
      toast.success("Product status updated successfully");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update product status");
    }
  };

  const convertProductsToCustomFormat = (products: DataType[]) => {
    return products?.map((product, index) => ({
      id: product._id,
      index: String(index + 1).padStart(2, "0"),
      product: product.name || "Unknown Product",
      category: product.category?.name || "Unknown Category",
      images: product.images[0] || "https://via.placeholder.com/50",
      price: `₹${product.price}`,
      stock: String(product.quantity),
      status: product.isActive,
      created: new Date(product.createdAt).toLocaleDateString("en-GB"),
    }));
  };

  return {
    searchTerm,
    currentPage,
    selectedProduct,
    showDeleteModal,
    showModal,
    productData,
    isLoading,
    isFetching,
    deleteLoading,
    isUpdating,
    totalPages,
    handleSearchChange,
    handlePageChange,
    handleAddProduct,
    handleDeleteConfirm,
    toggleStatus,
    setShowDeleteModal,
    setShowModal,
    setSelectedProduct,
    convertProductsToCustomFormat,
    
  };
};

export default useProduct;
