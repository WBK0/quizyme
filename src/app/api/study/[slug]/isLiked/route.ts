import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params } : { params: { slug: string }}) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to check study status.",
        }),
        { status: 401 }
      );
    }

    const { slug } = params;

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

    const result = await prisma.likedStudy.findFirst({
      where: {
        userId: session.user.id,
        OR: [
          {
            quizId: id
          },
          {
            flashcardsId: id
          }
        ]
      }
    })

    if(!result){
      return new Response(
        JSON.stringify({
          status: "Success",
          message: "Study set is not liked.",
          isLiked: false
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Study set is liked.",
        isLiked: true
      }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while checking study status.",
      }),
      { status: 500 }
    ); 
  }
}