import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import generateCode from "./generateCode";
import sendEmail from "./sendEmail";
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(24, 'Password must not exceed 24 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),
}).required('Please fill in all required fields');

export const POST = async (req: Request) => {
  try {
    await connectToDB();

    const prisma = new PrismaClient();

    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    await schema.validate({ email, password }).catch((err) => {
      throw new Error(err.errors[0]);
    });

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      throw new Error("User with that email already exists");
    }

    let code: string;
    let isCode;

    do {
      code = generateCode();
      isCode = await prisma.confirmCode.findUnique({
        where: {
          code: code,
        },
      });
    } while (isCode !== null);

    const hashedPassword = await hash(password, 12);

    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      if(!user){
        throw new Error('An error occurred while creating user');
      }

      await prisma.confirmCode.create({
        data: {
          code,
          userId: user.id,
          deleteAt: new Date(Date.now() + 1000 * 60 * 15),
        },
      });
      
      await sendEmail(email, code);
    })

    prisma.$disconnect();

    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: 'User created successfully!',
      }),
      { status: 200 }
    );
  } catch (error : unknown) {
    return new NextResponse(
      JSON.stringify({
        status: "Error while creating user",
        message: (error as Error).message,
      }),
      { status: 500 }
    );
  }
  
}