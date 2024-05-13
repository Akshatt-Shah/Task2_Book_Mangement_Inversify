// validation.ts
import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(30),
  password: Yup.string().required().min(6).max(10),
  type: Yup.string().required(),
});

export const bookSchema = Yup.object().shape({
  title: Yup.string().required().min(3).max(30),
  author: Yup.string().required().min(24).max(24),
  category: Yup.string().required().min(24).max(24),
  isbn: Yup.number().required(),
  description: Yup.string().required().min(10).max(30),
  price: Yup.number().required().min(1),
});

export const authorSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(30),
  biography: Yup.string().required().min(1).max(100),
  nationality: Yup.string().required(),
});

export const categorySchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(30),
});
