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

    const friends = user.Followers.map((follower) => {
      if(user.Followers.some((item) => (item.followerId === follower.followerId))){
        return {
          id: follower.followerId,
          name: follower.follower.name,
          image: follower.follower.image,
          username: follower.follower.username
        };
      }
    })

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