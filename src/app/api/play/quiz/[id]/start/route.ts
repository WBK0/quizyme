import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, { params } : {params : {id: string}}) => {
  try {
    const { id } = params;

    if(!checkMongoDBID(id)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid format of quiz id provided",
        }),
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if(!session?.user?.id) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User not logged in",
        }),
        { status: 401 }
      );
    }

    connectToDB();
    const prisma = new PrismaClient();

    const quizGame = await prisma.quizGame.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      },
      include: {
        quiz: true,
      }
    });

    if(!quizGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid quiz game id provided",
        }),
        { status: 400 }
      );
    }

    if(quizGame.isStarted) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game already started",
        }),
        { status: 400 }
      );
    }

    const timeForQuestion = quizGame.quiz.questions[quizGame?.questionsOrder[quizGame.actualQuestion]].time;

    const timeToRespond = new Date(Date.now() + timeForQuestion * 1000 + 5000) // 5 seconds for safety reasons

    const updateQuizGame = await prisma.$transaction([
      prisma.quizGame.update({
        where: {
          id: id,
          userId: session.user.id,
        },
        data: {
          isStarted: true,
          timeToRespond: timeToRespond,
        }
      }),
      prisma.quiz.update({
        data: {
          stats: {
            update: {
              played: {
                increment: 1,
              }
            }
          }
        },
        where: {
          id: quizGame.quizId,  
        }
      })
    ])
    
    if(!updateQuizGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Failed to start quiz game",
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Quiz game started successfully",
      }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Something went wrong",
      }),
      { status: 500 }
    )
  }
}