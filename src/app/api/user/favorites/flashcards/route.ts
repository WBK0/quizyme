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
          message: "You need to be logged in to check favorited flashcards.",
        }),
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";

    const prisma = new PrismaClient();

    let result = await prisma.likedStudy.findMany({
      where: {
        userId: session.user.id,
        flashcardsId: {
          not: null
        },
        flashcards: {
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
        flashcards: {
          include: {
            user: true
          }
        }
      },
      skip: skip,
      take: limit,
    });

    if(!result){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No favorited flashcards found."
        }),
        { status: 404 }
      );
    }

    const data = result.map((item) => {
      return {
        id: item.id,
        studyId: item.flashcardsId,
        topic: item.flashcards?.topic,
        image: item.flashcards?.image,
        tags: item.flashcards?.tags,
        stats: item.flashcards?.stats,
        user: {
          id: item.flashcards?.user.id,
          name: item.flashcards?.user.name,
          image: item.flashcards?.user.image,
          username: item.flashcards?.user.username,
        },
        updateAt: item.flashcards?.updatedAt,
        createdAt: item.flashcards?.createdAt,
        isFavorite: true
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Favorited flashcards found.",
        data: data
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while trying to check favorited flashcards.",
      }),
      { status: 500 }
    );
  }
}