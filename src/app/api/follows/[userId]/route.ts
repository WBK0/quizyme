import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GET = async (req: NextRequest, {params} : {params : {userId: string}}) => {
  try {
    const { userId } = params;

    if(!userId) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No username provided",
        }),
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        Followers: {
          include: {
            follower: true,
            following: true
          }
        },
        Following: {
          include: {
            following: true,
            follower: true
          }
        },
    }});

    if(!user) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    let sessionUserFollows : null | { followingId: string }[] = null;

    if(session?.user?.id) {
      sessionUserFollows = await prisma.follower.findMany({
        where: {
          followerId: session?.user?.id
        }
      });
    }

    const data = {
      followers: user.Followers.length > 0 ? user.Followers.map((follower) => {
        return {
          id: follower.id,
          username: follower.follower.username,
          image: follower.follower.image,
          name: follower.follower.name,
          userId: follower.follower.id,
          isFollowing: sessionUserFollows ? sessionUserFollows.some((follow) => follow.followingId === follower.follower.id) : false
        }
      }) : [],
      following: user.Following.map((following) => {
        return {
          id: following.id,
          username: following.following.username,
          image: following.following.image,
          name: following.following.name,
          isFollowing: sessionUserFollows ? sessionUserFollows.some((follow) => follow.followingId === following.following.id) : false
        }
      }),
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        data: data
      }),
      { status: 200 }
    );

  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
}