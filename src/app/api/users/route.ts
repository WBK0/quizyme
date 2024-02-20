import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    const prisma = new PrismaClient();

    let users = await prisma.user.findMany({
      where: {
        isComplete: true,
        NOT: {
          id: session?.user.id,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
      }
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