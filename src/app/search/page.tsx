"use client";
import Searchbar from "@/components/Searchbar";
import SelectButton from "@/components/SelectButton";
import Collections from "./Collections";
import SearchResults from "./SearchResults";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import useUrlParams from "@/hooks/useUrlParams";

const Search = () => {
  const { changeParams, getParams } = useUrlParams();
  
  const params = getParams();

  changeParams('type', 'quizzes');

  const [localStorageType, setLocalStorageType] = useLocalStorage('search-type', 'quizzes');

  // Set the type in the URL when type is not set
  useEffect(() => {
    if (params.type) {
      setLocalStorageType(params.type || 'quizzes');
    }else{
      changeParams('type', localStorageType);
    }
  }, [params])

  return (
    <div className="px-3">
      <div className="mx-auto max-w-3xl">
        <Searchbar />
        <Collections 
          selected={params.cat}
        />
        <SelectButton
          options={['quizzes', 'flashcards']}
        />
        <SearchResults />
      </div>
    </div>
  )
}
export default Search;