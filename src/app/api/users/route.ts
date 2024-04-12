import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";

    const session = await getServerSession(authOptions);

    const prisma = new PrismaClient();

    let users = await prisma.user.findMany({
      where: {
        isComplete: true,
        OR: [
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        ],        
        NOT: {
          id: session?.user.id,
        }
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
      },
      skip: skip,
      take: limit,
    });

    if(!users){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "No users found",
        }),
        { status: 404 }
      );
    }

    if(session){
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
            status: "Success",
            data: users
          }),
          { status: 200 }
        );
      }

      users = users.map((data) => {
        return({
          ...data,
          isFollowing: user.Following.some((following) => (following.followingId === data.id)),
        })
      })

      
      return new Response(
        JSON.stringify({
          status: "Success",
          data: users
        }),
        { status: 200 }
      );
    } 

    return new Response(
      JSON.stringify({
        status: "Success",
        data: users
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred",
      }),
      { status: 500 }
    );
  }
}