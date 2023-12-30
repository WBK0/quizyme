import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";
import prismaRandom from 'prisma-extension-random';

export const GET = async (req: Request, {params} : {params : {type: string}}) => {
  const { type } = params;

  if(!type || (type !== 'quiz' && type !== 'flashcards')) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Invalid type provided",
      }),
      { status: 400 }
    );
  }

  connectToDB();
  const prisma = new PrismaClient().$extends(prismaRandom());;

  let result;

  try {
    if(type === 'quiz'){
      result = await prisma.quiz.findManyRandom(3, {
        select: {
          id: true,
          topic: true,
          description: true,
          user: {
            select: {
              id: true,
              username: true,
              image: true,
              name: true
            }
          },
        }
      });
    }else if(type === 'flashcards'){
      result = await prisma.flashcards.findManyRandom(3, {
        select: {
          id: true,
          topic: true,
          description: true,
          user: {
            select: {
              id: true,
              username: true,
              image: true,
              name: true
            }
          },
        }
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Unexpected error while fetching recommendations",
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      status: "Success",
      message: "Recommendations found",
      data: result
    }),
  )
}