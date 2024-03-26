import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (req: Request, {params} : {params : {username: string}}) => {
  try {
    const session = await getServerSession(authOptions);

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
        Quiz: {
          include: {
            LikedStudy: true
          }
        },
        Flashcards: {
          include: {
            LikedStudy: true
          }
        },
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
          isFavorite: quiz.LikedStudy.some((like) => session?.user.id && like.userId === session.user.id),
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
          isFavorite: flashcard.LikedStudy.some((like) => session?.user.id && like.userId === session.user.id),
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
