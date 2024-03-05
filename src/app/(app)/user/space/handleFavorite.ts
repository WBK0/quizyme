import { toast } from "react-toastify";
import { Data } from "./Data.type";

type handleFavoriteProps = {
  id: string;
  topic: string;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  data: Data;
}

const handleFavorite = async ({ id, topic, setData, data } : handleFavoriteProps) => {
  const isFavorite = data && data.find((item) => item.studyId === id)?.isFavorite;

  if(isFavorite === null) return;

  try {  
    setData((prev : Data) => {
      if(!prev) return prev;
      return prev.map((item) => {
        if(item.studyId === id){
          return {
            ...item,
            isFavorite: null
          }
        }
        return item;
      });
    });

    const slug = `${topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${id}`;
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${slug}/like`, {
      method: 'PATCH'
    });
  
    const json = await response.json();

    if(!response.ok){
      throw new Error(json.message);
    }

    setData((prev : Data) => {
      if(!prev) return prev;
      return prev.map((item) => {
        if(item.studyId === id){
          return {
            ...item,
            isFavorite: !isFavorite
          }
        }
        return item;
      });
    });
  } catch (error : unknown) {
    if(error instanceof Error){
      toast.error(error.message || "An undefined error occurred.");
    }

    setData((prev : Data) => {
      if(!prev) return prev;
      return prev.map((item) => {
        if(item.studyId === id){
          return {
            ...item,
            isFavorite: isFavorite || false
          }
        }
        return item;
      });
    });
  }
};

export default handleFavorite;