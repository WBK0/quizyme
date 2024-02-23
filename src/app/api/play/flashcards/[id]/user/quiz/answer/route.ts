import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import checkQuizAnswer from "./checkQuizAnswer";
import checkTrueFalseAnswer from "./checkTrueFalseAnswer";
import finishQuiz from "./finishQuiz";

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

    const flashcardsQuizGame = await prisma.flashcardQuiz.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      }
    });

    if(!flashcardsQuizGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid quiz game id provided",
        }),
        { status: 400 }
      );
    }

    if(flashcardsQuizGame.isFinished) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game already finished",
        }),
        { status: 400 }
      );
    }

    if(!flashcardsQuizGame.isStarted) {
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

    if(flashcardsQuizGame?.timeToRespond < new Date()){
      const updateQuiz = await prisma.flashcardQuiz.update({
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
          isFinished: flashcardsQuizGame.actualQuestion + 1 === flashcardsQuizGame.questions.length,
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
          questionsLeft: flashcardsQuizGame.questions.length - flashcardsQuizGame.actualQuestion - 1,
          errorId: 102
        }),
        { status: 200 }
      );
    }

    const type = flashcardsQuizGame.questions[flashcardsQuizGame.actualQuestion].type;
    const question = flashcardsQuizGame.questions[flashcardsQuizGame.actualQuestion];

    // Check answers
    if(type === 'Quiz'){
      result = checkQuizAnswer(answer, question.answers)
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

    const updateQuiz = await prisma.flashcardQuiz.update({
      where: {
        id: id,
        userId: session.user.id,
      },
      data: {
        correctAnswers: {
          increment: result === true ? 1 : 0
        },
        actualQuestion: {
          increment: 1
        },
        isAsked: false,
        isFinished: flashcardsQuizGame.actualQuestion + 1 === flashcardsQuizGame.questions.length,
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

    if(flashcardsQuizGame.actualQuestion + 1 === flashcardsQuizGame.questions.length){
      await finishQuiz(
        id,
        flashcardsQuizGame.flashcardsId,
        session.user.id,
        flashcardsQuizGame.correctAnswers + (result === true ? 1 : 0)
      )
    }
    
    return new Response(
      JSON.stringify({
        status: "Success",
        message: result === true ? "You successfully answered the question" : "Incorrect! Your answer is wrong.",
        isCorrect: result === true,
        correctAnswer: result === true ? answer : result,
        questionsLeft: flashcardsQuizGame.questions.length - flashcardsQuizGame.actualQuestion - 1
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