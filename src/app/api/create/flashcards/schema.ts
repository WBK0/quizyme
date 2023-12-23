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
  image: yup.string()
    .required('Image is required'),
  description: yup.string()
    .min(4, 'Description must be at least 4 characters')
    .max(1024, 'Description must be at most 1024 characters')
    .required('Description is required'),
  collectionName: yup.string()
    .test({
      name: 'collectionName',
      message: 'collectionName must exist in the database',
      test: (collectionName) => {
        const isCollection = prisma.collection.findFirst({
          where: {
            name: collectionName,
          },
        });
        if(!isCollection) {
          return false;
        }else{
          return true;
        }
      },
    })
    .required("Collection Name is required"),
  flashcards: yup.array()
    .of(
      yup.object().shape({
        concept: yup.string()
          .min(2, 'Concept must be at least 2 characters')
          .max(255, 'Concept must be at most 255 characters')
          .required('Concept is required'),
        definition: yup.string()
          .min(2, 'Definition must be at least 2 characters')
          .max(255, 'Definition must be at most 255 characters')
          .required('Definition is required'),
      }),
    )
    .min(5, 'At least 5 flashcards are required')
    .max(999, 'At most 999 flashcards are allowed')
    .required(),
  userId: yup.string()
    .required('User ID is required'),
});