type GameData = {
  id: string;
  timeToRespond: Date;
  actualQuestion: number;
  numberOfQuestions: number;
  points?: number;
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
  isPointsEnabled: boolean;
}

export default GameData;