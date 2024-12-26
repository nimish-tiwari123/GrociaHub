import { AuthTextInput, Button } from "../../../components/common";
import { Link, useParams, useNavigate } from "react-router-dom";
import { redirectAuthRoutesConstants } from "../../../routes/auth/authRoutesConstants";
import useCreatePassword from "./useCreatePassword";
import { useEffect } from "react";
import { toast } from "react-toastify";

const jwtRegex = /^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+){2}$/;

const CreatePassword = () => {
  const { token } = useParams();
  const { formik } = useCreatePassword(token as string);
  const navigate = useNavigate();

  const isValidJwt = (token: any) => {
    return jwtRegex.test(token);
  };

  useEffect(() => {
    if (!isValidJwt(token)) {
      toast.error("Invalid or expired token. Redirecting to login...");
      navigate(redirectAuthRoutesConstants.login);
    }
  }, [token, navigate]);

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

export default CreatePassword;
