import { connectToDB } from "@/utils/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import * as yup from "yup";
import { PrismaClient } from "@prisma/client";
import saveImage from "@/utils/uploadImage";

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
  image: yup.mixed().test(
    'fileSize',
    'Image file is too large',
    (value : any) => !value[0] || (value[0] && value[0].size <= 1024 * 1024)
  ),
  bio: yup.string()
    .max(1024, 'Firstname must be at most 1024 characters'),
  interests: yup.array()
    .of(yup.string())
    .max(12, 'You can select up to 12 interests'),
});

export const POST = async (req: Request) => {
  await connectToDB();

  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const data = await req.formData();

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

  await schema.validate(
    Object.fromEntries(data.entries()),
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

  const firstname = data.get('firstname');
  const lastname = data.get('lastname');
  const username = data.get('username');
  let image = data.get('image');
  const bio = data.get('bio');
  const interests = (data.getAll('interests') as string[]).filter(Boolean);

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

  if (image == 'null') {
    image = 'defaultPicture.png';
  }else if(typeof image !== 'string'){
    const savedImage = await saveImage(image as File);
    image = savedImage;
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
      isComplete: true
    }
  });

  return new Response(
    JSON.stringify({
      status: "success",
      message: 'User created successfully!',
    }),
    { status: 200 }
  );

}