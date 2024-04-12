import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, { params } : { params: { id: string }}) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to delete an invitation.",
        }),
        { status: 401 }
      );
    }

    const { id } = params;

    if(!checkMongoDBID(id)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid invitation ID.",
        }),
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();
  
    const invitation = await prisma.invitation.delete({
      where: {
        id,
        inviteeId: session.user.id
      }
    })

    await prisma.notification.deleteMany({
      where: {
        userId: session.user.id,
        type: 'invitation',
        senderId: invitation.inviterId,
        OR: [
          {
            flashcardsId: invitation.flashcardsId
          },
          {
            quizId: invitation.quizId
          }
        ]
      }
    })

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Invitation deleted.",
        data: invitation
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An undefined error occurred.",
      }),
      { status: 500 }
    );
  }
}