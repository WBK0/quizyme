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
          message: "You need to be logged in to check favorited quizzes.",
        }),
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";

    const prisma = new PrismaClient();

    const result = await prisma.likedStudy.findMany({
      where: {
        userId: session.user.id,
        quizId: {
          not: null
        },
        quiz: {
          OR: [
            {
              topic: {
                contains: search,
                mode: "insensitive",
              }
            },
            {
              tags: {
                has: search,
              }
            }
          ]
        }
      },
      include: {
        quiz: {
          include: {
            user: true
          },
        }
      },
      skip: skip,
      take: limit,
    });

    if(!result){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No favorited quizzes found."
        }),
        { status: 404 }
      );
    }

    const data = result.map((item) => {
      return {
        id: item.id,
        studyId: item.quizId,
        topic: item.quiz?.topic,
        image: item.quiz?.image,
        tags: item.quiz?.tags,
        stats: item.quiz?.stats,
        user: {
          id: item.quiz?.user.id,
          name: item.quiz?.user.name,
          image: item.quiz?.user.image,
          username: item.quiz?.user.username,
        },
        updateAt: item.quiz?.updatedAt,
        createdAt: item.quiz?.createdAt,
        isFavorite: true
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Favorited quizzes found.",
        data: data
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while trying to check favorited quizzes.",
      }),
      { status: 500 }
    );
  }
}