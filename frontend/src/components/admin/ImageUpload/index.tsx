import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import "./style.css";

type ImageUploadProps = {
  label: string;
  name: string;
  formik: any; // Access the formik object
};

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, formik }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        formik.setFieldValue(name, file);
      };
      reader.readAsDataURL(file);
    }

    formik.setFieldTouched(name, true);
  };

  const handleImageClick = () => {
    const input = document.getElementById(name) as HTMLInputElement;
    input?.click(); // Trigger file input click
  };

  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="fw-medium mt-3">
        {label}
      </label>
      <div
        className="image-upload-container mt-2 rounded"
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      >
        {formik?.values[name] || image ? (
          <img
            src={formik?.values[name] || image}
            alt="Selected"
            className="img-fluid"
          />
        ) : (
          <div className="upload-placeholder p-5">
            <IoCloudUploadOutline size={30} />
            <span className="fs-7 d-block mt-3">
              Drag & Drop or Click to Select Image
            </span>
          </div>
        )}

        <input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="d-none"
        />
      </div>

      {formik.touched[name] && formik.errors[name] && (
        <div className="text-danger">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default ImageUpload;
