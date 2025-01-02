import { FC } from "react";

interface SelectFieldProps {
  name: string;
  label?: string;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
  placeholder?: string;
  formik: any;
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  options,
  disabled = false,
  placeholder = "Select an option",
  formik,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label mt-3 fw-medium">
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        disabled={disabled}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name] || ""}
        className="bg-custom-secondary border fs-7 p-custom w-100 rounded-2 input-focus"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-danger error err1 fs-7">{formik.errors[name]}</div>
      ) : (
        <div className="error-placeholder"></div>
      )}
    </div>
  );
};

export default SelectField;
