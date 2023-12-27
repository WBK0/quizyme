import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";

export const GET = async (req: Request, {params} : {params : {slug: string}}) => {
  connectToDB();
  const prisma = new PrismaClient();
  const { slug } = params;

  console.log(slug)

  if(!slug) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "No SLUG provided",
      }),
      { status: 400 }
    );
  }

  function countOccurrences(str : string, char : string) {
    return str.split(char).length - 1;
  }

  const id = slug.split('-')[countOccurrences(slug, '-')];
  const topic = slug.split('-').slice(0, countOccurrences(slug, '-')).join(' ');

  const result = await prisma.$transaction([
    prisma.quiz.findFirst({
      where: {
        id: id,
        topic: topic
      },
      include: {
        user: true,
        code: true,
        collection: true
      }
    }),
    prisma.flashcards.findFirst({
      where: {
        id: id,
        topic: topic
      },
      include: {
        user: true,
        code: true,
        collection: true
      }
    }),
  ]);
  
  const [quizResults, flashcardResults] = result;

  if(quizResults) {
    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Quiz found",
        data: {
          ...quizResults,
          type: 'quiz'
        },
      }),
      { status: 200 }
    );
  }else if(flashcardResults) {
    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Flashcards found",
        data: {
          ...flashcardResults,
          type: 'flashcards'
        },
      }),
      { status: 200 }
    );
  }else{
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "No quiz or flashcard set found",
      }),
      { status: 404 }
    );
  }
};