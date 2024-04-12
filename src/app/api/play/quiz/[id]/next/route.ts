import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import finishQuiz from "../answer/finishQuiz";

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

    const quizGame = await prisma.quizGame.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      },
      include: {
        quiz: true,
      }
    });

    if(!quizGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid quiz game id provided",
        }),
        { status: 400 }
      );
    }

    if(!quizGame.isStarted) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game not started",
        }),
        { status: 400 }
      );
    }

    if(quizGame.isFinished) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game already finished",
        }),
        { status: 400 }
      );
    }

    const updateQuizGame = await prisma.quizGame.update({
      where: {
        id: id,
        userId: session.user.id,
      },
      data: {
        isAsked: false,
        actualQuestion: {
          increment: 1
        },
        isFinished: quizGame.actualQuestion + 1 === quizGame.quiz.questions.length,
        timeToRespond: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      }
    });

    if(!updateQuizGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Failed to update quiz game",
        }),
        { status: 400 }
      );
    }

    if(quizGame.actualQuestion + 1 === quizGame.quiz.questions.length){
      await finishQuiz(
        id,
        quizGame.quiz.id,
        session.user.id,
        quizGame.points,
        quizGame.correctAnswers
      )
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Successfully asked for next question",
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