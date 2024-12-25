import { FC, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import "./style.css";
interface AuthTextInputProps {
  type?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  formik: any;
  icon?: React.ElementType;
}

const AuthTextInput: FC<AuthTextInputProps> = ({
  type = "text",
  name,
  label,
  disabled = false,
  placeholder = "",
  formik,
  icon: Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label mt-3 fw-medium">
          {label}
        </label>
      )}
      <div className="input-wrapper position-relative">
        {Icon && <Icon className="input-icon" />}
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          id={name}
          disabled={disabled}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name] || ""}
          className="bg-custom-secondary border fs-7 px-3 py-2 w-100 rounded-2 input-focus"
        />
        {type === "password" && (
          <button
            type="button"
            className="password-toggle-btn position-absolute end-0 me-2 border-0 bg-transparent opacity-50"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-danger error err1 fs-7">{formik.errors[name]}</div>
      ) : (
        <div className="error-placeholder"></div>
      )}
    </div>
  );
};

export default AuthTextInput;
