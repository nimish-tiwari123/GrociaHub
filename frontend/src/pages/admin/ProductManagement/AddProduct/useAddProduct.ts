import { useState } from "react";
import { toast } from "react-toastify";
import { useAddProductMutation } from "../../../../api/adminService";
import { productSchema } from "../../../../schema/admin/ProductManagement";
import { useFormik } from "formik";

export const useAddProduct = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [isActive, setIsActive] = useState(false);

  const formik = useFormik({
    initialValues: {
      productName: "",
      category: "",
      productDescription: "",
      price: "",
      discountPrice: "",
      stockQuantity: "",
      stockStatus: "",
      images: [], 
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        
        // Append each value to FormData
        formData.append("name", values.productName);
        formData.append("category", values.category);
        formData.append("description", values.productDescription);
        formData.append("price", values.price);
        formData.append("discount", values.discountPrice);
        formData.append("stockQuantity", values.stockQuantity);
        formData.append("stockStatus", values.stockStatus);
        formData.append("isActive", isActive ? "true" : "false");

        // Append multiple images
        values.images.forEach((image) => {
          formData.append("images", image);
        });

        // Send the FormData payload
        const response = await addProduct(formData).unwrap();
        toast.success(response?.message);
      } catch (err: any) {
        console.error(err);
        toast.error(err?.data?.message || "An error occurred while adding the product.");
      }
    },
  });

  return {
    formik,
    isLoading,
    isActive,
    setIsActive,
  };
};
