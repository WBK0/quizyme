import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';

const schema = {
  username: yup.string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
}

export const GET = async (req: Request, { params } : {params: {username: string}}) => {
  const username = params.username;

  if(!username) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: 'Missing required fields',
      }),
      { status: 400 }
    );
  }

  await schema.username.validate(
    username,
    { abortEarly: false }
  ).catch((err) => {
    return new Response(
      JSON.stringify({
        status: "error",
        message: err.errors,
      }),
      { status: 400 }
    );
  });

  const prisma = new PrismaClient();
  
  const existingUser = await prisma.user.findFirst({
    where: {
      username: {
        equals: username.toString(),
        mode: 'insensitive',
      },
    },
  });

  if(existingUser) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: 'Username is already taken',
      }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({
      status: "success",
      message: 'Username is available',
    }),
    { status: 200 }
  );
};