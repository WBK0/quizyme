import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';

const prisma = new PrismaClient();

export const schema = yup.object().shape({
  topic: yup.string()
    .min(3, 'Topic must be at least 3 characters')
    .max(64, 'Topic must be at most 64 characters')
    .required('Topic is required'),
  visibility: yup.string()
    .test({
      name: 'visibility',
      message: 'Visibility must be "Public" or "Code only"',
      test: (visibility) => !visibility || visibility === 'Public' || visibility === 'Code only',
    })
    .required('Visibility is required'),
  tags: yup.array()
    .min(1, 'At least one tag is required')
    .max(5, 'You can only add up to 5 tags')
    .test({
      name: 'maxTagLength',
      message: 'Tag must be at most 16 characters',
      test: (tags) => !tags || tags.every(tag => tag.length <= 16),
    })
    .required('Tags is required'),
  pointsMethod: yup.string()
    .test({
      name: 'pointsMethod',
      message: 'Points method must be "Constant", "Based on answer time", or "Disabled"',
      test: (pointsMethod) => !pointsMethod || pointsMethod === 'Constant' || pointsMethod === 'Based on answer time' || pointsMethod === 'Disabled',
    })
    .required('Points method is required'),
  image: yup.string()
    .required('Image is required'),
  description: yup.string()
    .min(4, 'Description must be at least 4 characters')
    .max(1024, 'Description must be at most 1024 characters')
    .required('Description is required'),
  collectionId: yup.string()
    .test({
      name: 'collectionId',
      message: 'Collection ID must be a valid UUID',
      test: (collectionId) => {
        const isCollection = prisma.collection.findFirst({
          where: {
            id: collectionId,
          },
        });
        if(!isCollection) {
          return false;
        }else{
          return true;
        }
      },
    })
    .required("Collection ID is required"),
  questions: yup.array()
    .of(
      yup.object().shape({
        question: yup.string()
          .min(4, 'Question must be at least 4 characters')
          .max(512, 'Question must be at most 512 characters')
          .required('Question is required'),
        points: yup.number()
          .min(100, 'Points must be at least 100')
          .max(1500, 'Points must be at most 1500'),
        time: yup.number()
          .min(10, 'Time must be at least 10')
          .max(120, 'Time must be at most 120')
          .required('Time is required'),
        type: yup.string()
          .test({
            name: 'type',
            message: 'Type must be "Quiz", "Puzzle", "True / False", or "Multiple choice"',
            test: (type) => !type || type === 'Quiz' || type === 'Puzzle' || type === 'True / False' || type === 'Multiple choice',
          })
          .required('Type is required'),
        image: yup.string(),
        answers: yup.array()
          .of(
            yup.object().shape({
              answer: yup.string()
                .min(1, 'Answer must be at least 1 character')
                .max(512, 'Answer must be at most 512 characters')
                .required('Answer is required'),
              isCorrect: yup.boolean(),
            }),
          )
          .max(4, 'You can only have 4 answers')
          .min(2, 'You must have at least 2 answers'),
      }),
    )
    .required(),
  userId: yup.string()
    .required('User ID is required'),
});