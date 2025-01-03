import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useViewCategoryQuery,
  useViewProductByIdQuery,
} from "../../../../api/adminService";
import { productSchema } from "../../../../schema/admin/ProductManagement";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { redirectAdminRoutes } from "../../../../routes/admin/adminRoutesConstants";
export const useEditProduct = () => {
  const { id } = useParams();

  const [updateProduct, { isLoading: isLoadingAdd }] =
    useUpdateProductMutation();
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { data: productData, isLoading: isLoadingFetch } =
    useViewProductByIdQuery(id);
  const { data: categoryData, isLoading: isLoadingFetchCategory } =
    useViewCategoryQuery("");
  const formik = useFormik({
    initialValues: {
      productName: "",
      category: "",
      productDescription: "",
      price: "",
      discountPrice: "0",
      stockQuantity: "",
      stockStatus: "",
      images: [],
      unit: "kg",
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("name", values.productName);
        formData.append("category", values.category);
        formData.append("description", values.productDescription);
        formData.append("price", values.price);
        formData.append("discount", values.discountPrice);
        formData.append("quantity", values.stockQuantity);
        formData.append("stockStatus", values.stockStatus);
        formData.append("isActive", isActive ? "true" : "false");
        formData.append("unit", values.unit);

        values.images.forEach((image) => {
          formData.append("images", image);
        });
        const response = await updateProduct({ id, formData }).unwrap();
        toast.success(response?.message);
        navigate(redirectAdminRoutes.productManagement.view);
      } catch (err: any) {
        console.error(err);
        toast.error(
          err?.data?.message || "An error occurred while adding the product."
        );
      }
    },
  });
  useEffect(() => {
    if (productData) {
      formik.setFieldValue("productName", productData?.product?.name || "");
      formik.setFieldValue(
        "category",
        productData?.product?.category?.name || ""
      );
      formik.setFieldValue(
        "productDescription",
        productData?.product?.description || ""
      );
      formik.setFieldValue("price", productData?.product?.price || "");
      formik.setFieldValue(
        "discountPrice",
        productData?.product?.discount || "0"
      );
      formik.setFieldValue(
        "stockQuantity",
        productData?.product?.quantity || ""
      );
      formik.setFieldValue(
        "stockStatus",
        productData?.product?.stockStatus || ""
      );
      formik.setFieldValue("images", productData?.product?.images || "");

      setIsActive(productData?.product?.isActive || false);
    }
  }, [productData]);

  return {
    formik,
    isActive,
    setIsActive,
    isLoadingAdd,
    isLoadingFetch,
    categoryData,
    isLoadingFetchCategory,
  };
};
