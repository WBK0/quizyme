import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkMongoDBID from "@/utils/checkMongodbID";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, {params} : {params : {id: string}}) => {
  try {
    const { id } = params;

    const session = await getServerSession(authOptions);

    if(!session) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "You need to be logged in to create a quiz of flashcards",
        }),
        { status: 401 }
      );
    }

    if(!checkMongoDBID(id)){
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Invalid format of flashcard id provided",
        }),
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();

    const flashcardsSet = await prisma.flashcards.findUnique({
      where: {
        id: id
      }
    });

    if(!flashcardsSet) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Flashcards set not found"
        }),
        { status: 404 }
      );
    }

    const getRandomQuestions = (skip: number, max: number) => {
      let results : number[] = [skip];
      
      for(let i = 0; i < 3; i++){
        let liczba;
        do {
          liczba = Math.floor(Math.random() * max);
        } while (liczba === skip || results.includes(liczba));
        results.push(liczba);
      }

      for (let i = results.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [results[i], results[j]] = [results[j], results[i]];
      }
      return results;
    }
    
    const getDefinitionForTrueFalse = (element : number) => {
      const isTrue = Number((Math.random() * 1000).toFixed(0)) % 2 === 0;
      
      let randomNumber = 0;

      if(!isTrue) {
        randomNumber = Math.floor(Math.random() * flashcardsSet.flashcards.length);
      }

      return isTrue ? element : randomNumber;
    }

    let questionsOrder = flashcardsSet.flashcards.map((_, i) => i);

    for (let i = questionsOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsOrder[i], questionsOrder[j]] = [questionsOrder[j], questionsOrder[i]];
    }

    const questions = questionsOrder.map((element) => {
      // 33.3% chance for true / false type, 66.6% for quiz type 
      const type = Math.random() > 0.333 ? "Quiz" : "True / False";

      const trueFalseDefinition = getDefinitionForTrueFalse(element);

      return(type === 'Quiz' ?
        {
          type,
          time: 45,
          question: flashcardsSet.flashcards[element].concept,
          answers: getRandomQuestions(element, flashcardsSet.flashcards.length).map((sequence) => ({
            answer: flashcardsSet.flashcards[sequence].definition,
            isCorrect: sequence === element
          }))
        }
      :
        {
          type,
          time: 45,
          question: `Is ${flashcardsSet.flashcards[trueFalseDefinition].definition} the definition of ${flashcardsSet.flashcards[element].concept}?`,
          answers: [
            {
              answer: "True",
              isCorrect: trueFalseDefinition === element
            },
            {
              answer: "False",
              isCorrect: trueFalseDefinition !== element
            }
          ]
        }
      )
    })
  
    const quiz = await prisma.flashcardQuiz.create({
      data: {
        topic: flashcardsSet.topic,
        image: flashcardsSet.image,
        flashcardsId: id,
        userId: session?.user?.id,
        actualQuestion: 0,
        correctAnswers: 0,
        questions: questions,
        timeToRespond: new Date(),
      }
    });

    if(!quiz) {
      return new Response(
        JSON.stringify({
          status: "Error",
          message: "Something went wrong while creating a flashcards game"
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Flashcards game created",
        quizId: quiz.id
      }),
      { status: 200 }
    );

  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Something went wrong"
      }),
      { status: 500 }
    );
  }
}