import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, { params } : {params : {id: string}}) => {
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

    const session = await getServerSession(authOptions);

    if(!session?.user?.id) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User not logged in",
        }),
        { status: 401 }
      );
    }

    const prisma = new PrismaClient();

    const flashcardQuizGame = await prisma.flashcardQuiz.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      }
    });

    if(!flashcardQuizGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid quiz game id provided",
        }),
        { status: 400 }
      );
    }

    if(flashcardQuizGame.isStarted) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game already started",
        }),
        { status: 400 }
      );
    }

    const timeForQuestion = flashcardQuizGame.questions[flashcardQuizGame.actualQuestion].time;

    const timeToRespond = new Date(Date.now() + timeForQuestion * 1000 + 5000) // 5 seconds for safety reasons

    const updateQuizGame = await prisma.flashcardQuiz.update({
      where: {
        id: id,
        userId: session.user.id,
      },
      data: {
        isStarted: true,
        timeToRespond: timeToRespond,
      }
    });

    if(!updateQuizGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Failed to start quiz game",
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Quiz game started successfully",
      }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Something went wrong",
      }),
      { status: 500 }
    )
  }
}