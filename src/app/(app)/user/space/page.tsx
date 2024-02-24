"use client";
import UserProfileCard from "@/components/UserProfileCard";
import SelectVariants from "./SelectVariants";
import useUrlParams from "@/hooks/useUrlParams";
import Invitations from "./Invitations";
import Searchbar from "@/components/Searchbar";
import Wishlist from "./Wishlist";
import Results from "./Results";

const UserSpace = () => {
  const { getParams } = useUrlParams();

  const params = getParams() as { option: 'invitations' | 'wishlist' | 'my results'; type: 'quizzes' | 'flashcards' };

  return (
    <div className="px-3">
      <UserProfileCard
        name="Bartłomiej Ostojski"
        username="OstojskiB"
        image="https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c"
      />
      <SelectVariants />
      <div className="mt-20 max-w-2xl mx-auto">
        <Searchbar /> 
      </div>
      {
        (() => {
          switch (params.option) {
            case 'invitations':
              return(
                <Invitations type={params.type} />
              )
            case 'wishlist':
              return(
                <Wishlist type={params.type} />
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