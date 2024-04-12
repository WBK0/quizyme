import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
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

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        Following: true
      }
    });

    const userData = await prisma.quizGameStats.findUnique({
      where: {
        quizGameId: params.id,
        userId: session.user.id,
      },
      include: {
        quiz: true,
      }
    });

    if(!userData) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Could not get quiz",
        }),
        { status: 500 }
      );
    }

    const quizGameStats = await prisma.quizGameStats.findMany({
      where: {
        quizId: userData.quiz.id,
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
    
    let data = quizGameStats.map((quizGameStat) => {
      return {
        id: quizGameStat.id,
        points: quizGameStat.points,
        correctAnswers: quizGameStat.correctAnswers,
        isFriend: user?.Following.find((following) => following.followingId === quizGameStat.user.id) ? true : false,
        user: {
          id: quizGameStat.user.id,
          name: quizGameStat.user.name,
          image: quizGameStat.user.image,
        }
      }
    });

    data = data.sort((a, b) => b.points - a.points);

    return new Response(
      JSON.stringify({
        status: "Success",
        data: data,
        answersLength: userData.quiz.questions.length,
        userPoints: userData.points,
        userCorrectAnswers: userData.correctAnswers,
        userPlace: data.findIndex((data) => data.points === userData.points && data.user.id === session.user.id) + 1,
        isPointsEnabled: userData.quiz.pointsMethod !== 'Disabled',
        studyId: userData.quiz.id,
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
