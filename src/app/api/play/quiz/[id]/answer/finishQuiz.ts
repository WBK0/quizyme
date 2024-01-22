import { PrismaClient } from "@prisma/client";

const finishQuiz = async (quizGameId: string, quizId: string, userId: string, points: number, correctAnswers: number) => {
  try {
    const prisma = new PrismaClient();

    const quizStats = await prisma.quizGameStats.create({
      data: {
        quizId: quizId,
        userId: userId,
        quizGameId: quizGameId,
        points: points,
        correctAnswers: correctAnswers,
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

    return true;

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Could not save quiz stats",
      }),
      { status: 500 }
    );
  }
}

export default finishQuiz;