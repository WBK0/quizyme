import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
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

    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";

    const prisma = new PrismaClient();

    const quizzes = await prisma.quiz.findMany({
      where: {
        userId: session.user.id,
        OR: [
          {
            topic: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            tags: {
              has: search,
            },
          }
        ]
      },
      include: {
        user: true
      },
      skip: skip,
      take: limit,
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