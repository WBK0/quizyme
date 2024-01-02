import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, {params} : {params : {type: string}}) => {
  return new Response(
    JSON.stringify({
      status: "Error",
      message: "Invalid type provided",
    }),
    { status: 400 }
  );
}