import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import checkQuizAnswer from "./checkQuizAnswer";

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

    const { answer, skipAnswer } = await req.json();

    if(!answer) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Please provide an answer",
        }),
        { status: 400 }
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

    if(quizGame.isFinished) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game already finished",
        }),
        { status: 400 }
      );
    }

    if(!quizGame.isStarted) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game not started yet",
        }),
        { status: 400 }
      );
    }

    if(!skipAnswer && quizGame?.timeToRespond < new Date()){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Time to respond expired",
        }),
        { status: 400 }
      );
    }

    const type = quizGame.quiz.questions[quizGame?.questionsOrder[quizGame.actualQuestion]].type;
    const question = quizGame.quiz.questions[quizGame?.questionsOrder[quizGame.actualQuestion]];

    let result; 
    let points;
    const timeFromStart = (quizGame.timeToRespond.getTime() - new Date().getTime()) / 1000

    // Check answers
    if(type === 'Quiz'){
      result = checkQuizAnswer(answer, question.answers)
    }else if(type === 'Multiple Choice'){
    
    }

    // Calculate points
    if(result === true){
      points = question.points * (timeFromStart * 100 / (question.time + 5) / 100) // 5 seconds for safety reasons
      if(points < 0) points = 0
      if(points > question.points) points = question.points
    }else{
      points = 0
    }

    if(result === true){
      const updateQuiz = await prisma.quizGame.update({
        where: {
          id: id,
          userId: session.user.id,
        },
        data: {
          points: {
            increment: points
          },
          correctAnswers: {
            increment: 1
          },
          actualQuestion: {
            increment: 1
          },
          timeToRespond: new Date(Date.now() + quizGame.quiz.questions[quizGame?.questionsOrder[quizGame.actualQuestion + 1]].time * 1000 + 5000) // 5 seconds for safety reasons
        }
      });

      if(!updateQuiz) {
        return new Response(
          JSON.stringify({
            status: "Error",
            message: "Failed to update quiz game",
          }),
          { status: 400 }
        );
      }
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "You successfully answered the question",
        isCorrect: result === true,
        correctAnswer: result === true ? answer : result,
        pointsGet: points,
        pointsTotal: quizGame.points + points,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Unexpected error occured",
      }),
      { status: 500 }
    );
  }
}