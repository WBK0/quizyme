"use server"
import { revalidatePath } from "next/cache";

const updateQuizData = () => {
  revalidatePath('/(play)/play/quiz/[id]', 'page');
}

export default updateQuizData;