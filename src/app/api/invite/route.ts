import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GET = async () => {
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

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        Followers: {
          include: {
            follower: true
          }
        },
        Following: {
          include: {
            following: true
          }
        },
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

    const friends = user.Following.map((following) => {
      if(user.Following.find((follower) => {
        follower.id !== following.id
      })){
        return null;
      }

      return {
        id: following.followingId,
        name: following.following.name,
        username: following.following.username,
        image: following.following.image,
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        data: friends
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}