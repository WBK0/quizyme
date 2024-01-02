import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    connectToDB();
    const prisma = new PrismaClient();

    const quizGame = await prisma.quizGame.findUnique({
      where: {
        id: '659404e7928507248cdbca97'
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

    const questionIndex = quizGame.questionsOrder[quizGame.actualQuestion];

    const data = {
      id: quizGame.id,
      points: quizGame.points,
      actualQuestion: quizGame.actualQuestion,
      isFinished: quizGame.isFinished,
      timeToRespond: quizGame.timeToRespond,
      question: {
        question: quizGame.quiz.questions[questionIndex].question,
        points: quizGame.quiz.questions[questionIndex].points,
        time: quizGame.quiz.questions[questionIndex].time,
        image: quizGame.quiz.questions[questionIndex].image,
        type: quizGame.quiz.questions[questionIndex].type,
        answers: quizGame.quiz.questions[questionIndex].answers.map((answer) => (
          answer.answer
        )),
      }
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Quiz game found",
        data: data
      }),
      { status: 400 }
    );
  } catch (error) {
    
  }
  
}