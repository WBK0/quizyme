"use server"
import { revalidatePath } from "next/cache";

const updateQuizData = ({ type } : { type: 'quiz' | 'flashcards' }) => {
  type === 'quiz' 
  ? revalidatePath('/(play)/play/quiz/[id]', 'page') 
  : revalidatePath('/(play)/flashcards/quiz/[id]', 'page');
}

export default updateQuizData;