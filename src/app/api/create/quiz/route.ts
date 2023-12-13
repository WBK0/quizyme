import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client"

export const POST = async (req : Request) => {
  try {
    const prisma = new PrismaClient();
    connectToDB();

    // await prisma.quiz.create({
    //   data: {
    //     topic: "Test",
    //     visibility: "public",
    //     tags: ["test", "test1"],
    //     pointsMethod: "Based on answer time",
    //     image: "",
    //     description: "Test",
    //     collectionId: "657a113b54eb35a503e8ada1",
    //     questions: [{
    //       question: "Test",
    //       answers: [
    //         {
    //           answer: "Test",
    //           isCorrect: true,
    //         },
    //         {
    //             answer: "Test",
    //             isCorrect: false,
    //         }
    //       ]
    //     }],
    //     userId: "657a113b54eb35a503e8ada1"
    // }
    // })
    const test = await prisma.quiz.findFirst({
      include: {
        collection: true,
      }
    });
    return new Response(
      JSON.stringify(test),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
  

  return new Response(
    JSON.stringify({
      status: "Success",
      message: "Added new quiz successfully",
    }),
    { status: 200 }
  )
}