"use client";
import useUrlParams from "@/hooks/useUrlParams";
import FlashcardsContent from "./Flashcards";
import QuizzesContent from "./Quizzes";
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


  const handleSearch = (value: string) => {
    setSerach(value);
  }

  useEffect(() => {
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
                return <QuizzesContent search={search} deleteModal={deleteModal}/>
              case 'flashcards':
                return <FlashcardsContent search={search} deleteModal={deleteModal} />
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
          />
        : null
      }
    </>
  )
}

export default Content;