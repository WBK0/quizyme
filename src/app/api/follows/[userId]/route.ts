import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export const GET = async (req: NextRequest, {params} : {params : {username: string}}) => {
  try {
    const { username } = params;

    if(!username) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No username provided",
        }),
        { status: 400 }
      );
    }
    
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username
        }
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

    const data = {
      followers: user.Followers.map((follower) => {
        return {
          id: follower.id,
          username: follower.follower.username,
          image: follower.follower.image,
          name: follower.follower.name
        }
      }),
      following: user.Following.map((following) => {
        return {
          id: following.id,
          username: following.following.username,
          image: following.following.image,
          name: following.following.name
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