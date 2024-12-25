import { loginSchema } from "../../../schema/auth";
import { useLoginMutation } from "../../../../api";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const useLogin = () => {
  const [login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await login(values).unwrap();
        toast.success(response.message);
        console.log(response.message);
        resetForm();
      } catch (error: any) {
        toast.error(error.data.message);
        console.log(error.data.message);
      }
    },
  });
  return {
    formik,
  };
};

export default useLogin;
