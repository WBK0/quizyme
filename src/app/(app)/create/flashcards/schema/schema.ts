import * as yup from 'yup';

const schema = yup.object().shape({
  flashcards: yup.array().of(
    yup.object().shape({
      concept: yup
        .string()
        .when({
          is: (value: string) => value === '',
          then: () => yup.string().test('required', 'Concept is required for all fields except the last one', function (value, context) {
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
          }),
        otherwise: () => yup.string()
          .required('Concept is required')
          .min(2, 'Concept must be at least 2 characters long')
          .max(255, 'Concept must be at most 255 characters long')
      }),
      definition: yup
        .string()
        .when({
          is: (value: string) => value === '',
          then: () => yup.string().test('required', 'Definition is required for all fields except the last one', function (value, context) {
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
          }),
        otherwise: () => yup.string()
          .required('Definition is required')
          .min(2, 'Definition must be at least 2 characters long')
          .max(255, 'Definition must be at most 255 characters long')
      })
    }),    
  )
  .min(5, 'At least 5 flashcards are required')
  .max(999, 'At most 999 flashcards are allowed')
  .required('Flashcards are required'),
});

export default schema;