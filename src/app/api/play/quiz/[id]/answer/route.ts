import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import checkQuizAnswer from "./checkQuizAnswer";
import checkPuzzleAnswer from "./checkPuzzleAnswer";
import checkMultiplechoiceAnswer from "./checkMultiplechoiceAnswer";
import checkTrueFalseAnswer from "./checkTrueFalseAnswer";

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

    const { answer } = await req.json();

    if(!answer) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Please provide an answer",
        }),
        { status: 400 }
      );
    }

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
          errorId: 101
        }),
        { status: 400 }
      );
    }

    let result; 
    let points = 0;

    if(quizGame?.timeToRespond < new Date()){
      const updateQuiz = await prisma.quizGame.update({
        where: {
          id: id,
          userId: session.user.id,
        },
        data: {
          actualQuestion: {
            increment: 1
          },
          timeToRespond: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
          isAsked: false,
          isFinished: quizGame.actualQuestion + 1 === quizGame.quiz.questions.length,
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

      return new Response(
        JSON.stringify({
          status: "Success",
          message: "Time to answer expired",
          pointsGet: 0,
          pointsTotal: quizGame.points,
          questionsLeft: quizGame.quiz.questions.length - quizGame.actualQuestion - 1,
          errorId: 102
        }),
        { status: 200 }
      );
    }

    const type = quizGame.quiz.questions[quizGame?.questionsOrder[quizGame.actualQuestion]].type;
    const question = quizGame.quiz.questions[quizGame?.questionsOrder[quizGame.actualQuestion]];

    const timeFromStart = (quizGame.timeToRespond.getTime() - new Date().getTime()) / 1000

    // Check answers
    if(type === 'Quiz'){
      result = checkQuizAnswer(answer, question.answers)
    }else if(type === 'Puzzle'){
      result = checkPuzzleAnswer(answer, question.answers)
    }else if(type === 'Multiple choice'){
      result = checkMultiplechoiceAnswer(answer, question.answers)
    }else if(type === 'True / False'){
      result = checkTrueFalseAnswer(answer, question.answers)
    }else{
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid question type",
        }),
        { status: 400 }
      );
    }

    // Calculate points
    if(result === true){
      points = question.points * (timeFromStart * 100 / (question.time + 5) / 100)
      if(points < 0) points = 0
      if(points > question.points) points = question.points
    }else{
      points = 0
    }

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
          increment: result === true ? 1 : 0
        },
        actualQuestion: {
          increment: 1
        },
        isAsked: false,
        isFinished: quizGame.actualQuestion + 1 === quizGame.quiz.questions.length,
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

    if(quizGame.actualQuestion + 1 === quizGame.quiz.questions.length){
      
    }
    
    return new Response(
      JSON.stringify({
        status: "Success",
        message: result === true ? "You successfully answered the question" : "Incorrect! Your answer is wrong.",
        isCorrect: result === true,
        correctAnswer: result === true ? answer : result,
        pointsGet: points,
        pointsTotal: quizGame.points + points,
        questionsLeft: quizGame.quiz.questions.length - quizGame.actualQuestion - 1
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Unexpected error occured",
      }),
      { status: 500 }
    );
  }
}