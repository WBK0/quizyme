import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
import * as yup from 'yup';

const password = yup.string()
  .min(8, 'Password must be at least 8 characters')
  .max(24, 'Password must not exceed 24 characters')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
  .required('Password is required');

export const PATCH = async (req: NextRequest) => {
  try {
    const { code, password } = await req.json();

    if(!code || !password){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid request body"
        }), { status: 400 }
      )
    }

    await password.validate(password).catch((err: yup.ValidationError) => {
      return new Response(
      JSON.stringify({
        status: "Error",
        message: err.errors[0]
      }), { status: 400 }
      )
    });

    const prisma = new PrismaClient();

    const confirmCode = await prisma.confirmCode.findFirst({
      where: {
        code,
      }
    });

    if(!confirmCode){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid code"
        }), { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
      where: {
        id: confirmCode.userId
      }
    });

    if(!user){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid user"
        }), { status: 400 }
      )
    }

    const hashedPassword = await hash(password, 12);

    const result = prisma.$transaction([
      prisma.confirmCode.delete({
        where: {
          code
        }
      }),
      prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          password: hashedPassword
        }
      })
    ]);

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Password changed successfully"
      }), { status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An unknown error occurred"
      }), { status: 500 }
    )
  }
}