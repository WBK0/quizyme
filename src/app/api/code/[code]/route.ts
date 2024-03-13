import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params } : { params: { code: string } }) => {
  try {
    const { code } = params;

    const prisma = new PrismaClient();

    const result = await prisma.$transaction([
      prisma.quiz.findFirst({
        where: {
          code: {
            code: {
              equals: code
            }
          }
        }
      }),
      prisma.flashcards.findFirst({
        where: {
          code: {
            code: {
              equals: code
            }
          }
        }
      })
    ])

    prisma.$disconnect();

    if(!result[0] && !result[1]){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No quiz or flashcard found",
        }),
        { status: 404 }
      );
    }

    const quiz = result[0];
    const flashcard = result[1];

    const url = quiz 
      ? `/study/${quiz.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${quiz.id}`
      : flashcard ? `/study/${flashcard.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${flashcard.id}` : null;

    return new Response(
      JSON.stringify({
        status: "Success",
        message: `${quiz ? 'Quiz' : 'Flashcard'} found`,
        path: url
      }),
      { status: 200 }
    );
  } catch (error) {
    
  }
}