type UpdateGameData = {
  id: string;
  actualFlashcard?: number;
  likedIds?: string[];
  shuffleSalt?: number;
};

export const updateGameData = ({id, actualFlashcard, likedIds, shuffleSalt} : UpdateGameData) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      actualFlashcard: actualFlashcard,
      likedIds,
      shuffleSalt
    })
  });
}