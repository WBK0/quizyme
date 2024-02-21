import Searchbar from "@/components/Searchbar";

type SearchProps = {
  setSearch: (value: string) => void;
  search: string;
}

const Search = ({ setSearch, search } : SearchProps) => {
  const handleSearch = async (value: string) => {
    setSearch(value);
  }

  return (
    <Searchbar value={search} onChange={handleSearch} />
  )
}

export default Search;