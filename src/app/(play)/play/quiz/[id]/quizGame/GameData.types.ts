type GameData = {
  timeToRespond: Date;
  actualQuestion: number;
  numberOfQuestions: number;
  question: {
    image: string;
    question: string;
    type: 'Puzzle' | 'Quiz' | 'Multiple choice' | 'True / False';
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