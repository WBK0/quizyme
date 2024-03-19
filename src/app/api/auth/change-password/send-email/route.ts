import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import sendEmail from "./sendEmail";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if(!user){
      return new Response(
        JSON.stringify({
          message: 'User with that email does not exist',
          status: "Error"
        }),
        { status: 400 }
      )
    }

    if(!user.password){
      return new Response(
        JSON.stringify({
          message: "You can't be registered with third party providers to change your password.",
          status: "Error"
        }),
        { status: 400 }
      )
    }

    let code: string;
    let isCode;

    do {
      code = Math.random().toString(36).substr(2, 6).toUpperCase();
      isCode = await prisma.confirmCode.findUnique({
        where: {
          code: code,
        },
      });
    } while (isCode !== null);


    await prisma.confirmCode.create({
      data: {
        code,
        userId: user.id,
        deleteAt: new Date(Date.now() + 1000 * 60 * 15),
      },
    });

    await prisma.$disconnect();

    await sendEmail(email, code);

    return new Response(
      JSON.stringify({
        message: 'Email sent successfully',
        status: "Success"
      }),
      { status: 200 }
    )
  } catch (error) {

    console.log(error)
    return new Response(
      JSON.stringify({
        message: 'An error occurred while sending the email',
        status: "Error"
      }),
      { status: 500 }
    )
  }
}