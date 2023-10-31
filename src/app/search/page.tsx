"use client";
import Searchbar from "@/components/Searchbar";
import SelectButton from "@/components/SelectButton";
import Collections from "./Collections";
import SearchResults from "./SearchResults";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import useUrlParams from "@/hooks/useUrlParams";

const Search = () => {
  const { changeParam, getParams, deleteParams } = useUrlParams();
  
  const params = getParams();

  const [localStorageType, setLocalStorageType] = useLocalStorage('search-type', 'quizzes');

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
      <div className="mx-auto max-w-3xl">
        <Searchbar />
        <Collections 
          selected={params.category}
          deleteParams={deleteParams}
        />
        <div className="mt-12">
          <SelectButton
            options={['quizzes', 'flashcards']}
          />
        </div>
        <SearchResults />
      </div>
    </div>
  )
}
export default Search;