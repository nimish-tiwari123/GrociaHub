import { AuthTextInput, Button } from "../../../components/common";
import { Link } from "react-router-dom";
import { redirectAuthRoutesConstants } from "../../../routes/auth/authRoutesConstants";
import useForgotPassword from "./useForgotPassword";

const ForgotPassword = () => {
  const { formik } = useForgotPassword();
  return (
    <div className="forgot-container">
      <h1 className="fw-bold my-3 fs-3 text-center">Forgot Password?</h1>
      <form onSubmit={formik.handleSubmit}>
        <AuthTextInput
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          formik={formik}
        />

        <Button
          btnLabel="Send Mail"
          btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 w-100 rounded-2 d-flex justify-content-center mt-5"
        />
        <div className="d-flex justify-content-between align-items-center my-3">
          <Link
            to={redirectAuthRoutesConstants.login}
            className="text-custom-primary text-decoration-none fw-medium m-auto"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
