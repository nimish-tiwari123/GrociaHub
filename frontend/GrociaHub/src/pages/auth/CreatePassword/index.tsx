import { AuthTextInput, Button } from "../../../components/common";
import { Link } from "react-router-dom";
import { redirectAuthRoutesConstants } from "../../../routes/auth/authRoutesConstants";
import usecreatePassword from "./useCreatePassword";

const SignUp = () => {
  const { formik } = usecreatePassword();
  return (
    <div className="createPassword-container">
      <h1 className="fw-bold my-3 fs-3 text-center">Create New Password</h1>
      <form onSubmit={formik.handleSubmit}>
        <AuthTextInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          formik={formik}
        />
        <AuthTextInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter your confirm password"
          formik={formik}
        />

        <Button
          btnLabel="Save"
          btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 w-100 rounded-2 d-flex justify-content-center mt-5"
        />
        <div className="text-center mt-3">
          <Link
            to={redirectAuthRoutesConstants.login}
            className="forgot-password text-custom-primary text-decoration-none fw-medium ms-1"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
