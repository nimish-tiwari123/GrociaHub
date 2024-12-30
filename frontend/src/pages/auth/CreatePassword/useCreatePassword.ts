import { useFormik } from "formik";
import { createPasswordSchema } from "../../../schema/auth";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../../api";
import { useNavigate } from "react-router-dom";
import { redirectAuthRoutesConstants } from "../../../routes/auth/authRoutesConstants";

const useCreatePassword = (token: string) => {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: createPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = { body: { newPassword: values.password }, token };
        const response = await resetPassword(payload).unwrap();
        toast.success(response?.message);
        console.log(response?.message);
        navigate(redirectAuthRoutesConstants.login);
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

export default useCreatePassword;
