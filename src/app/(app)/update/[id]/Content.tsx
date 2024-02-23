"use client";
import { useState } from "react";
import ConfirmPage from "./ConfirmPage/ConfirmPage";
import UpdatePage from "./UpdatePage/UpdatePage";
import UpdateFlashcards from "./UpdateFlashcards/UpdateFlashcards";
import UpdateQuiz from "./UpdateQuiz/UpdateQuiz";

type ContentProps = {
  data: {
    image: string;
    title: string;
    length: number;
    topic: string;
    type: 'quiz' | 'flashcards';
  },
  id: string;
}

const Content = ({ data, id } : ContentProps) => {
  const [view, setView] = useState<number>(0);

  return (
    <>
      {
        (() => {
          switch (view) {
            case 0:
              return(
                <ConfirmPage 
                  data={data}
                  setView={setView}
                />
              )
            case 1:
              return(
                <UpdatePage
                  id={id}
                  setView={setView}
                />
              )
            case 2:
              return(
                <UpdateFlashcards
                  setView={setView}
                />
              )
            case 3: 
              return(
                <UpdateQuiz
                  setView={setView}
                />
              )
            default:
              break;
          }
        })()
      }
    </>
  )
}

export default Content;