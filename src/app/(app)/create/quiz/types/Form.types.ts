export type FormInputs = {
  image?: string;
  question: string;
  answerTime: string;
  answerPoints: string;
  responseType: string;
  answers?: {
    answer: string;
    isCorrect?: boolean;
    color?: string;
  }[]
}

export type FormValues = {
  image?: string;
  question: string;
  answerTime: string;
  answerPoints: string;
  responseType: string;
  answers?: {
    answer: string;
    isCorrect?: boolean;
  }[]
}[]