import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest, {params} : {params : {userId: string}}) => {
  try {
    const { userId } = params;

    if(!userId) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No userId provided",
        }),
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if(!session?.user?.id) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You must be logged in to follow someone",
        }),
        { status: 401 }
      );
    }

    const prisma = new PrismaClient();

    const follow = await prisma.follower.findFirst({
      where: {
        followerId: session?.user?.id,
        followingId: userId
      }
    });

    let result;
    let message;

    if(follow){
      result = await prisma.follower.delete({
        where: {
          id: follow.id
        }
      });
      message = "Unfollowed";
    }else{
      result = await prisma.follower.create({
        data: {
          followerId: session?.user?.id,
          followingId: userId
        }
      });
      message = "Followed";
    }

    if(!result) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Something went wrong",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
}