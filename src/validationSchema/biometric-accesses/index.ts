import * as yup from 'yup';

export const biometricAccessValidationSchema = yup.object().shape({
  punch_in_time: yup.date().nullable(),
  punch_out_time: yup.date().nullable(),
  user_id: yup.string().nullable(),
});
