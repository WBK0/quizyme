"use client";
import useUrlParams from "@/hooks/useUrlParams";
import FlashcardsContent, { Flashcards } from "./Flashcards";
import QuizzesContent, { Quizzes } from "./Quizzes";
import Spinner from "@/components/Loading/Spinner";
import Searchbar from "@/components/Searchbar";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";

export type DeleteData = {
  id: string;
  type: string;
  image: string;
  topic: string;
  length: number;
  color: string;
} | null;

const Content = () => {
  const { getParams } = useUrlParams();
  const [search, setSerach] = useState('');
  const [deleteData, setDeleteData] = useState<DeleteData>(null);
  const [data, setData] = useState<Quizzes | Flashcards>(null);

  const handleSearch = (value: string) => {
    setSerach(value);
  }

  useEffect(() => {
    setData(null);
    setSerach('');
  }, [getParams().type])

  const deleteModal = (data: DeleteData) => {
    if(!data) return;

    setDeleteData({
      id: data.id,
      type: data.type,
      image: data.image,
      topic: data.topic,
      length: data.length,
      color: data.color
    });
  }

  const handleClose = () => {
    setDeleteData(null);
  }

  const filterData = (id: string) => {
    setData((prev: any) => prev.filter((item: any) => item.id !== id));
  }

  return (
    <>
      <div className="mt-12 max-w-2xl mx-auto">
        <Searchbar 
          onChange={handleSearch}
          value={search}
        /> 
      </div>
      <div className="max-w-4xl mx-auto pt-12">
        {
          (() => {
            switch (getParams().type) {
              case 'quizzes':
                return (
                  <QuizzesContent 
                    search={search} 
                    deleteModal={deleteModal}
                    quizzes={data as Quizzes}
                    setQuizzes={setData as React.Dispatch<React.SetStateAction<Quizzes>>}
                  />
                )
              case 'flashcards':
                return (
                  <FlashcardsContent 
                    search={search} 
                    deleteModal={deleteModal} 
                    flashcards={data as Flashcards}
                    setFlashcards={setData as React.Dispatch<React.SetStateAction<Flashcards>>}
                  />
                )
              default:
                return (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>  
                )     
            }
          })()
        }
      </div>
      {
        deleteData ?
          <DeleteModal 
            handleClose={handleClose}
            type={getParams().type === 'quizzes' ? 'quiz' : 'flashcards'}
            data={deleteData}
            filterData={filterData}
          />
        : null
      }
    </>
  )
}

export default Content;