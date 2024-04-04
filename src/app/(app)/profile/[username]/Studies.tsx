import CardExtended from "@/components/CardExtended";
import UserData from "./UserData.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type StudiesProps = {
  type: string;
  content: UserData['quizzes'] | UserData['flashcards'];
  authorName: string;
  authorImage: string;
};

type Data = UserData['quizzes'] | UserData['flashcards'];

const Studies = ({ type, content, authorName, authorImage } : StudiesProps) => {
  const colors = ['purple', 'green', 'yellow', 'lightblue'];
  const [data, setData] = useState<Data>(content);

  useEffect(() => {
    setData(content);
  }, [content])

  const handleFavorite = async (card: { topic: string, isFavorite: boolean | null, id: string }) => {
    const isFavorite = card.isFavorite;
    try {
      setData((prev: Data) => {
        if (!prev) return prev;
        return prev.map((item) => {
          if (item.id === card.id) {
            return {
              ...item,
              isFavorite: null
            };
          }
          return item;
        }) as Data;
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.id}/like`, {
        method: 'PATCH',
      });

      if(!response.ok){
        const json = await response.json();
        throw new Error(json.message);
      }

      setData((prev: Data) => {
        if (!prev) return prev;
        return prev.map((item) => {
          if (item.id === card.id) {
            return {
              ...item,
              isFavorite: !card.isFavorite
            };
          }
          return item;
        }) as Data;
      });
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message)

      setData((prev: Data) => {
        if(!prev) return prev;
        return prev.map((item) => {
          if(item.id === card.id){
            return {
              ...item,
              isFavorite: isFavorite || false
            }
          }
          return item;
        }) as Data;
      });
    }
  }

  return (
    <div className="mt-24 max-w-3xl mx-auto">
      {
        content.length > 0 ? (
          <>
            <h1 className="font-black text-3xl">{content.length} {type === 'quiz' ? 'QUIZZES' : 'FLASHCARDS'}</h1>
            <div className="flex flex-col gap-6 pt-8">
              {data.map((value, index) => (
                <CardExtended 
                  key={value.id}
                  image={value.image}
                  to={`${process.env.NEXT_PUBLIC_URL}/study/${value.topic.replaceAll(' ', '-')}-${value.id}`}
                  color={colors[index % 4]}
                  type={type}
                  topic={value.topic}
                  authorName={authorName}
                  authorImage={authorImage}
                  tags={value.tags}
                  isFavorite={value.isFavorite}
                  handleFavorite={() => handleFavorite(value)}
                  quantity={
                    type === 'quiz'
                      ? (value as UserData['quizzes'][number]).numberOfQuestions
                      : (value as UserData['flashcards'][number]).numberOfFlashcards
                  }
                />
              ))}
            </div>
          </>
        )
        : (
          <h1 className="font-extrabold text-center text-2xl">
            This user does not have any {type === 'quiz' ? 'quizzes' : 'flashcards'}
          </h1>
        )
      }
    </div>
  )
}
export default Studies;