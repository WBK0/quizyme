import { PrismaClient } from "@prisma/client";

export const GET = async () => {
  try {
    const prisma = new PrismaClient();

    const flashcards = await prisma.flashcards.findMany({
      take: 8,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true
      },
      where: {
        visibility: "Public"
      }
    });

    prisma.$disconnect();

    if(!flashcards){
      return new Response(
        JSON.stringify({
          message: 'No flashcards found',
          status: "Error"
        }),
        { status: 404 }
      )
    }

    const data = flashcards.map((card) => {
      return {
        id: card.id,
        topic: card.topic,
        tags: card.tags,
        image: card.image,
        description: card.description,
        stats: card.stats,
        user: {
          id: card.user.id,
          image: card.user.image,
          username: card.user.username,
          name: card.user.name
        },
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
      }
    });

    return new Response(
      JSON.stringify({
        message: 'Flashcards fetched successfully',
        status: "Success",
        data: data
      })
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "An error occurred while fetching flashcards",
        status: "Error"
      }),
      { status: 500 }
    )
  }
}