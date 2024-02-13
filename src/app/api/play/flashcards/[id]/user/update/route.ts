import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest, {params} : {params : {id: string}}) => {
  try {
    const { id } = params;
    const { shuffleSalt, actualFlashcard, likedIds, isEnded } = await req.json();

    const session = await getServerSession(authOptions);

    if(!session) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You must login to update flashcards game",
          errorId: 100,
        }),
        { status: 401 }
      );
    }

    const prisma = new PrismaClient();

    const flashcardsGame = await prisma.flashcardsGame.findFirst({
      where: {
        userId: session.user.id,
        flashcardsId: id
      }
    });
    
    if(!flashcardsGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Flashcards game not found",
          errorId: 101,
        }),
        { status: 404 }
      );
    }

    await prisma.flashcardsGame.update({
      where: {
        id: flashcardsGame.id
      },
      data: {
        shuffleSalt,
        actualFlashcard,
        likedIds,
        isEnded
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Flashcards game updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}