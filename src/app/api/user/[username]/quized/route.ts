import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

export const GET = async (req: Request, {params} : {params : {username: string}}) => {
  try {
    const { username } = params;

    const session = await getServerSession(authOptions);

    if(!username) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No username provided",
        }),
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        username: username
      },
      include: {
        QuizGameStats: {
          include: {
            quiz: {
              include: {
                LikedStudy: true
              }
            },
            user: true,
          }
        },
      }
    });

    if(!user){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    const data = user.QuizGameStats.map((quizGameStat) => {
      return {
        id: quizGameStat.quiz.id,
        topic: quizGameStat.quiz.topic,
        tags: quizGameStat.quiz.tags,
        image: quizGameStat.quiz.image,
        description: quizGameStat.quiz.description,
        numberOfQuestions: quizGameStat.quiz.questions.length,
        createdAt: quizGameStat.quiz.createdAt,
        correctAnswers: quizGameStat.correctAnswers,
        points: quizGameStat.points,
        createdBy: {
          id: quizGameStat.user.id,
          username: quizGameStat.user.username,
          image: quizGameStat.user.image,
          name: quizGameStat.user.name
        },
        isFavorite: quizGameStat.quiz.LikedStudy.some((likedStudy) => likedStudy.userId === session?.user?.id)
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Successfully got quizzes quized by user",
        data: data
      }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Failed to get quizzes quized by user",
      }),
      { status: 500 }
    );
  }
}