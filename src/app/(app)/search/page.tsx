"use client";
import Searchbar from "@/components/Searchbar";
import SelectButton from "@/components/SelectButton";
import Collections from "./Collections";
import SearchResults from "./SearchResults";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import useUrlParams from "@/hooks/useUrlParams";

const Search = () => {
  const { changeParam, getParams, deleteParams } = useUrlParams();
  const params = getParams();
  const [localStorageType, setLocalStorageType] = useLocalStorage('search-type', 'quizzes');
  const [search, setSearch] = useState('');

  // Set the type in the URL when type is not set
  useEffect(() => {
    if (params.type) {
      setLocalStorageType(params.type || 'quizzes');
    }else{
      changeParam('type', localStorageType);
    }
  }, [params.type])

  return (
    <div className="px-3">
      <div>
        <SelectButton
          options={['quizzes', 'flashcards']}
        />
      </div>
      <div>
        <div className="sticky top-0 pb-5 z-20 bg-white pt-20">
          <div className="max-w-2xl mx-auto">
            <Searchbar 
              value={search}
              onChange={(value) => setSearch(value)}
            /> 
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <Collections 
            selected={params.category}
            deleteParams={deleteParams}
          />
        </div>
        {
          params.type ?
          <SearchResults
            type={params.type}
            search={search}
            category={params.category}
          />
          : null
        }
      </div>
    </div>
  )
}
export default Search;