import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/auth";
import * as yup from "yup";
import { PrismaClient } from "@prisma/client";

const schema = yup.object().shape({
  firstname: yup.string()
    .min(2, 'Firstname must be at least 2 characters')
    .max(20, 'Firstname must be at most 20 characters')
    .matches(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, 'Firstname must contain only letters')
    .required('Firstname is required'),
  lastname: yup.string()
    .min(2, 'Lastname must be at least 2 characters')
    .max(20, 'Lastname must be at most 20 characters')
    .matches(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, 'Lastname must contain only letters')
    .required('Lastname is required'),
  username: yup.string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
  image: yup.string()
    .required('Image is required'),
  bio: yup.string()
    .min(8, 'Bio must be at least 8 characters')
    .max(1024, 'Bio must be at most 1024 characters')
    .required('Bio is required'),
  interests: yup.array()
    .of(yup.string())
    .min(1, 'You must select at least 1 interest')
    .max(12, 'You can select up to 12 interests')
});

export const POST = async (req: Request) => {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);

  if(!session?.user?.email) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: 'User not logged in',
      }),
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  });

  if(!user || user.isComplete) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: 'User already completed registration',
      }),
      { status: 400 }
    );
  }

  const { firstname, lastname, username, image, bio, interests } = await req.json();

  await schema.validate(
    { firstname, lastname, username, image, bio, interests },
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

  console.log(interests)

  if(!firstname || !lastname || !username) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: 'Missing required fields',
      }),
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username: {
        equals: username.toString(),
        mode: 'insensitive',
      },
    },
  });

  if (existingUser) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: 'Username is already taken',
      }),
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: {
      email: session?.user?.email
    },
    data: {
      name: firstname + ' ' + lastname,
      username: username.toString(),
      image: image,
      bio: typeof bio === 'string' ? bio : null,
      interests: interests,
      isComplete: true,
      newNotifications: true
    }
  });

  await prisma.notification.create({
    data: {
      userId: user.id,
      type: "welcome",
      message: `We are glad to have you on board, @${username}! 😊🙌`,
      senderId: user.id
    }
  })

  return new Response(
    JSON.stringify({
      status: "success",
      message: 'User created successfully!',
    }),
    { status: 200 }
  );
}