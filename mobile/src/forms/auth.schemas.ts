import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Min 6 chars').required('Required'),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(2).required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().optional(),
  password: Yup.string().min(6, 'Min 6 chars').required('Required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

