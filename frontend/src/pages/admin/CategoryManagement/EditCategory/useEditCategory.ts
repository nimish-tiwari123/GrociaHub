import {
  useEditCategoryMutation,
  useViewCategoryByIdQuery,
} from "../../../../api/adminService";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { categorySchema } from "../../../../schema/admin/CategoryManagement";
import { redirectAdminRoutes } from "../../../../routes/admin/adminRoutesConstants";
import { useEffect } from "react";

const useEditCategory = () => {
  const { id } = useParams();
  const { data, isLoading: loadingId } = useViewCategoryByIdQuery(id);
  const [editCategory, { isLoading: loading }] = useEditCategoryMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      image: data?.category?.image,
    },
    validationSchema: categorySchema,
    onSubmit: async (values, { resetForm }) => {
      const categoryData = new FormData();

      categoryData.append("name", values.name);
      categoryData.append("image", values.image);
      try {
        const response = await editCategory({
          id,
          categoryData,
        }).unwrap();
        toast.success(response?.message);
        console.log(response?.message);
        resetForm();
        navigate(redirectAdminRoutes.categoryManagement.view);
      } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong");
        console.log(error?.data?.message || "Something went wrong");
      }
    },
  });
  useEffect(() => {
    formik.setFieldValue("name", data?.category?.name);
    formik.setFieldValue("image", data?.category?.image);
  }, [data]);
  return {
    formik,
    loading,
    loadingId,
  };
};

export default useEditCategory;
