import { useFormik } from "formik";
import { signUpSchema } from "../../../schema/auth";
const useSignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });
  return {
    formik,
  };
};

export default useSignUp;
