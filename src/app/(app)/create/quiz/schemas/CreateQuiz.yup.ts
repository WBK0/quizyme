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
});

export const answersSchema = yup.array().of(
  yup.object().shape({
    answer: yup.string()
      .min(1, 'Answers must be at least 1 characters')
      .max(512, 'Answers must be at most 512 characters')
      .required('Answers is required'),
    isCorrect: yup.boolean()
      .required('Minimum one answer must be correct'),
  })
  )
  .min(2, 'You must have at least 2 answers')
  .max(4, 'You must have at most 4 answers')
  .test('isCorrect', 'Minimum one answer must be correct', (answers) => {
    return answers?.some((answer : any) => answer.isCorrect === true);
});