import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, { params } : { params: { id: string }}) => {
  try {
    const { id } = params;

    if(!checkMongoDBID(id)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid notification ID.",
        }),
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to delete a notification.",
        }),
        { status: 401 }
      );
    }

    const prisma = new PrismaClient();

    const notification = await prisma.notification.delete({
      where: {
        id,
        userId: session.user.id
      }
    });

    if(!notification){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Notification not found",
        }),
        { status: 404 }
      );
    }

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Notification deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An unexpected error occurred",
      }),
      { status: 500 }
    );
  }
}