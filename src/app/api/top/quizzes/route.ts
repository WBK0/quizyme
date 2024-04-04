import { PrismaClient } from "@prisma/client";

export const GET = async () => {
  try {
    const prisma = new PrismaClient();

    const quizzes = await prisma.quiz.findMany({
      take: 8,
      orderBy: {
        stats: {
          played: 'desc'
        }
      },
      include: {
        user: true
      },
      where: {
        visibility: "Public"
      }
    });

    prisma.$disconnect();

    if(!quizzes){
      return new Response(
        JSON.stringify({
          message: 'No quizzes found',
          status: "Error"
        }),
        { status: 404 }
      )
    }

    const data = quizzes.map((quiz) => {
      return {
        id: quiz.id,
        topic: quiz.topic,
        tags: quiz.tags,
        image: quiz.image,
        description: quiz.description,
        stats: quiz.stats,
        user: {
          id: quiz.user.id,
          image: quiz.user.image,
          username: quiz.user.username,
          name: quiz.user.name
        },
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
      }
    });

    return new Response(
      JSON.stringify({
        message: 'Quizzes fetched successfully',
        status: "Success",
        data: data
      })
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "An error occurred while fetching quizzes",
        status: "Error"
      }),
      { status: 500 }
    )
  }
}