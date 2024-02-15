import { PrismaClient } from "@prisma/client";

const finishQuiz = async (quizGameId: string, flashcardsId: string, userId: string, correctAnswers: number) => {
  try {
    const prisma = new PrismaClient();

    const quizStats = await prisma.flashcardQuizStats.create({
      data: {
        flashcardsId: flashcardsId,
        userId: userId,
        flashcardQuizId: quizGameId,
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