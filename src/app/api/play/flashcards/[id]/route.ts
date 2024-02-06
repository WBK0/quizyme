import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, {params} : {params : {id: string}}) => {
  try {
    const { id } = params;

    if(!checkMongoDBID(id)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid format of quiz id provided",
        }),
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();

    const flashcards = await prisma.flashcards.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        topic: true,
        flashcards: true,
        image: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          }
        }
      }
    });

    if(!flashcards) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid flashcard id provided",
          errorId: 100,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        data: flashcards
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Internal server error",
        errorId: 500,
      }),
      { status: 500 }
    );
  }
}