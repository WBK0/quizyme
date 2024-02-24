import { PrismaClient } from "@prisma/client";

export const GET = async (req: Request, {params} : {params : {username: string}}) => {
  try {
    const { username } = params;

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
        username: {
          mode: 'insensitive',
          equals: username
        }
      },
      include: {
        Quiz: true,
        Flashcards: true,
        QuizGameStats: true,
        Followers: true,
        Following: true,
        FlashcardsGame: true
      }
    });

    if(!user) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    const data = {
      id: user.id,
      username: user.username,
      name: user.name,
      image: user.image,
      bio: user.bio,
      interests: user.interests || [],
      quizzes: user.Quiz.map((quiz) => {
        return {
          id: quiz.id,
          topic: quiz.topic,
          tags: quiz.tags,
          image: quiz.image,
          description: quiz.description,
          stats: quiz.stats,
          numberOfQuestions: quiz.questions.length,
          createdAt: quiz.createdAt,
        }
      }),
      flashcards: user.Flashcards.map((flashcard) => {
        return {
          id: flashcard.id,
          topic: flashcard.topic,
          tags: flashcard.tags,
          image: flashcard.image,
          description: flashcard.description,
          stats: flashcard.stats,
          numberOfFlashcards: flashcard.flashcards.length,
          createdAt: flashcard.createdAt,
        }
      }),
      playedQuizzes: user.QuizGameStats.length,
      playedFlashcards: user.FlashcardsGame.length,
      followers: user.Followers.length,
      following: user.Following.length,
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "User found",
        data: data
      }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Failed to get user data",
      }),
      { status: 500 }
    );
  }
}
