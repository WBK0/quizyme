import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, {params} : {params : {id: string}}) => {
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

    if(!quizGame.isStarted) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game not started yet",
          errorId: 101,
          quizSlug: quizGame.quiz.topic.replaceAll(' ', '-') + '-' + quizGame.quiz.id
        }),
        { status: 400 }
      );
    }

    if(quizGame.isFinished) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game already finished",
        }),
        { status: 400 }
      );
    }

    if(quizGame.isAsked && new Date().getTime() > quizGame.timeToRespond.getTime()){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Time for this question has already passed, ask for next question",
          errorId: 102,
        }),
        { status: 400 }
      );
    }

    if(quizGame.isAsked === false){
      const updateQuiz = await prisma.quizGame.update({
        where: {
          id: id
        },
        data: {
          isAsked: true,
          timeToRespond: new Date(Date.now() + (quizGame.quiz.questions[quizGame?.questionsOrder[quizGame.actualQuestion]]?.time || 0) * 1000 + 5000), // 5 seconds for safety reasons
        }
      });

      if(!updateQuiz){
        return new Response(
          JSON.stringify({
            status: "Error",
            message: "Unexpected error occured",
          }),
          { status: 400 }
        );
      }
    }

    const gameData = {
      id: quizGame.id,
      topic: quizGame.quiz.topic,
      timeToRespond: quizGame.timeToRespond,
      isStarted: quizGame.isStarted,
      isFinished: quizGame.isFinished,
      points: quizGame.points,
      actualQuestion: quizGame.actualQuestion,
      numberOfQuestions: quizGame.quiz.questions.length,
      question: {
        ...quizGame.quiz.questions[quizGame?.questionsOrder[quizGame.actualQuestion]],
        answers: quizGame.quiz.questions[quizGame?.questionsOrder[quizGame.actualQuestion]].answers.map((answer) => ({
          id: answer.id,
          answer: answer.answer
        }))
      }
    };

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Quiz game fetched successfully",
        data: gameData,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Unexpected error occured",
      }),
      { status: 400 }
    );
  }
}