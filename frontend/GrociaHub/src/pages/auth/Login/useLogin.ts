import { useFormik } from "formik";
import { loginSchema } from "../../../schema/auth";
const useLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });
  return {
    formik,
  };
};

export default useLogin;
