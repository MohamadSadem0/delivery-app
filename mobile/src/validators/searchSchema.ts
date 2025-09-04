import * as yup from 'yup';

export const searchSchema = yup.object({
  q: yup.string().min(1).max(120).required(),
  page: yup.number().min(1).default(1),
  sort: yup.mixed().oneOf(['relevance','price_asc','price_desc','rating_desc','newest']).default('relevance'),
});

