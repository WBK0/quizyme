import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params } : { params: { id: string } }) => {
  try {
    const { id } = params;

    const prisma = new PrismaClient();

    const code = await prisma.confirmCode.findFirst({
      where: {
        id: id,
        isAsked: false
      }
    });

    await prisma.confirmCode.update({
      where: {
        id: id
      },
      data: {
        isAsked: true
      }
    });

    if(!code){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid code id"
        }), { status: 400 }
      )
    }

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Code requested successfully",
        code: code.code
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