import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, { params } : { params: { id: string }}) => {
  try {
    const { id } = params;

    if(!checkMongoDBID(id)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to provide a valid id to delete a quiz",
        }),
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to delete a quiz",
        }),
        { status: 401 }
      );
    }

    const prisma = new PrismaClient();

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
        userId: session.user.id
      }
    })

    if(!quiz){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz not found",
        }),
        { status: 404 }
      );
    }

    const deleteQuiz = await prisma.$transaction([
      prisma.quizGameStats.deleteMany({
        where: {
          quizId: id
        }
      }),
      prisma.quizGame.deleteMany({
        where: {
          quizId: id
        }
      }),
      prisma.invitation.deleteMany({
        where: {
          quizId: id
        }
      }),
      prisma.quiz.delete({
        where: {
          id: id,
          userId: session.user.id
        }
      }),
      prisma.code.delete({
        where: {
          id: quiz?.codeId
        }
      })
    ])

    if(!deleteQuiz){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "An error occurred while deleting the quiz",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'Success',
        message: "Deleted successfully"
      }),
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        status: 'Error',
        message: "Internal server error"
      }),
      { status: 500 }
    )
  }
}