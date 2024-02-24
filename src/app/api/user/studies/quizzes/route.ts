import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    
    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to access this page",
        }),
        { status: 401 }
      );
    }

    const prisma = new PrismaClient();

    const quizzes = await prisma.quiz.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        user: true
      }
    });

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

    if(!quizzes){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No quizzes found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Successfully fetched quizzes",
        data: data
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}