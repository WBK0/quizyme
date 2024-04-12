import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import { schema } from "./schema";
import * as yup from 'yup';
import { generateCode } from "../generateCode";

export const POST = async (req: Request) => {
  const prisma = new PrismaClient();
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

  const userId = session?.user?.id;

  const { topic, visibility, tags, image, description, collectionName, flashcards } = await req.json();

  try {
    await schema.validate({
      topic, visibility, tags, image, description, collectionName, flashcards, userId
    }, { abortEarly: false });

    const codeId = await generateCode();

    const flashcardSet = await prisma.flashcards.create({
      data: {
        topic: topic,
        visibility: visibility,
        tags: tags,
        image: image,
        description: description,
        collectionName: collectionName,
        codeId: codeId,
        stats: {
          flashcards: flashcards.length,
        },
        flashcards:
          flashcards.map((flashcard: any) => {
            return {
              concept: flashcard.concept,
              definition: flashcard.definition,
            }
          }),
        userId: userId
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Added new quiz successfully",
        id: flashcardSet.id
      }),
      { status: 200 }
    );

  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      const validationErrors = error.errors.map(err => err.toString());
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid request body",
          errors: validationErrors,
        }),
        { status: 400 }
      );

    }else if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: error.message,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Unknown error",
      }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
