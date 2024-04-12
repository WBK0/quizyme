import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, {params} : {params : {id: string}}) => {
  try {
    const { id } = params;

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

    const updateGame = await prisma.quizGame.update({
      where: {
        id: id,
      },
      data: {
        isFinished: true,
      }
    });

    if(!updateGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Error while updating quiz game",
        }),
        { status: 500 }
      );
    }

    const quizStats = await prisma.quizGameStats.create({
      data: {
        quizId: quizGame.quizId,
        userId: session.user.id,
        quizGameId: id,
        points: quizGame.points,
        correctAnswers: quizGame.correctAnswers,
      }
    });

    if(!quizStats) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Could not save quiz stats",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Quiz game finished",
      }),
      { status: 200 }
    );

  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}