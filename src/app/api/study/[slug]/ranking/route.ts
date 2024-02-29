import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req : NextRequest, { params } : { params: { slug: string }}) => {
  try {
    const { slug } = params;

    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";

    if(!slug) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No SLUG provided",
        }),
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();

    const countOccurrences = (str : string, char : string) => {
      return str.split(char).length - 1;
    }
  
    const id = slug.split('-')[countOccurrences(slug, '-')];

    let ranking;

    const result = await prisma.$transaction([
      prisma.quizGameStats.findMany({
        where: {
          quizId: id,
        },
        skip: skip,
        take: limit,
        include: {
          user: true,
        },
        orderBy: {
          points: 'desc',
        }
      }),
      prisma.flashcardQuizStats.findMany({
        where: {
          flashcardsId: id,
        },
        skip: skip,
        take: limit,
        include: {
          user: true,
        },
        orderBy: {
          correctAnswers: 'desc',
        }
      })
    ]);

    const type = result[0].length > 0 ? 'quiz' : result[1].length > 0 ? 'flashcards' : null

    if(!type){
      return new Response(
        JSON.stringify({
          status: "Success",
          message: "No ranking found",
          data: []
        }),
        { status: 200 }
      );
    }

    ranking = result && result[type === 'quiz' ? 0 : 1].map((rank : any) => {
      return {
        user: {
          id: rank.user.id,
          name: rank.user.name,
          image: rank.user.image,
          username: rank.user.username,
        },
        points: rank.points || null,
        correctAnswers: rank.correctAnswers || null,
      } 
    });

    if(search !== ''){
      ranking = ranking?.filter((rank : any) => {
        return rank.user.name.toLowerCase().includes(search.toLowerCase()) || rank.user.username.toLowerCase().includes(search.toLowerCase());
      });
    }

    if(!ranking) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No ranking found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        data: ranking,
      }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Internal Server Error"
      })
    ), { status: 500 }
  }
}