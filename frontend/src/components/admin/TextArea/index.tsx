import { FC } from "react";

interface AuthTextAreaProps {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  formik: any;
}

const TextArea: FC<AuthTextAreaProps> = ({
  name,
  label,
  disabled = false,
  placeholder = "",
  rows = 3,
  formik,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label mt-3 fw-medium">
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name] || ""}
        className="bg-custom-secondary border fs-7 p-custom w-100 rounded-2 input-focus"
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-danger error err1 fs-7">{formik.errors[name]}</div>
      ) : (
        <div className="error-placeholder"></div>
      )}
    </div>
  );
};

export default TextArea;
