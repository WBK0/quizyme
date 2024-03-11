import * as yup from 'yup';

export const firstname = yup.string()
  .min(2, 'Firstname must be at least 2 characters')
  .max(20, 'Firstname must be at most 20 characters')
  .matches(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, 'Firstname must contain only letters')
  .required('Firstname is required');

export const lastname = yup.string()
  .min(2, 'Lastname must be at least 2 characters')
  .max(20, 'Lastname must be at most 20 characters')
  .matches(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, 'Lastname must contain only letters')
  .required('Lastname is required');

export const username = yup.string()
  .min(2, 'Username must be at least 2 characters')
  .max(20, 'Username must be at most 20 characters')
  .required('Username is required');

export const bio = yup.string()
  .min(8, 'Bio must be at least 8 characters')
  .max(1024, 'Bio must be at most 1024 characters')
  .required('Bio is required');

export const interests = yup.array()
  .of(yup.string())
  .min(1, 'You must select at least 1 interest')
  .max(12, 'You can select up to 12 interests');
