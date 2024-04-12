import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Unauthorized"
        }), { status: 401}
      )
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      }
    });

    if(!user){
      await prisma.$disconnect();
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User not found"
        }), { status: 404 }
      )
    }

    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        newNotifications: false
      }
    });

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({
        status: "Success"
      }), { status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Internal Server Error"
      }), { status: 500 }
    )
  }
}