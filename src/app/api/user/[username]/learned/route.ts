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
        username: username
      },
      include: {
        FlashcardsGame: {
          include: {
            flashcards: true,
            user: true,
            flashcardsQuizStats: true
          }
        }
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


    const data = user.FlashcardsGame.map((game) => {
      console.log(game?.flashcardsQuizStats)

      return {
        id: game.flashcards.id,
        topic: game.flashcards.topic,
        tags: game.flashcards.tags,
        image: game.flashcards.image,
        description: game.flashcards.description,
        numberOfQuestions: game.flashcards.flashcards.length,
        createdAt: game.flashcards.createdAt,
        correctAnswers: game.flashcardsQuizStats.length > 0 ? game.flashcardsQuizStats.sort((a, b) => b.correctAnswers - a.correctAnswers)[0].correctAnswers || 0 : 0,
        createdBy: {
          id: game.user.id,
          username: game.user.username,
          image: game.user.image,
          name: game.user.name
        }
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Successfully got flashcards quized by user",
        data: data
      }),
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Failed to get flashcards quized by user",
      }),
      { status: 500 }
    );
  }
}