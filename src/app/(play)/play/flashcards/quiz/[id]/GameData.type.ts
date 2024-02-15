type GameData = {
  id: string;
  timeToRespond: Date;
  actualQuestion: number;
  numberOfQuestions: number;
  question: {
    question: string;
    type: 'Quiz' | 'True / False';
    time: number;
    answers: {
      id: string;
      answer: string;
      color?: string;
      isCorrect?: boolean;
    }[]
  }
}

export default GameData;