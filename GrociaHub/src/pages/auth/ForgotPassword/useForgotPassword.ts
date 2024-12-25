import { useFormik } from "formik";
import { forgotPasswordSchema } from "../../../schema/auth";
const useForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });
  return {
    formik,
  };
};

export default useForgotPassword;
