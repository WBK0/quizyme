import { PrismaClient, Session } from "@prisma/client";

const createFlashcardsGame = async (id: string, userId: string) => {
  try {
    const prisma = new PrismaClient();
        
    let flashcardsGame = await prisma.flashcardsGame.findFirst({
      where: {
        userId: userId,
        flashcardsId: id
      },
      select: {
        id: true,
        shuffleSalt: true,
        actualFlashcard: true,
        likedIds: true,
        isEnded: true
      }
    });

    if(!flashcardsGame) {
      const flashcards = await prisma.flashcards.findUnique({
        where: {
          id: id,
        }
      });

      if(!flashcards) {
        return false;
      }

      flashcardsGame = await prisma.flashcardsGame.create({
        data: {
          userId: userId,
          flashcardsId: id,
          actualFlashcard: 0,
          shuffleSalt: 0,
          likedIds: []
        }
      })

      await prisma.flashcards.update({
        where: {
          id: id
        },
        data: {
          stats: {
            update: {
              learned: {
                increment: 1
              }
            }
          }
        }
      })

      if(!flashcardsGame) {
        return false;
      }
    }

    prisma.$disconnect();

    return flashcardsGame;
  } catch (error) {
    return false;
  }
} 

export default createFlashcardsGame;