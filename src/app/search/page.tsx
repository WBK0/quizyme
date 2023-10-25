import Searchbar from "@/components/Searchbar";
import SelectButton from "@/components/SelectButton";
import Collections from "./Collections";

const Search = ({searchParams} : { searchParams : { cat: string | null } }) => {
  return (
    <div className="px-3">
      <div className="mx-auto max-w-3xl">
        <Searchbar />
        <Collections 
          selected={searchParams.cat}
        />
        <SelectButton
          options={['quizzes', 'flashcards']}
        />
      </div>
    </div>
  )
}
export default Search;