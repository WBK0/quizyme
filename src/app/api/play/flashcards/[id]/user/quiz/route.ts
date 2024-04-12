import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import checkMongoDBID from "@/utils/checkMongodbID";
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

    const prisma = new PrismaClient();

    const flashcardsQuizGame = await prisma.flashcardQuiz.findUnique({
      where: {
        id: id,
      }
    });

    

    if(!flashcardsQuizGame) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid quiz game id provided",
          errorId: 100,
        }),
        { status: 400 }
      );
    }

    if(!flashcardsQuizGame.isStarted) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Quiz game not started yet",
          userId: flashcardsQuizGame.userId,
          errorId: 101,
          slug: flashcardsQuizGame.topic.replaceAll(' ', '-') + '-' + flashcardsQuizGame.flashcardsId
        }),
        { status: 400 }
      );
    }

    if(flashcardsQuizGame.isFinished) {
      return new Response(
        JSON.stringify({
          status: "Success",
          message: "Quiz game already finished",
          userId: flashcardsQuizGame.userId,
          isFinished: true
        }),
        { status: 200 }
      );
    }

    if(!session?.user?.id) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User not logged in",
          userId: flashcardsQuizGame.userId,
        }),
        { status: 401 }
      );
    }

    if(flashcardsQuizGame.isAsked && new Date().getTime() > flashcardsQuizGame.timeToRespond.getTime()){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Time for this question has already passed, ask for next question",
          errorId: 102,
        }),
        { status: 400 }
      );
    }

    let updateQuiz = null;

    if(flashcardsQuizGame.isAsked === false){
      updateQuiz = await prisma.flashcardQuiz.update({
        where: {
          id: id
        },
        data: {
          isAsked: true,
          timeToRespond: new Date(Date.now() + (flashcardsQuizGame.questions[flashcardsQuizGame.actualQuestion]?.time || 0) * 1000 + 5000), // 5 seconds for safety reasons
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
      id: flashcardsQuizGame.id,
      topic: flashcardsQuizGame.topic,
      timeToRespond: updateQuiz?.timeToRespond || flashcardsQuizGame.timeToRespond,
      isStarted: flashcardsQuizGame.isStarted,
      isFinished: flashcardsQuizGame.isFinished,
      actualQuestion: flashcardsQuizGame.actualQuestion,
      numberOfQuestions: flashcardsQuizGame.questions.length,
      welcome: flashcardsQuizGame.actualQuestion === 0 && !flashcardsQuizGame.isAsked,
      question: {
        ...flashcardsQuizGame.questions[flashcardsQuizGame.actualQuestion],
        answers: flashcardsQuizGame.questions[flashcardsQuizGame.actualQuestion].answers.map((answer) => ({
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
        userId: flashcardsQuizGame.userId,
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