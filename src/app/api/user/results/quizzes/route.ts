import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
          message: "You need to be logged in to check your quizzes results.",
        }),
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";

    const prisma = new PrismaClient();

    let results = await prisma.quizGameStats.findMany({
      where: {
        userId: session.user.id,
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
          }
        }
      },
      skip: skip,
      take: limit,
    });

    if(!results){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No quizzes results found."
        }),
        { status: 404 }
      );
    }

    const data = results.map((item) => {
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
        correctAnswers: item.correctAnswers,
        points: item.points,
        updateAt: item.quiz?.updatedAt,
        createdAt: item.quiz?.createdAt,
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Quizzes results found.",
        data: data
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while trying to check quizzes results.",
      }),
      { status: 500 }
    );
  }
}