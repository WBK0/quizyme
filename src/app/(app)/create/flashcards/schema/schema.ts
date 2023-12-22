import * as yup from 'yup';

const schema = yup.object().shape({
  flashcards: yup.array().of(
    yup.object().shape({
      concept: yup.string()
        .test('skipValidation', 'Skip validation for last concept', function (value, context) {
          const index = Number(context.path.slice(context.path.indexOf('[') + 1, context.path.indexOf(']'))) + 1;

          const maxIndex = context.from ? context.from[1].value.flashcards.length : 0;

          if (
            index === maxIndex && 
            index > 5 &&
            context.parent.definition === '' &&
            context.parent.concept === ''
          ) {
            return true;
          }

          return yup.string()
            .required('Concept is required')
            .min(2, 'Concept must be at least 2 characters long')
            .max(255, 'Concept must be at most 160 characters long')
            .isValidSync(value, { context: this });
        }),
      definition: yup.string()
        .test('skipValidation', 'Skip validation for last concept', function (value, context) {
          const index = Number(context.path.slice(context.path.indexOf('[') + 1, context.path.indexOf(']'))) + 1;

          const maxIndex = context.from ? context.from[1].value.flashcards.length : 0;

          if (
            index === maxIndex && 
            index > 5 &&
            context.parent.definition === '' &&
            context.parent.concept === ''
          ) {
            return true;
          }

          return yup.string()
            .required('Definition is required')
            .min(2, 'Definition must be at least 2 characters long')
            .max(255, 'Definition must be at most 160 characters long')
            .isValidSync(value, { context: this });
        }),
    })
  )
  .min(5, 'At least 5 flashcards are required')
  .max(999, 'At most 999 flashcards are allowed')
  .required('Flashcards are required'),
});

export default schema;