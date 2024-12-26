import { useForgotPasswordMutation } from "../../../../api";
import { forgotPasswordSchema } from "../../../schema/auth";
import { toast } from "react-toastify";
import { useFormik } from "formik";

const useForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await forgotPassword(values).unwrap();
        toast.success(response?.message);
        console.log(response?.message);
        resetForm();
      } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong");
        console.log(error?.data?.message || "Something went wrong");
      }
    },
  });
  return {
    formik,
  };
};

export default useForgotPassword;
