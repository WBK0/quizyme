import { NextRequest } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import checkMongoDBID from "@/utils/checkMongodbID";

export const GET = async (req: NextRequest, {params} : { params: { studyId: string }}) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to invite friends.",
        }),
        { status: 401 }
      );
    }

    const { studyId } = params;

    if(!checkMongoDBID(studyId)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid study ID",
        }),
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();

    const invitations = await prisma.invitation.findMany({
      where: {
        OR: [
          {
            flashcardsId: studyId
          },
          {
            quizId: studyId
          }
        ],
        inviterId: session.user.id
      }
    });

    const invitationsData = invitations.map((invitation) => invitation.inviteeId);

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Invitations retrieved successfully",
        data: invitationsData
      }),
      { status: 200 }
    );
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while trying to get the data."
      }),
      { status: 500 }
    );
  }
}