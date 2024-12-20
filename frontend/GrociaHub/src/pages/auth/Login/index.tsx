import { AuthTextInput, Button } from "../../../components/common";
import { Link } from "react-router-dom";
import { redirectAuthRoutesConstants } from "../../../routes/auth/authRoutesConstants";
import useLogin from "./useLogin";

const Login = () => {
  const { formik } = useLogin();
  return (
    <div className="login-container">
      <h1 className="fw-bold my-3 fs-3 text-center">Login to your account</h1>
      <form onSubmit={formik.handleSubmit}>
        <AuthTextInput
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          formik={formik}
        />

        <AuthTextInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          formik={formik}
        />

        <div className="d-flex justify-content-between align-items-center my-3">
          <Link
            to={redirectAuthRoutesConstants.forgotPassword}
            className="forgot-password text-custom-primary text-decoration-none fw-medium ms-auto"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          btnLabel="Login Now"
          btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 w-100 rounded-2 d-flex justify-content-center mt-4"
        />
      </form>
    </div>
  );
};

export default Login;
