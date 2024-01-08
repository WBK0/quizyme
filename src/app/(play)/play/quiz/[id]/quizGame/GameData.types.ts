type GameData = {
  question: {
    image: string;
    question: string;
    type: 'Puzzle' | 'Quiz' | 'Multiple choice' | 'True / False';
    answers: {
      id: string;
      answer: string;
      color?: string;
      isCorrect?: boolean;
    }[]
  }
}

export default GameData;