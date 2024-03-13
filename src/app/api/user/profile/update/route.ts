import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { schema } from "./schema";
import { PrismaClient } from "@prisma/client";

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to update your profile.",
        }),
        { status: 401 }
      );
    }

    let { username, firstname, lastname, bio, image, interests } = await req.json();

    username = username.trim().replace(/ /g, '_');

    const isError = await schema.validate({
      username,
      firstname,
      lastname,
      bio,
      image,
      interests
    }).then(() => null).catch((err) => err.message);

    if(isError){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: isError,
        }),
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        username,
        name: firstname + ' ' + lastname,
        bio,
        image,
        interests
      }
    });

    prisma.$disconnect();
    
    if(!user){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "An error occurred while updating your profile.",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Your profile has been updated successfully.",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "An error occurred while trying to update your profile.",
      }),
      { status: 500 }
    );
  }
}