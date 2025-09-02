import * as yup from 'yup';
import { REVIEW_MIN_BODY } from '@/constants/reviews';

export const reviewSchema = yup.object({
  rating: yup.number().min(1).max(5).required(),
  title: yup.string().max(80).nullable(),
  body: yup.string().min(REVIEW_MIN_BODY).nullable(),
});
