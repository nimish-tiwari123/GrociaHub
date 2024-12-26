import { loginSchema } from "../../../schema/auth";
import { useLoginMutation } from "../../../../api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { redirectAuthRoutesConstants } from "../../../routes/auth/authRoutesConstants";

const useLogin = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await login(values).unwrap();
        toast.success(response?.message);
        console.log(response?.message);
        resetForm();
        navigate("/");
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

export default useLogin;
