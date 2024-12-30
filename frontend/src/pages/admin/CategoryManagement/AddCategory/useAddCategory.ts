import { useAddCategoryMutation } from "../../../../api/adminService"; 
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { categorySchema } from "../../../../schema/admin/CategoryManagement";
import { redirectAdminRoutes } from "../../../../routes/admin/adminRoutesConstants";

const useAddCategory = () => {
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values, { resetForm }) => {
     const categoryData = new FormData();

     categoryData.append("name", values.name);
     categoryData.append("image", values.image);
      try {
        const response = await addCategory(categoryData).unwrap();
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
  return {
    formik,
    isLoading,
  };
};

export default useAddCategory;
