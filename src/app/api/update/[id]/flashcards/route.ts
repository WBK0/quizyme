import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { schema } from "@/app/api/create/flashcards/schema";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server"

export const PATCH = async (req: NextRequest, {params} : {params : {id: string}}) => {
  try {
    const { topic, visibility, tags, image, description, collectionName, flashcards, userId } = await req.json();

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

    const prisma = new PrismaClient();

    const flashcardsSet = await prisma.flashcards.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if(!flashcardsSet){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You don't have permission to update this study"
        }),
        { status: 401 }
      );
    }

    await schema.validate({
      topic, visibility, tags, image, description, collectionName, flashcards, userId: session.user.id
    }, { abortEarly: false });

    const updateFlashcards = await prisma.$transaction([
      prisma.flashcards.update({
        where: {
          id: params.id
        },
        data: {
          topic: topic,
          visibility: visibility,
          tags: tags,
          image: image,
          description: description,
          collectionName: collectionName,
          stats: {
            update: {
              flashcards: flashcards.length,
              learned: 0,
              shared: 0
            }
          },
          flashcards:
            flashcards.map((flashcard: any) => {
              return {
                concept: flashcard.concept,
                definition: flashcard.definition,
              }
            }),
          createdAt: new Date(),
          },
      }),
      prisma.flashcardQuizStats.deleteMany({
        where: {
          flashcardsId: params.id
        }
      }),
      prisma.flashcardQuiz.deleteMany({
        where: {
          flashcardsId: params.id
        }
      }),
      prisma.flashcardsGame.deleteMany({
        where: {
          flashcardsId: params.id
        }
      }),
      prisma.invitation.deleteMany({
        where: {
          flashcardsId: params.id
        }
      }),
    ]);

    if(!updateFlashcards){
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
        message: "Updated flashcards successfully",
        id: flashcardsSet.id
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
}