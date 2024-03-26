import { PrismaClient } from "@prisma/client";

export const GET = async (req: Request) => {
  try {
    const prisma = new PrismaClient();

    const collection = await prisma.collection.findMany({
      take: 4,
      orderBy: {
        id: "desc"
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Collection retrieved successfully",
        collection: collection
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Error retrieving collection",
        error: error
      }),
      { status: 500 }
    );
  }
}