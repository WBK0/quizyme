import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, {params} : {params : {id: string}}) => {
  try {
    const { id } = params;

    const session = await getServerSession(authOptions);

    if(!session) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Please login to get better experience",
          errorId: 100,
        }),
        { status: 401 }
      );
    }

    if(!checkMongoDBID(id)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid format of flashcard id provided",
        }),
        { status: 400 }
      );
    }
    
    const prisma = new PrismaClient();
        
    let flashcardsGame = await prisma.flashcardsGame.findFirst({
      where: {
        userId: session.user.id,
        flashcardsId: id
      },
      select: {
        id: true,
        shuffleSalt: true,
        actualFlashcard: true,
        likedIds: true,
        isEnded: true
      }
    });

    if(!flashcardsGame) {
      const flashcards = await prisma.flashcards.findUnique({
        where: {
          id: id,
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

      flashcardsGame = await prisma.flashcardsGame.create({
        data: {
          userId: session.user.id,
          flashcardsId: id,
          actualFlashcard: 0,
          shuffleSalt: 0,
          likedIds: []
        }
      })

      if(!flashcardsGame) {
        return new Response(
          JSON.stringify({
            status: "Error",
            message: "Failed to save the flashcard game for the user",
          }),
          { status: 500 }
        );
      }
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        data: flashcardsGame
      }),
      { status: 200 }
    );
  } catch (error) {
    // console.log(error);
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}