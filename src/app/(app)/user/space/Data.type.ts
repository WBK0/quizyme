export type Data = {
  id: string;
  studyId: string;
  image: string;
  type: 'quiz' | 'flashcards';
  topic: string;
  user: {
    name: string;
    image: string;
  };
  stats: {
    questions: number;
  } | {
    flashcards: number;
  };
  inviter?: {
    name: string;
    image: string;
  }
  tags: string[];
  createdAt: string;
  correctAnswers?: number;
  points?: number;
  isFavorite: boolean | null;
}[] | null;