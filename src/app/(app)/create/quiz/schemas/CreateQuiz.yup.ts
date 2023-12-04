import * as yup from 'yup';

export const useFormSchema = yup.object().shape({
  question: yup.string()
    .min(4, 'Question must be at least 4 characters')
    .max(512, 'Question must be at most 512 characters')
    .required('Question is required'),
  answerTime: yup.string()
    .required('Answer time is required'),
  answerPoints: yup.string()
    .required('Answer points is required'),
  responseType: yup.string()
    .required('Response type is required'),
  answers: yup.array().of(
    yup.object().shape({
      answer: yup.string()
        .min(1, 'Answer must be at least 1 character')
        .max(512, 'Answer must be at most 512 characters')
        .required('Answer is required'),
      isCorrect: yup.boolean()
        .required('Answer correctness is required'),
    })
  ),
});