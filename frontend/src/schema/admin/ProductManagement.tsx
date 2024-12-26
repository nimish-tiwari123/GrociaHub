import * as Yup from "yup";

export const productSchema = Yup.object({
  productName: Yup.string().required("Product Name is required"),
  category: Yup.string().required("Category is required"),
  productDescription: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  discountPrice: Yup.number(),
  stockQuantity: Yup.number().required("Stock Quantity is required"),
  status: Yup.string().required("Status is required"),
  images: Yup.array()
    .min(1, "At least 1 image is required")
    .max(3, "You can upload a maximum of 3 images"),
});

