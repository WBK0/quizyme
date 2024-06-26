import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";

export const GET = async (req: Request, {params} : {params : {slug: string}}) => {
  try {
    const prisma = new PrismaClient();
    const { slug } = params;

    if(!slug) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No SLUG provided",
        }),
        { status: 400 }
      );
    }

    const countOccurrences = (str : string, char : string) => {
      return str.split(char).length - 1;
    }

    const id = slug.split('-')[countOccurrences(slug, '-')];

    const result = await prisma.$transaction([
      prisma.quiz.findFirst({
        where: {
          id: id,
        },
        include: {
          user: true,
          code: true,
          collection: true,
          LikedStudy: true
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
          LikedStudy: true
        }
      }),
    ]);
    
    const [quizResults, flashcardResults] = result;

    const quizData = {
      stats: quizResults?.stats,
      id: quizResults?.id,
      topic: quizResults?.topic,
      visibility: quizResults?.visibility,
      tags: quizResults?.tags,
      pointsMethod: quizResults?.pointsMethod,
      image: quizResults?.image,
      description: quizResults?.description,
      collectionName: quizResults?.collectionName,
      createdAt: quizResults?.createdAt,
      updatedAt: quizResults?.updatedAt,
      user: {
        id: quizResults?.user?.id,
        name: quizResults?.user?.name,
        image: quizResults?.user?.image,
        username: quizResults?.user?.username,
      },
      length: quizResults?.stats.questions,
      code: quizResults?.code.code,
    }

    const flashcardData = {
      stats: flashcardResults?.stats,
      id: flashcardResults?.id,
      topic: flashcardResults?.topic,
      visibility: flashcardResults?.visibility,
      tags: flashcardResults?.tags,
      image: flashcardResults?.image,
      description: flashcardResults?.description,
      collectionName: flashcardResults?.collectionName,
      createdAt: flashcardResults?.createdAt,
      updatedAt: flashcardResults?.updatedAt,
      user: {
        id: flashcardResults?.user?.id,
        name: flashcardResults?.user?.name,
        image: flashcardResults?.user?.image,
        username: flashcardResults?.user?.username,
      },
      length: flashcardResults?.stats.flashcards,
      code: flashcardResults?.code.code,
    }

    if(quizResults) {
      return new Response(
        JSON.stringify({
          status: "Success",
          message: "Quiz found",
          data: {
            ...quizData,
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
            ...flashcardData,
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
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred",
      }),
      { status: 500 }
    );
  }
};