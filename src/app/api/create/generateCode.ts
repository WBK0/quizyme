import { PrismaClient } from "@prisma/client";

export const generateCode = async () => {
  const prisma = new PrismaClient();

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  const isCodeExist = await prisma.code.findFirst({
    where: {
      code: code
    }
  }); 

  if(isCodeExist) {
    generateCode();
  }

  const newCode = await prisma.code.create({
    data: {
      code: code
    }
  })
  
  return newCode.id;
}