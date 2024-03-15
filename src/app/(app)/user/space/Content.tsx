"use client";
import Invitations from "./Invitations";
import Searchbar from "@/components/Searchbar";
import Results from "./Results";
import Favorites from "./Favorites";
import { useState } from "react";
import { Data } from "./Data.type";
import useUrlParams from "@/hooks/useUrlParams";
import SelectVariants from "./SelectVariants";

const Content = () => {
  const { getParams } = useUrlParams();
  const [data, setData] = useState<Data>(null);
  const [search, setSearch] = useState('');
  const params = getParams() as { option: 'invitations' | 'favorites' | 'my results'; type: 'quizzes' | 'flashcards' };

  return (
    <>
      <div className="px-3">
        <SelectVariants />
      </div>
      <div className="sticky top-0 pt-20 pb-5 z-10 bg-white px-3">
        <div className="max-w-2xl mx-auto">
          <Searchbar 
            value={search}
            onChange={(value) => setSearch(value)}
          /> 
        </div>
      </div>
      {
        (() => {
          switch (params.option) {
            case 'invitations':
              return(
                <Invitations type={params.type} data={data} setData={setData} search={search} />
              )
            case 'favorites':
              return(
                <Favorites type={params.type} data={data} setData={setData} search={search}/>
              )
            case 'my results':
              return(
                <Results type={params.type} data={data} setData={setData} search={search} />
              )
            default:
              return null;
          }
        })()
      }
    </>
  )
}

export default Content;