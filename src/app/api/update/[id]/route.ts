import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

export const GET = async (req: NextRequest, {params} : {params : {id: string}}) => {
  try {
    const { id } = params;
    
    const session = await getServerSession(authOptions);

    if(!session){
      return {
        status: 401,
        message: "You need to be logged in to update a study"
      }
    }

    const prisma = new PrismaClient();

    const result = await prisma.$transaction([
      prisma.quiz.findFirst({
        where: {
          id: id,
        },
        include: {
          user: true,
          code: true,
          collection: true,
        }
      }),
      prisma.flashcards.findFirst({
        where: {
          id: id,
        },
        include: {
          user: true,
          code: true,
          collection: true,
        }
      }),
    ]);

    const [quizResults, flashcardResults] = result;

    return new Response(
      JSON.stringify({
        status: "Success",
        data: quizResults || flashcardResults,
        type: quizResults ? "quiz" : "flashcards"
      }),
      { status: 200 }
    );

  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred",
      }),
      { status: 500 }
    );  
  }
};