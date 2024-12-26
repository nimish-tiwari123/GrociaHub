import { FC } from "react";
import Select from "react-select";
import "./style.css";
interface MultiSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  formik: any;
}

const MultiSelect: FC<MultiSelectProps> = ({
  name,
  label,
  placeholder = "Select options",
  options,
  formik,
}) => {
  const handleChange = (selectedOptions: any) => {
    const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    formik.setFieldValue(name, values);
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label mt-3 fw-medium">
          {label}
        </label>
      )}
      <Select
        isMulti
        name={name}
        options={options}
        className="multi-select-wrapper"
        classNamePrefix="multi-select"
        placeholder={placeholder}
        value={formik.values[name]?.map((value: string) =>
          options.find((option) => option.value === value)
        )}
        onChange={handleChange}
        onBlur={() => formik.setFieldTouched(name, true)}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-danger error err1 fs-7">{formik.errors[name]}</div>
      ) : (
        <div className="error-placeholder"></div>
      )}
    </div>
  );
};

export default MultiSelect;
