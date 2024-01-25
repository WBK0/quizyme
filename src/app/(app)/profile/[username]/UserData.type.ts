type UserData = {
  id: string,
  username: string,
  name: string,
  image: string,
  bio: string,
  interests: string[],
  quizzes: {
    id: string,
    topic: string,
    tags: string[],
    image: string,
    description: string,
    stats: {
      played: number,
      favorited: number,
      shared: number,
      questions: number,
    },
    numberOfQuestions: number,
    createdAt: Date,
  }[],
  flashcards: {
    id: string,
    topic: string,
    tags: string[],
    image: string,
    description: string,
    stats: {
      learned: number,
      favorited: number,
      shared: number,
      flashcards: number,
    },
    numberOfFlashcards: number,
    createdAt: Date,
  }[],
  playedQuizzes: number,
  playedFlashcards: number,
  followers: number,
  following: number,
}

export default UserData;