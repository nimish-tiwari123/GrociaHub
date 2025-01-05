import { loginSchema } from "../../../schema/auth";
import { useLoginMutation } from "../../../api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation();
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
        localStorage.setItem("userId", response?.userId);
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
    isLoading,
  };
};

export default useLogin;
