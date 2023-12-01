export type FormInputs = {
  question: string;
  answerTime: string;
  answerPoints: string;
  responseType: string;
}

export type FormValues = {
  image?: string;
  question: string;
  answerTime: string;
  answerPoints: string;
  responseType: string;
  answers: {
    answer: string;
    isCorrect: boolean;
  }[]
}[]