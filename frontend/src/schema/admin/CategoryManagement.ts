import * as Yup from "yup";

export const categorySchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  image: Yup.mixed().nullable().required("Image is required"),
});
