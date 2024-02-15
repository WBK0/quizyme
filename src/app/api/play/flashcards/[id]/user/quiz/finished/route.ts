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

    const { id } = params;

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        Following: true
      }
    });

    const userData = await prisma.flashcardQuizStats.findUnique({
      where: {
        flashcardQuizId: id,
        userId: session.user.id,
      },
      include: {
        flashcardQuiz: true,
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

    const quizGameStats = await prisma.flashcardQuizStats.findMany({
      where: {
        flashcardsId: userData.flashcardsId,
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
        correctAnswers: quizGameStat.correctAnswers,
        isFriend: user?.Following.find((following) => following.followingId === quizGameStat.user.id) ? true : false,
        user: {
          id: quizGameStat.user.id,
          name: quizGameStat.user.name,
          image: quizGameStat.user.image,
        }
      }
    });

    data = data.sort((a, b) => b.correctAnswers - a.correctAnswers);

    return new Response(
      JSON.stringify({
        status: "Success",
        data: data,
        answersLength: userData.flashcardQuiz.questions.length,
        userCorrectAnswers: userData.correctAnswers,
        userPlace: data.findIndex((data) => data.correctAnswers === userData.correctAnswers && data.user.id === session.user.id) + 1,
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
