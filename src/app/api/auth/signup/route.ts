import { connectToDB } from "@/utils/database";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectToDB();

    const prisma = new PrismaClient();

    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      throw new Error("User with that email already exists");
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: 'User created successfully!',
      }),
      { status: 200 }
    );
  } catch (error : unknown) {
    return new NextResponse(
      JSON.stringify({
        status: "Error while creating user",
        message: (error as Error).message,
      }),
      { status: 500 }
    );
  }
  
}