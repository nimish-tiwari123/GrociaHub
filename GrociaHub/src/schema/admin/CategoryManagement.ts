
import * as Yup from "yup";

export const addCategorySchema = Yup.object({
  categoryName: Yup.string().required("Category name is required"),
  categoryImage: Yup.mixed().nullable().required("Image is required"),
});
export const editCategorySchema = Yup.object({
    categoryName: Yup.string().required("Category name is required"),
    categoryImage: Yup.mixed().nullable().required("Image is required"),
  });