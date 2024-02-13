type UpdateGameData = {
  id: string;
  actualFlashcard?: number;
  likedIds?: string[];
  shuffleSalt?: number;
  isEnded?: boolean;
};

export const updateGameData = ({id, actualFlashcard, likedIds, shuffleSalt, isEnded} : UpdateGameData) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      actualFlashcard: actualFlashcard,
      likedIds,
      shuffleSalt,
      isEnded
    })
  });
}