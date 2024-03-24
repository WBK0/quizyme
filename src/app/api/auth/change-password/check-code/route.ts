import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { code } = await req.json();

    const prisma = new PrismaClient();

    const confirmCode = await prisma.confirmCode.findFirst({
      where: {
        code: code.toUpperCase(),
      },
    });

    if (!confirmCode) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid code",
        }),
        { status: 400 }
      );
    }

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Code is valid",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An unknown error occurred",
      }),
      { status: 500 }
    );
  }
}