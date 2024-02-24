import UserProfileCard from "@/components/UserProfileCard";
import SelectVariant from "./SelectVariant";
import Searchbar from "@/components/Searchbar";
import Content from "./Content";

const Studies = () => {
  return (
    <div className="px-3">
      <UserProfileCard
        name="Bartłomiej Ostojski"
        username="OstojskiB"
        image="https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c"
      />
      <SelectVariant />
      <div className="mt-12 max-w-2xl mx-auto">
        <Searchbar /> 
      </div>
      <Content />
    </div>
  )
}

export default Studies;