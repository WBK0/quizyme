"use client";
import UserProfileCard from "@/components/UserProfileCard";
import SelectVariants from "./SelectVariants";
import useUrlParams from "@/hooks/useUrlParams";
import Invitations from "./Invitations";
import Searchbar from "@/components/Searchbar";
import Results from "./Results";
import { useState } from "react";
import Favorites from "./Favorites";
import { Data } from "./Data.types";

const UserSpace = () => {
  const { getParams } = useUrlParams();
  const [data, setData] = useState<Data>(null);
  const [search, setSearch] = useState('');
  const params = getParams() as { option: 'invitations' | 'favorites' | 'my results'; type: 'quizzes' | 'flashcards' };

  return (
    <div className="px-3">
      <UserProfileCard
        name="Bartłomiej Ostojski"
        username="OstojskiB"
        image="https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c"
      />
      <SelectVariants />
      <div className="pt-20 max-w-2xl mx-auto">
        <Searchbar 
          value={search}
          onChange={(value) => setSearch(value)}
        /> 
      </div>
      {
        (() => {
          switch (params.option) {
            case 'invitations':
              return(
                <Invitations type={params.type} />
              )
            case 'favorites':
              return(
                <Favorites type={params.type} data={data} setData={setData} search={search}/>
              )
            case 'my results':
              return(
                <Results type={params.type} />
              )
            default:
              return null;
          }
        })()
      }
    </div>
  )
}

export default UserSpace;