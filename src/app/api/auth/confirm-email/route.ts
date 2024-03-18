import { NextRequest } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const { code } = await req.json();
    
    if(!code){
      return new Response(
        JSON.stringify({
          message: 'Code is required',
          status: 'Error'
        }),
        {
          status: 400,
        }
      )
    }

    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          message: 'You need to be logged in to confirm your email',
          status: 'Error'
        }),
        {
          status: 401,
        }
      )
    }

    const prisma = new PrismaClient();

    const isCodeExists = await prisma.confirmCode.findUnique({
      where: {
        code: code.toUpperCase(),
        userId: session.user.id
      }
    })

    if(!isCodeExists){
      return new Response(
        JSON.stringify({
          message: 'Invalid code',
          status: 'Error'
        }),
        {
          status: 400,
        }
      )
    }

    console.log(session.user.id, code, isCodeExists)

    await prisma.confirmCode.delete({
      where: {
        code: code.toUpperCase(),
        userId: session.user.id
      }
    })

    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        emailVerified: new Date()
      }
    })

    return new Response(
      JSON.stringify({
        message: 'Email confirmed successfully',
        status: 'Success'
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: 'An error occurred while confirming email',
        status: 'Error'
      }),
      {
        status: 500,
      }
    )
  }
}