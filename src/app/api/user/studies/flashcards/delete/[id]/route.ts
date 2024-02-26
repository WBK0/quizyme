import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
          message: "You need to provide a valid id to delete a flashcards",
        }),
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to delete a flashcards",
        }),
        { status: 401 }
      );
    }

    const prisma = new PrismaClient();

    const flashcards = await prisma.flashcards.delete({
      where: {
        id: id,
        userId: session.user.id
      }
    })

    if(!flashcards){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Flashcards not found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'Success',
        message: "Deleted successfully"
      }),
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        status: 'Error',
        message: "Internal server error"
      }),
      { status: 500 }
    )
  }
}