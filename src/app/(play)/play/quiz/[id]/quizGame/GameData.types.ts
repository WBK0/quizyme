type GameData = {
  timeToRespond: Date;
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