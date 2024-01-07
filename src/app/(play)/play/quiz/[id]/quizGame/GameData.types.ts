type GameData = {
  question: {
    image: string;
    question: string;
    type: 'Puzzle' | 'Quiz' | 'Multiple choice' | 'True / False';
    answers: {
      id: string;
      answer: string;
    }[]
  }
}

export default GameData;