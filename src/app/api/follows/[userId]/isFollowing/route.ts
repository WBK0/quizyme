import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, {params} : {params : {userId: string}}) => {
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
          status: "Success",
          isFollowing: false,
          message: "Not logged in",
        }),
        { status: 200 }
      );
    }

    const prisma = new PrismaClient();

    const isFollowing = await prisma.follower.findFirst({
      where: {
        followerId: session?.user?.id,
        followingId: userId
      }
    });

    if(!isFollowing) {
      return new Response(
        JSON.stringify({
          status: "Success",
          isFollowing: false,
          message: "Not following",
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        isFollowing: true,
        message: "Following",
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
    )
  }
}