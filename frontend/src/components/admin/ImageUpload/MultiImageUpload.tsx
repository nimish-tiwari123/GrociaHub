import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import "./style.css";

type MultiImageUploadProps = {
  label: string;
  name: string;
  formik: any; // Access the Formik object
  maxImages?: number; // Maximum number of images allowed
};

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  label,
  name,
  formik,
  maxImages = 3,
}) => {
  const [images, setImages] = useState<string[]>([]); // Stores image previews

  useEffect(() => {
    // Check if Formik already has existing images (URLs or paths)
    if (formik.values[name] && Array.isArray(formik.values[name])) {
      setImages(formik.values[name].map((img: File | string) =>
        typeof img === "string" ? img : URL.createObjectURL(img)
      ));
    }
  }, [formik.values[name]]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files).slice(0, maxImages - images.length); // Limit images based on maxImages
      const newImages: string[] = [];
      const newFiles: File[] = [];

      for (const file of fileList) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            newImages.push(reader.result as string);
            setImages((prevImages) => [...prevImages, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
        newFiles.push(file);
      }

      // Wait for all readers to finish and update Formik field
      await Promise.all(
        fileList.map(
          (file) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = resolve;
              reader.readAsDataURL(file);
            })
        )
      );

      formik.setFieldValue(name, [...(formik.values[name] || []), ...newFiles]);
    }

    formik.setFieldTouched(name, true);
  };

  const handleImageClick = () => {
    const input = document.getElementById(name) as HTMLInputElement;
    input?.click(); // Trigger file input click
  };

  const handleRemoveImage = (index: number) => {
    // Remove image preview and file
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    const updatedFiles = (formik.values[name] || []).filter(
      (_: File | string, i: number) => i !== index
    );
    formik.setFieldValue(name, updatedFiles);
  };

  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="fw-medium mt-3">
        {label}
      </label>
      <div className="image-upload-container mt-2 rounded p-2" style={{ cursor: "pointer" }}>
        <div className="d-flex flex-wrap align-items-center">
          {images.map((image, index) => (
            <div key={index} className="position-relative m-2">
              <img
                src={image}
                alt={`Selected ${index + 1}`}
                className="img-fluid"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                onClick={() => handleRemoveImage(index)}
                style={{ zIndex: 1 }}
              >
                ×
              </button>
            </div>
          ))}
          {images.length < maxImages && (
            <div
              className="upload-placeholder p-3 d-flex align-items-center justify-content-center"
              onClick={handleImageClick}
              style={{
                width: "120px",
                height: "120px",
                border: "2px dashed #ccc",
                position: "relative",
                borderRadius: "5px",
              }}
            >
              <div>
                <IoCloudUploadOutline size={24} />
                <span className="fs-7 d-block mt-3">Add Image</span>
              </div>
            </div>
          )}
        </div>
        <input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="d-none"
          multiple
        />
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-danger">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default MultiImageUpload;
