import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import "./style.css";

type ImageUploadProps = {
  label: string;
  name: string;
  formik: any; // Access the formik object
};

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, formik }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Check if formik already has an image URL or path
    if (formik.values[name] && typeof formik.values[name] === "string") {
      setImagePreview(formik.values[name]);
    }
  }, [formik.values[name]]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set preview for the new image
      };
      reader.readAsDataURL(file);

      // Store the new file in Formik
      formik.setFieldValue(name, file);
    }

    formik.setFieldTouched(name, true);
  };

  const handleImageClick = () => {
    const input = document.getElementById(name) as HTMLInputElement;
    input?.click();
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
        {imagePreview ? (
          <img
            src={imagePreview}
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
