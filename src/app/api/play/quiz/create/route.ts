import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import checkMongoDBID from "@/utils/checkMongodbID";
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
          message: "Please login to create a quiz game",
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

    let questionsOrder = quiz.questions.map((question, index) => index);

    for (let i = questionsOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsOrder[i], questionsOrder[j]] = [questionsOrder[j], questionsOrder[i]];
    }

    const createdQuiz = await prisma.quizGame.create({
      data: {
        quizId: quizId,
        userId: session?.user?.id,
        questionsOrder: questionsOrder,
        actualQuestion: 0,
        timeToRespond: new Date(),
        points: 0,
        correctAnswers: 0
      }
    })

    if(!createdQuiz) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Failed to create quiz game",
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Successfully created quiz game",
        gameId: createdQuiz.id
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