import * as Yup from "yup";

export const offerSchema = Yup.object().shape({
  title: Yup.string().required("Offer Title is required"),
  description: Yup.string().required("Offer Description is required"),
  discountType: Yup.string().required("Discount Type is required"),
  discountValue: Yup.number()
    .required("Discount Value is required")
    .positive("Discount Value must be positive"),
  products: Yup.array()
    .of(Yup.string())
    .min(1, "At least one product must be selected"),
  isActive: Yup.string().required("Status is required"),
  startDate: Yup.date()
    .required("Start Date is required")
    .min(new Date(), "Start Date must be in the future"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(
      Yup.ref("startDate"),
      "End Date must be after the Start Date"
    ),
});
