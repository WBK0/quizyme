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
  tags: string[];
  createdAt: string;
}[] | null;