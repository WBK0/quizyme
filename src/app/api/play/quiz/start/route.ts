import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
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

    const { quizId } = await req.json();

    if(!quizId) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Please provide a quiz id",
        }),
        { status: 400 }
      );
    }

    if(!checkMongoDBID(quizId)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid format of quiz id provided",
        }),
        { status: 400 }
      );
    }

    connectToDB();
    const prisma = new PrismaClient();

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId
      }
    });

    if(!quiz) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid quiz id provided",
        }),
        { status: 400 }
      );
    }

    prisma.quizGame.create({
      data: {
        quizId: quizId,
        userId: session?.user?.id,
        questionOrder: [0, 1],
        actualQuestion: 0,
        timeToRespond: new Date(),
        points: 0,
        correctAnswers: 0
      }
    })

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Successfully created quiz game",
        gameId: "1234567890"
      }),
      { status: 201 }
    )
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Failed to create quiz game",
      }),
      { status: 400 }
    );
  }
}