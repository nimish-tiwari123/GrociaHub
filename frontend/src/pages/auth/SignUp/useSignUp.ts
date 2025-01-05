import { signUpSchema } from "../../../schema/auth";
import { useRegisterMutation } from "../../../api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authRoutesConstants } from "../../../routes/auth/authRoutesConstants";
const useSignUp = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        const response = await register(payload).unwrap();
        toast.success(response?.message);
        navigate(`/auth${authRoutesConstants.login}`);
        resetForm();
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

export default useSignUp;
