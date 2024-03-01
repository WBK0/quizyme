import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, { params } : { params: { slug: string }}) => {
  try {
    const { slug } = params;

    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to like a study set.",
        }),
        { status: 401 }
      );
    }

    const prisma = new PrismaClient();

    const countOccurrences = (str : string, char : string) => {
      return str.split(char).length - 1;
    }
  
    const id = slug.split('-')[countOccurrences(slug, '-')];

    if(!checkMongoDBID(id)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid study set ID.",
        }),
        { status: 400 }
      );
    }

    const study = await prisma.$transaction([
      prisma.quiz.findUnique({
        where: {
          id: id,
        },
      }),
      prisma.flashcards.findUnique({
        where: {
          id: id,
        },
      }),
    ]);

    if(!study[0] && !study[1]){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Study set not found.",
        }),
        { status: 404 }
      );
    }

    const type = study[0] ? "quiz" : "flashcards";

    const isLiked = await prisma.likedStudy.findFirst({
      where: {
        userId: session.user.id,
        OR: [
          {
            quizId: study[0]?.id,
          },
          {
            flashcardsId: study[1]?.id,
          }
        ]
      }
    });

    let unlike;
    let like;

    if(isLiked){
      unlike = await prisma.likedStudy.delete({
        where: {
          id: isLiked.id,
        }
      });
    }else{
      like = await prisma.likedStudy.create({
        data: {
          type: type,
          userId: session.user.id,
          quizId: study[0]?.id,
          flashcardsId: study[1]?.id,
        }
      });
    }

    if(!like && !unlike){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "An error occurred while liking the study set.",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: isLiked ? "Study set unliked." : "Study set liked.",
      }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while liking the study set.",
      }),
      { status: 500 }
    );
  }
}