"use client";
import useUrlParams from "@/hooks/useUrlParams";
import FlashcardsContent from "./Flashcards";
import QuizzesContent from "./Quizzes";
import Spinner from "@/components/Loading/Spinner";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";

const Content = () => {
  const { getParams } = useUrlParams();
  const [search, setSerach] = useState('');

  const handleSearch = (value: string) => {
    setSerach(value);
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
                return <QuizzesContent search={search} />
              case 'flashcards':
                return <FlashcardsContent search={search} />
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
    </>
  )
}

export default Content;