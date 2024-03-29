import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import generateCode from "../signup/generateCode";
import sendEmail from "../signup/sendEmail";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if(!email){
      return new Response(
        JSON.stringify({
          message: 'Email is required',
          status: 'Error'
        }), { status: 400 }
      )
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });

    if(!user){
      return new Response(
        JSON.stringify({
          message: 'User not found',
          status: 'Error'
        }), { status: 404 }
      )
    }

    if(user.emailVerified){
      return new Response(
        JSON.stringify({
          message: 'Email already verified',
          status: 'Error'
        }), { status: 400 }
      )
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

    const confirmCode = await prisma.confirmCode.create({
      data: {
        code,
        userId: user.id,
        deleteAt: new Date(Date.now() + 1000 * 60 * 15),
      },
    });

    if(!confirmCode){
      return new Response(
        JSON.stringify({
          message: 'An error occurred while creating code',
          status: 'Error'
        }), { status: 500 }
      )
    }

    sendEmail(user.email, code);

    return new Response(
      JSON.stringify({
        message: 'Email sent successfully',
        status: 'Success'
      }), { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'An error occurred while sending email',
        status: 'Error'
      }), { status: 500 }
    )
  }
}