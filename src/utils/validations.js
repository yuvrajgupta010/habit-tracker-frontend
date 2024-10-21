import * as yup from "yup";

// Job Seeker related validations
export const userLoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Must be a valid email")
    .max(255)
    .required("Please enter valid email"),
  password: yup.string().trim().required("Please enter valid password"),
});

export const userSignupValidationSchema = yup.object().shape({
  fullName: yup.string().trim().required("Please enter your full name"),
  email: yup
    .string()
    .trim()
    .email("Must be a valid email")
    .max(255)
    .required("Please enter valid email"),
  password: yup
    .string()
    .trim()
    .required("Please enter valid password")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    ),
});

export const createHabitValidationSchema = yup.object().shape({
  habitName: yup.string().trim().required("Please enter habit name"),
  goal: yup.number().required("Please enter habit goal"),
  description: yup.string().trim().required("Please enter habit description"),
});
