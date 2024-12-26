import { signUpSchema } from "../../../schema/auth";
import { useRegisterMutation } from "../../../../api";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const useSignUp = () => {
  const [register] = useRegisterMutation();

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

export default useSignUp;
