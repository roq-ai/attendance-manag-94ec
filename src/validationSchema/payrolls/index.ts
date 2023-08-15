import * as yup from 'yup';

export const payrollValidationSchema = yup.object().shape({
  salary: yup.number().integer().nullable(),
  user_id: yup.string().nullable(),
});
