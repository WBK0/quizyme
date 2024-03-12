import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Unauthorized",
          message: "You need to be logged in to view your notifications.",
        }),
      ), { status: 401 }
    }

    const searchParams = req.nextUrl.searchParams;

    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 20;

    const prisma = new PrismaClient();

    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        flashcards: true,
        quiz: true,
        sender: true
      },
      skip: skip,
      take: limit,
    });

    prisma.$disconnect();

    if(!notifications){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Error while fetching notifications. Please try again later.",
        }),
        { status: 404 }
      );
    }


    const data = notifications.map((notification) => {
      console.log(notification)

      const url = 
      notification?.quiz ? `/study/${notification.quiz.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-') + '-' + notification.quiz.id}` : 
      notification?.flashcards ? `/study/${notification.flashcards.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-') + '-' + notification.flashcards.id}` :
      `/profile/${notification?.sender?.username}`
      return {
        id: notification.id,
        type: notification.type,
        message: notification.message,
        sender: notification.sender && {
          id: notification.sender.id,
          username: notification.sender.username,
          image: notification.sender.image
        },
        url: url,
        isRead: notification.isRead,
        createdAt: notification.createdAt
      }
    });

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Notifications fetched successfully.",
        notifications: data
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Error while fetching notifications. Please try again later.",
      }),
      { status: 500 }
    );
  }
}