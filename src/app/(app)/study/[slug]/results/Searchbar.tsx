import Searchbar from "@/components/Searchbar";

type SearchProps = {
  search: string;
  setSearch: (value: string) => void;
}

const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <div className="max-w-2xl mx-auto px-3">
      <Searchbar 
        value={search}
        onChange={setSearch}
      />
    </div>
  )
}
export default Search;