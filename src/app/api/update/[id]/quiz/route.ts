import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { schema } from "@/app/api/create/quiz/schema";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest, {params} : {params : {id: string}}) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to update a study"
        }),
        { status: 401 }
      );
    }

    const { topic, visibility, tags, pointsMethod, image, description, collectionName, questions } = await req.json();

    await schema.validate({
      topic, visibility, tags, pointsMethod, image, description, collectionName, questions, userId: session.user.id
    }, { abortEarly: false });

    const prisma = new PrismaClient();

    const quiz = await prisma.quiz.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if(!quiz){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You don't have permission to update this study"
        }),
        { status: 401 }
      );
    }

    const updateQuiz = await prisma.$transaction([
      prisma.quiz.update({
        where: {
          id: params.id
        },
        data: {
          topic: topic,
          visibility: visibility,
          tags: tags,
          pointsMethod: pointsMethod,
          image: image,
          description: description,
          collectionName: collectionName,
          stats: {
            questions: questions.length,
          },
          questions:
            questions.map((question: any) => {
              return {
                question: question.question,
                points: question.points,
                time: question.time,
                type: question.type,
                image: question.image,
                answers:
                  question.answers.map((answer: any) => {
                    return {
                      answer: answer.answer,
                      isCorrect: answer.isCorrect,
                    }
                  })
              }
            })
        }
      }),
      prisma.quizGameStats.deleteMany({
        where: {
          quizId: params.id
        }
      }),
      prisma.quizGame.deleteMany({
        where: {
          quizId: params.id
        }
      }),
      prisma.invitation.deleteMany({
        where: {
          quizId: params.id
        }
      })
    ]);

    if(!updateQuiz){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "An error occurred while updating the study"
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Updated study successfully",
        id: quiz.id
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred",
      }),
      { status: 500 }
    );
  }
};