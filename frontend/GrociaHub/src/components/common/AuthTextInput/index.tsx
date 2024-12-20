import { FC } from "react";

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
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label mt-3 fw-medium">
          {label}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" />}
        <input
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name] || ""}
          className="bg-custom-secondary border fs-7 px-3 py-2 w-100 rounded-2 input-focus"
       
        />
      </div>
      {hasError ? (
        <div id={`${name}-error`} className="text-danger error fs-7">
          {formik.errors[name]}
        </div>
      ) : (
        <div className="error-placeholder"></div>
      )}
    </div>
  );
};

export default AuthTextInput;
