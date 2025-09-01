import * as Yup from 'yup';

export const addressSchema = Yup.object({
  fullName: Yup.string().min(2).required('Required'),
  phone: Yup.string().min(6).required('Required'),
  city: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  building: Yup.string().optional(),
  notes: Yup.string().optional(),
});
