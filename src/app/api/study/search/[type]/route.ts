import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async(req: NextRequest, { params } : { params: { type: 'quizzes' | 'flashcards'}}) => {
  try {
    const { type } = params;

    if(!type){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to specify the type of search.",
        }),
        { status: 400 }
      );
    }

    if(type !== "quizzes" && type !== "flashcards"){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid type of search.",
        }),
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const prisma = new PrismaClient();

    const whereCondition: any = {
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
        },
      ],
    };

    if (category) {
      whereCondition.collectionName = {
        equals: category,
        mode: "insensitive",
      };
    }

    const result = await prisma.$transaction([
      prisma.quiz.findMany({
        where: whereCondition,
        include: {
          user: true,
          LikedStudy: true
        },
        skip: skip,
        take: limit,
      }),
      prisma.flashcards.findMany({
        where: whereCondition,
        include: {
          user: true,
          LikedStudy: true
        },
        skip: skip,
        take: limit,
      })
    ]);

    if(!result){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No results found.",
        }),
        { status: 404 }
      );
    }

    const data = result[type === 'quizzes' ? 0 : 1].map((item) => {
      return {
        id: item.id,
        topic: item.topic,
        image: item.image,
        tags: item.tags,
        stats: item.stats,
        user: {
          id: item.user.id,
          name: item.user.name,
          image: item.user.image,
          username: item.user.username,
        },
        updateAt: item.updatedAt,
        createdAt: item.createdAt,
        isFavorite: item?.LikedStudy?.some((like) => session?.user.id && like.userId === session.user.id)
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Results found.",
        data
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while searching."
      }),
      { status: 500 }
    );
  }
}
