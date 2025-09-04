import * as Yup from 'yup';

export const paymentSchema = Yup.object({
  method: Yup.string().oneOf(['cod', 'card']).required('Required'),
});

