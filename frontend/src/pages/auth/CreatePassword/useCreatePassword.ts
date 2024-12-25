import { useFormik } from "formik";
import { createPasswordSchema } from "../../../schema/auth";
const useCreatePassword = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: createPasswordSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });
  return {
    formik,
  };
};

export default useCreatePassword;
