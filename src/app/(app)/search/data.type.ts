export type Data = {
  id: string,
  topic: string,
  image: string,
  tags: string[],
  stats: {
    questions: number,
    played: number,
  } | {
    flashcards: number,
    learned: number,
  },
  user: {
    id: string,
    name: string,
    image: string,
    username: string,
  },
  updateAt: string,
  createdAt: string,
  isFavorite: boolean | null
}[] | null;