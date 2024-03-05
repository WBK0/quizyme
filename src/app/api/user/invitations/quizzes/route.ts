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
          message: "You need to be logged in to check your quizzes invitations.",
        }),
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";

    const prisma = new PrismaClient();

    let result = await prisma.invitation.findMany({
      where: {
        inviteeId: session.user.id,
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
            user: true,
            LikedStudy: true
          }
        },
        inviter: true
      },
      skip: skip,
      take: limit,
    });

    if(!result){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No quizzes invitations found."
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
        inviter: {
          id: item.inviter.id,
          image: item.inviter.image,
          username: item.inviter.username,
          name: item.inviter.name
        },
        user: {
          id: item.quiz?.user.id,
          name: item.quiz?.user.name,
          image: item.quiz?.user.image,
          username: item.quiz?.user.username,
        },
        updateAt: item.quiz?.updatedAt,
        createdAt: item.quiz?.createdAt,
        isFavorite: item.quiz?.LikedStudy?.some((like) => like.userId === session.user.id)
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Quizzes invitations found.",
        data: data
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while trying to check quizzes invitations.",
      }),
      { status: 500 }
    );
  }
}