type FinishedData = {
  id: string;
  data: {
    user: {
      id: string;
      image: string;
      name: string;
    };
    points: number;
    correctAnswers: number;
  }[]
  userPoints: number;
  userCorrectAnswers: number;
  answersLength: number;
  userPlace: number;
} | null;

export default FinishedData;