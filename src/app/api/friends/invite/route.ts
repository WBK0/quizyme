import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import checkMongoDBID from "@/utils/checkMongodbID";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Login required to invite users",
        }),
        { status: 401 }
      );
    }
    
    const { type, inviteeId, studyId } = await req.json();

    if(type !== 'flashcards' && type !== 'quiz'){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid type of invitation",
        }),
        { status: 400 }
      );
    }

    if(!checkMongoDBID(inviteeId)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid user ID",
        }),
        { status: 400 }
      );
    }

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
    
    const invitee = await prisma.user.findFirst({
      where: {
        id: inviteeId
      }
    });

    if(!invitee){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User who you are trying to invite does not exist",
        }),
        { status: 404 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id
      },
      include: {
        Followers: true,
        Following: true,
      }
    });

    if(!user){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    const isFriend = user.Following.some(following => following.followingId === inviteeId) && user.Followers.some(follower => follower.followerId === inviteeId);

    if(!isFriend){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User who you are trying to invite is not your friend",
        }),
        { status: 400 }
      );
    }

    const isInvitationExists = await prisma.invitation.findFirst({
      where: {
        inviterId: session.user.id,
        inviteeId: inviteeId,
        type,
        OR: [
          {flashcardsId: studyId},
          {quizId: studyId}
        ]
      }
    });

    if(isInvitationExists){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invitation already exists",
        }),
        { status: 400 }
      );
    }

    const invitation = await prisma.invitation.create({
      data: {
        inviterId: session.user.id,
        inviteeId: inviteeId,
        type,
        flashcardsId: type === 'flashcards' ? studyId : null,
        quizId: type === 'quiz' ? studyId : null,
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Users invited successfully",
        data: invitation
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while trying to invite users",
      }),
      { status: 500 }
    ); 
  }
}