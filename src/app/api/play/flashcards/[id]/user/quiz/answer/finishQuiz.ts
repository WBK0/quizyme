import { PrismaClient } from "@prisma/client";

const finishQuiz = async (quizGameId: string, flashcardsId: string, userId: string, correctAnswers: number) => {
  try {
    const prisma = new PrismaClient();

    const flashcardGame = await prisma.flashcardsGame.findFirst({
      where: {
        flashcardsId: flashcardsId,
        userId: userId,
      }
    });

    if(!flashcardGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Not found flashcard game for this quiz game",
        }),
        { status: 400 }
      );
    }

    const quizStats = await prisma.flashcardQuizStats.create({
      data: {
        flashcardsId: flashcardsId,
        userId: userId,
        flashcardQuizId: quizGameId,
        correctAnswers: correctAnswers,
        flashcardsGameId: flashcardGame.id
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