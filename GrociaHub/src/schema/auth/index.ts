import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase letter")
    .matches(/^(?=.*\d)/, "Must contain at least one number")
    .matches(/^(?=.*[@$!%*?&])/, "Must contain at least one special character")
    .min(6, "Must be at least 6 characters")
    .required("Required"),
});
export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase letter")
    .matches(/^(?=.*\d)/, "Must contain at least one number")
    .matches(/^(?=.*[@$!%*?&])/, "Must contain at least one special character")
    .min(6, "Must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

export const createPasswordSchema = Yup.object({
  password: Yup.string()
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase letter")
    .matches(/^(?=.*\d)/, "Must contain at least one number")
    .matches(/^(?=.*[@$!%*?&])/, "Must contain at least one special character")
    .min(6, "Must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
