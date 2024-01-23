import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, {params} : {params : {id: string}}) => {
  try {
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

    const quizGameStats = await prisma.quizGameStats.findMany({
      where: {
        quizGameId: params.id,
      },
      include: {
        user: true,
      }
    });

    if(!quizGameStats) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Could not get quiz game stats",
        }),
        { status: 500 }
      );
    }

    const quiz = await prisma.quizGameStats.findUnique({
      where: {
        quizGameId: params.id,
      },
      include: {
        quiz: true,
      }
    });

    if(!quiz) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Could not get quiz",
        }),
        { status: 500 }
      );
    }

    const data = quizGameStats.map((quizGameStat) => {
      return {
        id: quizGameStat.id,
        points: quizGameStat.points,
        correctAnswers: quizGameStat.correctAnswers,
        user: {
          id: quizGameStat.user.id,
          name: quizGameStat.user.name,
          image: quizGameStat.user.image,
        }
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        data: data,
        answersLength: quiz.quiz.questions.length,
      }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Could not get data for quiz game",
      }),
      { status: 500 }
    );
  }
}
