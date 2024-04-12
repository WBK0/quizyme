import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
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
    
    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        Followers: {
          include: {
            follower: true
          },
          where: {
            follower: {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  }
                },
                {
                  username: {
                    contains: search,
                    mode: "insensitive",
                  }
                }
              ]
            }
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

    let friends = user.Followers.map((follower) => {
      if(user.Following.some((item) => (item.followingId === follower.followerId))){
        return {
          id: follower.followerId,
          name: follower.follower.name,
          image: follower.follower.image,
          username: follower.follower.username
        };
      }
    })

    friends = friends.filter((item) => item !== undefined);

    return new Response(
      JSON.stringify({
        status: "Success",
        data: friends.slice(skip, skip + limit)
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